import React, { memo } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import UserHeader from './components/UserHeader';

const User = memo(() => {
  const { username } = useParams();
  return (
    <div>
      <UserHeader username={username} />
      <Routes>
        <Route path="like" element={<div>123</div>} />
        <Route path="collections" element={<div>444</div>} />
        <Route path="" element={<div>321</div>} />
      </Routes>
    </div>
  );
});
export default User;
