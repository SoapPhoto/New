import { useQuery } from '@apollo/client';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { UserInfo } from '@app/graphql/query';
import React, { memo } from 'react';
import UserCover from './UserCover';
import UserInfoHeader from './UserInfoHeader';
import UserTab from './UserTab';

interface IProps {
  username: string;
}

const UserHeader: React.FC<IProps> = memo(({ username }) => {
  const { loading, data } = useQuery<{
    user: UserEntity;
  }>(UserInfo, {
    variables: {
      username,
    },
  });
  if (loading || !data) return null;
  return (
    <>
      <UserCover cover={data.user.cover} avatar={data.user.avatar} />
      <UserInfoHeader user={data.user} />
      <UserTab />
    </>
  );
});

export default UserHeader;
