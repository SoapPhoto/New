import { useQuery } from '@apollo/client';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { EmojiText, Image, Popover } from '@app/components';
import Avatar from '@app/components/Avatar';
import { Picture } from '@app/graphql/query';
import { getPictureUrl } from '@app/utils/image';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

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
  let { id } = useParams();
  const { loading, data, fetchMore, networkStatus } = useQuery<{
    picture: PictureEntity;
  }>(Picture, {
    notifyOnNetworkStatusChange: true,
    variables: { id: Number(id) },
  });
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
                  src={getPictureUrl(picture.key, 'small')}
                  blurhash={picture.blurhash}
                  lazyload={false}
                />
              </PictureImage>
            </PictureImageBox>
          </PictureBox>
        </PictureContent>
      </PictureWrapper>
    </Wrapper>
  );
};
