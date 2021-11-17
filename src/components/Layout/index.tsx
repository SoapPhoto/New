import React, { memo, useEffect } from 'react';
import styled from 'styled-components/macro';

// import { Header } from '@app/components';
import { Outlet } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';
import { NewNotification } from '@app/graphql/subscription/subscription.graphql';
import { NotificationEntity } from '@app/common/types/modules/notification/notification.entity';
import { UnreadNotificationCount, UserNotification } from '@app/graphql/query';
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
    {
      shouldResubscribe: true,
    },
  );
  const setUnreadCount = () => {
    const cacheData = cache.readQuery<any>({
      query: UnreadNotificationCount,
    });
    if (cacheData?.unreadNotificationCount) {
      cache.writeQuery({
        query: UnreadNotificationCount,
        data: {
          unreadNotificationCount: {
            ...cacheData?.unreadNotificationCount,
            count: cacheData.unreadNotificationCount.count + 1,
          },
        },
      });
    }
  };
  useEffect(() => {
    if (data) {
      if (data.newNotification) {
        // const cacheData = cache.readQuery<any>({
        //   query: UserNotification,
        // });
        // if (cacheData?.userNotification) {
        //   cache.writeQuery({
        //     query: UserNotification,
        //     data: {
        //       userNotification: [
        //         data.newNotification,
        //         ...cacheData.userNotification,
        //       ],
        //     },
        //   });
        // }
        setUnreadCount();
        // cache.writeFragment()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <Wrapper>
      <VerifyMessage />
      <Header />
      <Outlet />
    </Wrapper>
  );
});

export * from './SecurityLayout';
