import React, { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';

import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { UserInfo } from '@app/graphql/query';
import { Popover } from '..';
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
} from './elements';
import Avatar from '../Avatar';
import { Link } from 'react-router-dom';
import { getPictureUrl } from '@app/utils/image';
import { useTranslation } from 'react-i18next';

interface IUserPopover {
  username: string;
}

interface IUserCard {
  user: UserEntity;
}

const UserCard: React.FC<IUserCard> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Wrapper>
        <Header>
          <Link to={`/@${user.username}`}>
            <Avatar src={user.avatar} size={48} />
          </Link>
          <UserBox>
            <UserNameBox>
              <UserName>{user.username}</UserName>
            </UserNameBox>
            <Bio>{user.bio}</Bio>
          </UserBox>
        </Header>
        <PicturePreview>
          {user.pictures.map((picture, index) => (
            <PreviewBox
              key={picture.id}
              style={{
                backgroundColor: picture.color,
                borderTopLeftRadius: index === 0 ? 4 : 0,
                borderBottomLeftRadius: index === 0 ? 4 : 0,
                borderTopRightRadius: index === 2 ? 4 : 0,
                borderBottomRightRadius: index === 2 ? 4 : 0,
                overflow: 'hidden',
              }}
            >
              <Link to={`/picture/${picture.id}`}>
                <Img src={getPictureUrl(picture.key, 'thumb')} />
              </Link>
            </PreviewBox>
          ))}
        </PicturePreview>
      </Wrapper>
      <UserInfoWrapper>
        <Info>
          <InfoItem>
            <InfoItemCount>{user.followerCount}</InfoItemCount>
            <InfoItemLabel>{t('user.label.followers')}</InfoItemLabel>
          </InfoItem>
          <InfoItem>
            <InfoItemCount>{user.followedCount}</InfoItemCount>
            <InfoItemLabel>{t('user.label.followed')}</InfoItemLabel>
          </InfoItem>
          <InfoItem>
            <InfoItemCount>{user.likesCount}</InfoItemCount>
            <InfoItemLabel>{t('user.label.likes')}</InfoItemLabel>
          </InfoItem>
        </Info>
      </UserInfoWrapper>
    </div>
  );
};

const UserPopover: React.FC<IUserPopover> = ({ children, username }) => {
  const [loadUser, { loading, data }] = useLazyQuery<{ user: UserEntity }>(
    UserInfo,
  );
  const onOpen = useCallback(() => {
    loadUser({
      variables: {
        username,
      },
    });
  }, [loadUser, username]);
  return (
    <Popover
      onOpen={onOpen}
      trigger="hover"
      contentStyle={{ padding: 0 }}
      placement="top"
      content={data ? <UserCard user={data.user} /> : <></>}
    >
      {children}
    </Popover>
  );
};

export default UserPopover;
