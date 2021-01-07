import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Blurhash } from '..';
interface IImageProps {
  src?: string;
  blurhash?: string;
  color?: string;
}

const Box = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const BlurHashBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Img = styled.img<{ loaded: number; complete: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${p => (p.loaded || p.complete ? 1 : 0)};
  filter: brightness(${p => (p.loaded || p.complete ? '100%' : '100%')})
    saturate(${p => (p.loaded || p.complete ? '100%' : '20%')});
  transition: ${p =>
    p.complete
      ? 'none'
      : `filter 700ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)`};
`;

const Image: React.FC<IImageProps> = ({ src, blurhash, color = '#fff' }) => {
  const [loaded, setLoaded] = useState(false);
  const [complete, setComplete] = useState(false);
  const [blurhashVisible, setBlurhashVisible] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete) {
      if (img.naturalWidth !== 0) {
        setBlurhashVisible(false);
        setComplete(true);
        // handleLoadImage();
      }
    }
    if (img) {
      img.addEventListener('transitionend', removeBlurHash);
    }
    return () => {
      if (img) {
        img.removeEventListener('transitionend', removeBlurHash);
      }
    };
  }, []);
  const removeBlurHash = () => {
    setBlurhashVisible(false);
  };
  const handleLoadImage = useCallback(() => {
    setLoaded(true);
  }, []);
  return (
    <Box>
      {blurhash && blurhashVisible && (
        <BlurHashBox>
          <Blurhash
            hash={blurhash}
            width={'100%'}
            height={'100%'}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </BlurHashBox>
      )}
      <Img
        loaded={loaded ? 1 : 0}
        complete={complete ? 1 : 0}
        style={{ background: color }}
        onLoad={handleLoadImage}
        ref={imageRef}
        src={src}
      />
    </Box>
  );
};
export default Image;
