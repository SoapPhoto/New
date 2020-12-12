import React from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import { boxMixin } from 'styles/mixins';
import { Outlet } from 'react-router-dom';

const Wrapper = styled.section`
  display: flex;
  /* ${boxMixin}
  margin: 0 auto;
  border: 1px solid rgb(234, 234, 234);
  width: 500px;
  margin-top: ${p => p.theme.space16x}px;
  margin-bottom: ${p => p.theme.space16x}px;
  padding: ${p => p.theme.space8x}px ${p => p.theme.space24x}px; */
`;

const BG = styled.div`
  flex: 1;
  height: 100vh;
  background-image: url('https://cdn-oss.soapphoto.com/photo/1a895f1b-a749-4eb0-86ac-3df4d0260559@!regular_webp');
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
          <AnimatePresence exitBeforeEnter>
            <Outlet />
          </AnimatePresence>
        </Content>
      </RightBox>
    </Wrapper>
  );
};

export default Account;
