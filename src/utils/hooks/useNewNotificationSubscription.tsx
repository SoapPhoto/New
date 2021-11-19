import React, { useEffect } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import { NotificationEntity } from '@app/common/types/modules/notification/notification.entity';
import { UnreadNotificationCount } from '@app/graphql/query';
import { NewNotification } from '@app/graphql/subscription/subscription.graphql';
import { useAccount } from '@app/stores/hooks';
import { observer } from 'mobx-react';

const Components: React.FC = () => {
  const { cache } = useApolloClient();
  const { data } = useSubscription<{ newNotification: NotificationEntity }>(
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
        setUnreadCount();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return <div />;
};

const ParentComponents: React.FC = () => {
  const { isLogin } = useAccount();
  return isLogin ? <Components /> : <div />;
};

const useNewNotificationSubscription = () => observer(ParentComponents);
export default useNewNotificationSubscription;
