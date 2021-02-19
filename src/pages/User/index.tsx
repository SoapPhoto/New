import { useQuery } from '@apollo/client';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { UserInfo } from '@app/graphql/query';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserCover from './components/UserCover';
import UserInfoHeader from './components/UserInfoHeader';
import {} from './elements';

const User = () => {
  const { username } = useParams();
  const { loading, data, fetchMore, networkStatus } = useQuery<{
    user: UserEntity;
  }>(UserInfo, {
    variables: {
      username,
    },
  });
  if (loading || !data) return null;
  return (
    <div>
      <UserCover user={data.user} />
      <UserInfoHeader user={data.user} />
    </div>
  );
};
export default User;
