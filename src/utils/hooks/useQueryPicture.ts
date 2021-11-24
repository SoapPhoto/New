import {
  gql, OperationVariables, QueryResult, useApolloClient, useLazyQuery, useQuery,
} from '@apollo/client';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import Fragments from '@app/graphql/fragments';
import { Picture } from '@app/graphql/query';
import { useEffect, useState } from 'react';

export default function useQueryPicture<T>(id: number): [QueryResult<T, OperationVariables>, PictureEntity | undefined] {
  const queryData = useQuery<T>(Picture, {
    variables: { id },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });
  const cache = useApolloClient();
  useEffect(() => {
    if (id) {
      if (queryData.data) {
        // 更新
        queryData.refetch({
          id,
        });
      }
      // console.log(id);
      // query({
      //   variables: { id },
      // });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const cacheData = cache.readFragment({
    id: `Picture:${id}`,
    fragment: Fragments,
    fragmentName: 'PictureFragment',
  });
  return [queryData, cacheData];
}
