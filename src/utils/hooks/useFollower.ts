import { useCallback, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { UserIsFollowing } from '@app/graphql/query';
import { useAccount } from '@app/stores/hooks';
import { throttle } from 'lodash';
import { Toast } from '@app/components';
import {
  FollowUser,
  UnFollowUser,
} from '@app/graphql/mutations/mutations.graphql';

export default function useFollower(): [(user: UserEntity) => any, boolean] {
  const { userInfo } = useAccount();
  const { query, mutate } = useApolloClient();
  const [followLoading, setFollowLoading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const follow = useCallback(
    throttle(async (user: UserEntity) => {
      if (!userInfo) {
        Toast.warning('请登录！');
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
        Toast.error(error.message);
        setFollowLoading(false);
        console.log(error);
      }
    }),
    [userInfo],
  );
  return [follow, followLoading];
}
