import React from 'react';
import styled from 'styled-components';

import { Outlet } from 'react-router-dom';

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
  background-color: ${p => p.theme.background};
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

const Account = () => {
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
};

export default Account;
