import React, { memo, useEffect } from 'react';
import styled from 'styled-components/macro';

// import { Header } from '@app/components';
import { Outlet } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';
import { NewNotification } from '@app/graphql/subscription/subscription.graphql';
import { NotificationEntity } from '@app/common/types/modules/notification/notification.entity';
import { UserNotification } from '@app/graphql/query';
import VerifyMessage from './VerifyMessage';
import Header from '../Header';

interface IProps {}

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`;

export const DefaultLayout: React.FC<IProps> = memo(({ children }) => {
  const { cache } = useApolloClient();
  const { data, loading } = useSubscription<{ newNotification: NotificationEntity }>(
    NewNotification,
  );
  useEffect(() => {
    if (data) {
      if (data.newNotification) {
        const cacheData = cache.readQuery<any>({
          query: UserNotification,
        });
        console.log(cacheData.userNotification);
        if (cacheData?.userNotification) {
          cache.writeQuery({
            query: UserNotification,
            data: {
              userNotification: [
                cacheData.newNotification,
                ...cacheData.userNotification,
              ],
            },
          });
        }
        // cache.writeFragment()
      }
    }
  }, [cache, data]);
  return (
    <Wrapper>
      <VerifyMessage />
      <Header />
      <Outlet />
    </Wrapper>
  );
});

export * from './SecurityLayout';
