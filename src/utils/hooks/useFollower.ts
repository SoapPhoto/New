import { useCallback, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { UserIsFollowing } from '@app/graphql/query';
import { useAccount } from '@app/stores/hooks';
import throttle from 'lodash/throttle';
import {
  FollowUser,
  UnFollowUser,
} from '@app/graphql/mutations/mutations.graphql';
import { toast } from 'react-hot-toast';

export default function useFollower(): [(user: UserEntity) => any, boolean] {
  const { isLogin } = useAccount();
  const { query, mutate } = useApolloClient();
  const [followLoading, setFollowLoading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const follow = useCallback(
    throttle(async (user: UserEntity) => {
      if (!isLogin) {
        toast.error('请登录！');
        return;
      }
      if (followLoading) return;
      let mutation = FollowUser;
      if (user.isFollowing > 0) mutation = UnFollowUser;
      setFollowLoading(true);
      try {
        await mutate<{ done: boolean }>({
          mutation,
          variables: {
            input: {
              userId: user.id,
            },
          },
        });
        await query({
          query: UserIsFollowing,
          variables: {
            username: user.username,
          },
          fetchPolicy: 'network-only',
        });
        setFollowLoading(false);
      } catch (error) {
        const { message } = error as any;
        toast.error(message);
        setFollowLoading(false);
      }
    }),
    [isLogin],
  );
  return [follow, followLoading];
}
