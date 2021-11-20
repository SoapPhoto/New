import React, { useState } from 'react';
import { PhotoSlider } from 'react-photo-view';
import ScrollLocker from 'rc-util/lib/Dom/scrollLocker';

import Image from '@app/components/Image';
import { getPictureUrl } from '@app/utils/image';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import {
  PictureBox,
  PictureContent,
  PictureImage,
  PictureImageBox,
  PictureWrapper,
} from '../elements';

import 'react-photo-view/dist/index.css';

interface IProps {
  picture: PictureEntity;
}
const scrollLocker = new ScrollLocker();

const PictureCenter: React.FC<IProps> = ({ picture }) => {
  const [visible, setVisible] = useState(false);
  const num = picture.width / picture.height;
  const height = (1 - (picture.width - picture.height) / picture.width) * 100 || 100;
  const onOpen = () => {
    scrollLocker.lock();
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
    setTimeout(() => {
      scrollLocker.unLock();
    }, 500);
  };
  return (
    <PictureWrapper>
      <PictureContent>
        <PictureBox num={num} onClick={onOpen}>
          <PictureImageBox height={height} background={picture.color}>
            <PictureImage>
              <Image
                src={getPictureUrl(picture.key, 'medium')}
                blurhash={picture.blurhash}
                lazyload={false}
              />
            </PictureImage>
          </PictureImageBox>
        </PictureBox>
      </PictureContent>
      <PhotoSlider
        images={[{ src: getPictureUrl(picture.key, 'full') }]}
        visible={visible}
        onClose={onClose}
      />
    </PictureWrapper>
  );
};

export default PictureCenter;
