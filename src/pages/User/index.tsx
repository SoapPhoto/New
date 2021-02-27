import { UserPictureType } from '@app/common/enum/picture';
import React, { memo } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import UserHeader from './components/UserHeader';
import UserHome from './Picture';

const User = memo(() => {
  const { username } = useParams();
  return (
    <div>
      <UserHeader username={username} />
      <Routes>
        <Route
          path="like"
          element={
            <UserHome username={username} type={UserPictureType.LIKED} />
          }
        />
        <Route
          path="choice"
          element={
            <UserHome username={username} type={UserPictureType.CHOICE} />
          }
        />
        <Route
          path=""
          element={<UserHome username={username} type={UserPictureType.MY} />}
        />
      </Routes>
    </div>
  );
});
export default User;
