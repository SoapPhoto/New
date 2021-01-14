import React from 'react';

import { Image } from '@app/components';
import { getPictureUrl } from '@app/utils/image';
import {
  PictureBox,
  PictureContent,
  PictureImage,
  PictureImageBox,
  PictureWrapper,
} from '../elements';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';

interface IProps {
  picture: PictureEntity;
}

const PictureCenter: React.FC<IProps> = ({ picture }) => {
  const num = picture.width / picture.height;
  const height =
    (1 - (picture.width - picture.height) / picture.width) * 100 || 100;
  return (
    <PictureWrapper>
      <PictureContent>
        <PictureBox num={num}>
          <PictureImageBox height={height} background={picture.color}>
            <PictureImage>
              <Image
                src={getPictureUrl(picture.key, 'full')}
                blurhash={picture.blurhash}
                lazyload={false}
              />
            </PictureImage>
          </PictureImageBox>
        </PictureBox>
      </PictureContent>
    </PictureWrapper>
  );
};

export default PictureCenter;
