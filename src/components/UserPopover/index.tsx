import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { UserInfo } from '@app/graphql/query';
import { Link } from 'react-router-dom';
import { getPictureUrl } from '@app/utils/image';
import { useTranslation } from 'react-i18next';
import { QueryData } from '@app/graphql/interface';
import Avatar from '../Avatar';
import {
  Header,
  Wrapper,
  UserBox,
  UserNameBox,
  UserName,
  Bio,
  PicturePreview,
  PreviewBox,
  Img,
  UserInfoWrapper,
  Info,
  InfoItem,
  InfoItemCount,
  InfoItemLabel,
  SkeletonAvatar,
  SkeletonName,
  SkeletonBio,
  SkeletonPreview,
  SkeletonCount,
} from './elements';
import { EmojiText, Popover } from '..';

interface IUserPopover {
  username: string;
}

interface IUserCard {
  loading: boolean;
  user?: UserEntity;
}

const UserCard: React.FC<IUserCard> = ({ user, loading }) => {
  const { t } = useTranslation();
  const prestige = useMemo(
    () => !!user?.badge.find((v) => v.name === 'prestige'),
    [user?.badge],
  );
  const isLoading = !!(loading && !user);
  return (
    <div>
      <Wrapper>
        <Header>
          {isLoading ? (
            <SkeletonAvatar />
          ) : (
            <Link to={`/user/${user?.username}`}>
              <Avatar rainbow={prestige} src={user?.avatar} size={48} />
            </Link>
          )}
          <UserBox>
            <UserNameBox>
              {isLoading ? (
                <SkeletonName />
              ) : (
                <UserName>
                  <EmojiText text={user?.fullName ?? ''} />
                </UserName>
              )}
            </UserNameBox>
            {isLoading ? (
              <SkeletonBio />
            ) : (
              <Bio>
                {
                  user?.bio && <EmojiText text={user.bio} />
                }
              </Bio>
            )}
          </UserBox>
        </Header>
        <PicturePreview>
          {isLoading
            ? [0, 1, 3].map((key) => (
              <SkeletonPreview
                key={key}
                style={{
                  borderTopLeftRadius: key === 0 ? 4 : 0,
                  borderBottomLeftRadius: key === 0 ? 4 : 0,
                  borderTopRightRadius: key === 2 ? 4 : 0,
                  borderBottomRightRadius: key === 2 ? 4 : 0,
                }}
              />
            ))
            : user?.pictures.map((picture, index) => (
              <PreviewBox
                key={picture.id}
                style={{
                  backgroundColor: picture.color,
                  borderTopLeftRadius: index === 0 ? 4 : 0,
                  borderBottomLeftRadius: index === 0 ? 4 : 0,
                  borderTopRightRadius: index === 2 ? 4 : 0,
                  borderBottomRightRadius: index === 2 ? 4 : 0,
                }}
              >
                <Link to={`/picture/${picture.id}`}>
                  <Img
                    blurhash={picture.blurhash!}
                    src={getPictureUrl(picture.key, 'thumb')}
                  />
                </Link>
              </PreviewBox>
            ))}
        </PicturePreview>
      </Wrapper>
      <UserInfoWrapper>
        <Info>
          <InfoItem>
            <InfoItemCount>
              {isLoading ? <SkeletonCount /> : user?.followerCount}
            </InfoItemCount>
            <InfoItemLabel>{t('user.label.followers')}</InfoItemLabel>
          </InfoItem>
          <InfoItem>
            <InfoItemCount>
              {isLoading ? <SkeletonCount /> : user?.followedCount}
            </InfoItemCount>
            <InfoItemLabel>{t('user.label.followed')}</InfoItemLabel>
          </InfoItem>
          <InfoItem>
            <InfoItemCount>
              {isLoading ? <SkeletonCount /> : user?.likesCount}
            </InfoItemCount>
            <InfoItemLabel>{t('user.label.likes')}</InfoItemLabel>
          </InfoItem>
        </Info>
      </UserInfoWrapper>
    </div>
  );
};

const UserPopover: React.FC<PropsWithChildren<IUserPopover>> = ({ children, username }) => {
  const [loadUser, { loading, data }] = useLazyQuery<
  QueryData<'user', UserEntity>
  >(UserInfo);
  const onOpen = () => {
    if (!data?.user) {
      loadUser({
        variables: {
          username,
        },
      });
    }
  };
  return (
    <Popover
      onOpen={onOpen}
      trigger="hover"
      destroyOnClose
      openDelay={300}
      contentStyle={{ padding: 0 }}
      placement="top"
      content={<UserCard loading={loading} user={data?.user} />}
    >
      {children}
    </Popover>
  );
};

export default UserPopover;
