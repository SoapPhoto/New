import { useEffect, useMemo } from 'react';
import { gql, useApolloClient, useSubscription } from '@apollo/client';
import { UserOnlineStatus } from '@app/graphql/subscription/subscription.graphql';

export default function useUserOnlineStatusSubscription(id?: number) {
  const { cache } = useApolloClient();
  const { data } = useSubscription<{ userOnlineStatus: { online: boolean } }>(
    UserOnlineStatus, {
      variables: { id },
      shouldResubscribe: true,
    },
  );
  const online = useMemo(() => data?.userOnlineStatus.online, [data?.userOnlineStatus.online]);
  useEffect(() => {
    if (online !== undefined) {
      cache.writeFragment({
        id: `User:${id}`,
        fragment: gql`
          fragment UserDetailFigma on User {
            isOnline
          }
        `,
        data: {
          isOnline: online,
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);
}
