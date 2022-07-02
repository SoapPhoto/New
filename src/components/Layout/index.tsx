import React, { } from 'react';
import styled from 'styled-components/macro';

// import { Header } from '@app/components';
import { Outlet } from 'react-router-dom';
import useNewNotificationSubscription from '@app/utils/hooks/useNewNotificationSubscription';
import VerifyMessage from './VerifyMessage';
import Header from '../Header';
import Footer from '../Footer';

interface IProps {}

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`;

export const DefaultLayout: React.FC<IProps> = () => {
  const Components = useNewNotificationSubscription();
  return (
    <Wrapper>
      <VerifyMessage />
      <Header />
      <Outlet />
      <Components />
      <Footer />
    </Wrapper>
  );
};

export * from './SecurityLayout';
