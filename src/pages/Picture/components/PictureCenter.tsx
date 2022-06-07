import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
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

import 'react-photo-view/dist/react-photo-view.css';
import { Loading } from '@app/components';

interface IProps {
  picture: PictureEntity;
}

const PictureCenter: React.FC<IProps> = ({ picture }) => {
  const num = picture.width / picture.height;
  const height = (1 - (picture.width - picture.height) / picture.width) * 100 || 100;
  return (
    <PictureWrapper>
      <PictureContent>
        <PhotoProvider
          loadingElement={<Loading />}
          maskOpacity={0.5}
          // eslint-disable-next-line react/no-unstable-nested-components
          bannerVisible={false}
        >
          <PhotoView
            key={picture.key}
            src={getPictureUrl(picture.key, 'full')}
          >
            <PictureBox num={num}>
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
          </PhotoView>
        </PhotoProvider>
      </PictureContent>
    </PictureWrapper>
  );
};

export default PictureCenter;
