import { useQuery } from '@apollo/client';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { EmojiText, Image, Modal, Popover } from '@app/components';
import Avatar from '@app/components/Avatar';
import { Picture } from '@app/graphql/query';
import { useAccount } from '@app/stores/hooks';
import { useSearchParamModal, useTapButton } from '@app/utils/hooks';
import { getPictureUrl } from '@app/utils/image';
import dayjs from 'dayjs';
import { pick } from 'lodash';
import React, { useMemo } from 'react';
import { Info, Settings } from 'react-feather';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { css } from 'styled-components';
import ExifModal from './components/ExifModal';
import SettingModal from './components/SettingModal';

import {
  UserHeader,
  UserHeaderWrapper,
  Wrapper,
  UserInfo,
  UserLink,
  UserName,
  TimeSpan,
  BaseInfoItem,
  UserInfoRight,
  PictureBox,
  PictureContent,
  PictureWrapper,
  PictureImage,
  PictureImageBox,
  SkeletonAvatar,
  SkeletonUserName,
  SkeletonPicture,
  Content,
  PictureBaseInfo,
  LikeContent,
  HeartIcon,
  IconButton,
} from './elements';

export const PictureSkeleton = () => (
  <Wrapper>
    <UserHeaderWrapper>
      <UserHeader>
        <UserInfo>
          <SkeletonAvatar />
          <UserInfoRight>
            <SkeletonUserName />
          </UserInfoRight>
        </UserInfo>
      </UserHeader>
    </UserHeaderWrapper>
    <PictureWrapper>
      <PictureContent>
        <PictureBox num={1}>
          <PictureImageBox height={100} background="transparent">
            <SkeletonPicture />
          </PictureImageBox>
        </PictureBox>
      </PictureContent>
    </PictureWrapper>
  </Wrapper>
);

export const PicturePage = () => {
  const { id } = useParams();
  const [, , exifOpen] = useSearchParamModal('exif');
  const [, , settingOpen] = useSearchParamModal('setting');
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { userInfo } = useAccount();
  const [spring, bind] = useTapButton();
  const { loading, data, fetchMore, networkStatus } = useQuery<{
    picture: PictureEntity;
  }>(Picture, {
    notifyOnNetworkStatusChange: true,
    variables: { id: Number(id) },
  });
  const isOwner = useMemo(
    () =>
      (userInfo &&
        userInfo.id.toString() === data?.picture.user.id.toString()) ||
      false,
    [data?.picture.user.id, userInfo],
  );
  if (loading || !data) return <PictureSkeleton />;
  const { picture } = data;
  const { user } = picture;
  const num = picture.width / picture.height;
  const height =
    (1 - (picture.width - picture.height) / picture.width) * 100 || 100;
  return (
    <Wrapper>
      <UserHeaderWrapper>
        <UserHeader>
          <UserInfo>
            <Avatar src={user.avatar} size={44} />
            <UserInfoRight>
              <UserLink
                style={{ marginBottom: '4px' }}
                to={`/@${user.username}`}
              >
                <UserName>
                  <EmojiText text={user.fullName} />
                </UserName>
              </UserLink>
              <BaseInfoItem>
                <Popover
                  openDelay={100}
                  trigger="hover"
                  placement="top"
                  theme="dark"
                  content={
                    <span>
                      {dayjs(picture.createTime).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                  }
                >
                  <TimeSpan>{dayjs(picture.createTime).fromNow()}</TimeSpan>
                </Popover>
              </BaseInfoItem>
            </UserInfoRight>
          </UserInfo>
        </UserHeader>
      </UserHeaderWrapper>
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
      <Content>
        <PictureBaseInfo>
          <div>
            <LikeContent
              {...bind()}
              style={{
                transform: spring.transform,
              }}
              // onClick={onLike}
            >
              <HeartIcon size={20} islike={picture.isLike ? 1 : 0} />
              <p>{picture.likedCount}</p>
            </LikeContent>
          </div>
          <div
            css={`
              display: grid;
              gap: 8px;
              grid-auto-flow: column;
            `}
          >
            <IconButton onClick={exifOpen} popover={'详情'}>
              <Info />
            </IconButton>
            {isOwner && (
              <IconButton onClick={settingOpen} popover={'设置'}>
                <Settings />
              </IconButton>
            )}
          </div>
        </PictureBaseInfo>
      </Content>
      <ExifModal picture={picture} />
      <SettingModal picture={picture} />
    </Wrapper>
  );
};
