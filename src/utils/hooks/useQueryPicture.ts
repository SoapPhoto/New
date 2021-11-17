import {
  gql, OperationVariables, QueryResult, useApolloClient, useQuery,
} from '@apollo/client';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import Fragments from '@app/graphql/fragments';
import { Picture } from '@app/graphql/query';
import { useEffect, useState } from 'react';

export default function useQueryPicture<T>(id: number): [QueryResult<T, OperationVariables>, PictureEntity | undefined] {
  const cache = useApolloClient();
  const queryData = useQuery<T>(Picture, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const cacheData = cache.readFragment({
    id: `Picture:${id}`,
    fragment: Fragments,
    fragmentName: 'PictureFragment',
  });
  return [queryData, cacheData];
}
