import { useQuery } from '@apollo/client';
import { UserInfo } from '@app/graphql/query';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserInfoHeader from './components/UserInfoHeader';
import {} from './elements';

const User = () => {
  const { username } = useParams();
  const { loading, data, fetchMore, networkStatus } = useQuery(UserInfo, {
    variables: {
      username,
    },
  });
  if (loading) return null;
  console.log(data);
  return (
    <div>
      <UserInfoHeader />
    </div>
  );
};
export default User;
