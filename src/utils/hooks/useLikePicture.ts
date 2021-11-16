import { gql, useApolloClient } from '@apollo/client';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { LikePicture, UnLikePicture } from '@app/graphql/mutations';
import { useAccount } from '@app/stores/hooks';
import { throttle } from 'lodash';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export default function useLikePicture(id: number) {
  const { isLogin } = useAccount();
  const { mutate, writeFragment, cache } = useApolloClient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const like = useCallback(async (isLike: boolean) => {
    if (!isLogin) {
      toast.error('请登录！');
    }
    let req: PictureEntity;
    if (!isLike) {
      const { data } = await mutate<{ likePicture: PictureEntity }>({
        mutation: LikePicture,
        variables: {
          id,
        },
      });
      req = data!.likePicture;
    } else {
      const { data } = await mutate<{ unlikePicture: PictureEntity }>({
        mutation: UnLikePicture,
        variables: {
          id,
        },
      });
      req = data!.unlikePicture;
    }
    cache.writeFragment({
      id: `Picture:${id}`,
      fragment: gql`
        fragment PictureFragment on Picture {
          isLike
          likedCount
        }
      `,
      data: {
        isLike: req.isLike,
        likedCount: req.likedCount,
      },
    });
  }, [cache, id, isLogin, mutate]);
  return [like];
}
