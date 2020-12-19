import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount } from '@app/stores/hooks';
import { observer } from 'mobx-react';
import { Loading } from '@app/components';
import { BG, Content, LoadingBox, RightBox, Wrapper } from './elements';

const Account = observer(() => {
  const [loading, setLoading] = useState(true);
  const { isLogin, init } = useAccount();
  let navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate('/', {
        replace: true,
      });
    }
    if (init && isLogin) {
      setLoading(false);
    }
  }, [isLogin, init]);
  return (
    <Wrapper>
      {loading ? (
        <LoadingBox>
          <Loading size={42} />
        </LoadingBox>
      ) : (
        <>
          <BG />
          <RightBox>
            <Content>
              <Outlet />
            </Content>
          </RightBox>
        </>
      )}
    </Wrapper>
  );
});

export default Account;
