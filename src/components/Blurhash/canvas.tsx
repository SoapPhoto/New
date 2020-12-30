import React, { useEffect, useRef } from 'react';
import { decode } from 'blurhash';

export type Props = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  hash: string;
  height: number;
  punch?: number;
  width: number;
};

const BlurhashCanvas: React.FC<Props> = ({
  hash,
  punch,
  height,
  width,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, width, height, punch]);
  const draw = () => {
    if (canvasRef.current) {
      const pixels = decode(hash, width, height, punch);

      const ctx = canvasRef.current.getContext('2d');
      const imageData = ctx!.createImageData(width, height);
      imageData.data.set(pixels);
      ctx!.putImageData(imageData, 0, 0);
    }
  };
  return <canvas {...rest} height={height} width={width} ref={canvasRef} />;
};

export default BlurhashCanvas;
