import React, { memo } from 'react';
import {
  Outlet, useParams,
} from 'react-router-dom';
import UserHeader from './components/UserHeader';

const User = memo(() => {
  const { username } = useParams();
  // return <UserSkeleton />;
  return (
    <div>
      <UserHeader username={username!} />
      <Outlet />
    </div>
  );
});
export default User;
