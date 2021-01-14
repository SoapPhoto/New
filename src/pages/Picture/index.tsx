import { useQuery } from '@apollo/client';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { EmojiText, Image } from '@app/components';
import { Picture } from '@app/graphql/query';
import { useAccount } from '@app/stores/hooks';
import { useSearchParamModal, useTapButton } from '@app/utils/hooks';
import { getPictureUrl } from '@app/utils/image';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { Info, Settings } from 'react-feather';
import { useParams } from 'react-router-dom';
import ExifModal from './components/ExifModal';
import HeaderUserInfo from './components/HeaderUserInfo';
import PictureCenter from './components/PictureCenter';
import PictureInfo from './components/PictureInfo';
import SettingModal from './components/SettingModal';

import {
  Wrapper,
  PictureBox,
  PictureContent,
  PictureWrapper,
  PictureImage,
  PictureImageBox,
  Content,
  PictureBaseInfo,
  LikeContent,
  HeartIcon,
  IconButton,
  Title,
  Bio,
} from './elements';
import PictureSkeleton from './Skeleton';

export const PicturePage = observer(() => {
  const { id } = useParams();
  const { loading, data } = useQuery<{
    picture: PictureEntity;
  }>(Picture, {
    notifyOnNetworkStatusChange: true,
    variables: { id: Number(id) },
  });
  if (loading || !data) return <PictureSkeleton />;
  const { picture } = data;
  const { user } = picture;
  return (
    <Wrapper>
      <HeaderUserInfo user={user} createTime={picture.createTime} />
      <PictureCenter picture={picture} />
      <Content>
        <PictureInfo picture={picture} />
        <Title>
          <EmojiText text={picture.title} />
        </Title>
        {picture.bio && (
          <Bio>
            <EmojiText text={picture.bio} />
          </Bio>
        )}
      </Content>
      <ExifModal picture={picture} />
      <SettingModal picture={picture} />
    </Wrapper>
  );
});
