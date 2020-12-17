import React, { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';

import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount } from '@app/stores/hooks';
import { observer } from 'mobx-react';

const Wrapper = styled.section`
  display: flex;
`;

const BG = styled.div`
  flex: 1;
  height: 100vh;
  background-image: url('https://cdn-oss.soapphoto.com/photo/6c71ed8a-56de-4e35-90e0-cddd9f2fbd95@!regular_webp');
  background-position: center center;
  background-size: cover;
`;
const RightBox = styled.div`
  background-color: ${p => p.theme.colors.layout};
  max-width: 680px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 120px;
`;

const Content = styled.section`
  width: 100%;
  max-width: 380px;
`;

const Account = observer(() => {
  let navigate = useNavigate();
  const { getUserInfo, isLogin } = useAccount();
  useLayoutEffect(() => {
    if (localStorage.getItem('token')) {
      getUserInfo();
    }
  }, []);
  useEffect(() => {
    if (isLogin) {
      navigate('/', {
        replace: true,
      });
      console.log(1123123);
    }
  }, [isLogin]);
  return (
    <Wrapper>
      <BG />
      <RightBox>
        <Content>
          <Outlet />
        </Content>
      </RightBox>
    </Wrapper>
  );
});

export default Account;
