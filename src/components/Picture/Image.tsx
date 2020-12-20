import { getPictureUrl } from '@app/utils/image';
import React from 'react';
import { ImageWrapper, Img, LazyImg } from './elements';

interface IPictureImageProps {
  imgkey: string;
  blurhashSrc?: string;
}

const PictureImage: React.FC<IPictureImageProps> = ({
  imgkey,
  blurhashSrc,
}) => {
  return (
    <ImageWrapper>
      <Img src={getPictureUrl(imgkey, 'small')} />
      {/* <LazyImg src={blurhashSrc} /> */}
    </ImageWrapper>
  );
};

export default PictureImage;
