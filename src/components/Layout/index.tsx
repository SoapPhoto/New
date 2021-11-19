import React, { memo, useEffect } from 'react';
import styled from 'styled-components/macro';

// import { Header } from '@app/components';
import { Outlet } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';
import { NewNotification } from '@app/graphql/subscription/subscription.graphql';
import { NotificationEntity } from '@app/common/types/modules/notification/notification.entity';
import { UnreadNotificationCount, UserNotification } from '@app/graphql/query';
import useNewNotificationSubscription from '@app/utils/hooks/useNewNotificationSubscription';
import { Observer, observer } from 'mobx-react';
import VerifyMessage from './VerifyMessage';
import Header from '../Header';

interface IProps {}

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`;

export const DefaultLayout: React.FC<IProps> = ({ children }) => {
  const Components = useNewNotificationSubscription();
  return (
    <Wrapper>
      <VerifyMessage />
      <Header />
      <Outlet />
      <Components />
    </Wrapper>
  );
};

export * from './SecurityLayout';
