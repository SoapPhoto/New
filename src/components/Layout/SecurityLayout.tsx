import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { stringify } from 'qs';
import { useAccount } from '@app/stores/hooks';

export const SecurityLayout = observer(() => {
  const {
    init, userInfo,
  } = useAccount();
  const location = useLocation();
  const queryString = stringify({
    redirect: location.pathname,
  });
  if (!init) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }
  if (!userInfo) {
    return <Navigate to={`/login?${queryString}`} replace />;
  }
  return <Outlet />;
});
