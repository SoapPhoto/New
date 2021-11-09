import { getPictureUrl } from '@app/utils/image';
import React from 'react';
import Image from '@app/components/Image';
import { ImageWrapper } from './elements';

interface IPictureImageProps {
  imgkey: string;
  blurhash?: string;
}

const PictureImage: React.FC<IPictureImageProps> = ({ imgkey, blurhash }) => (
  <ImageWrapper>
    <Image src={getPictureUrl(imgkey, 'small')} blurhash={blurhash} />
    {/* <LazyImg src={blurhashSrc} /> */}
  </ImageWrapper>
);

export default PictureImage;
