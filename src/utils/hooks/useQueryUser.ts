import { useEffect, useState } from 'react';
import {
  OperationVariables, QueryResult, useApolloClient, useQuery,
} from '@apollo/client';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import Fragments from '@app/graphql/fragments';
import { UserInfo } from '@app/graphql/query';

export default function useQueryUser<T>(username: string): [QueryResult<T, OperationVariables>, UserEntity | undefined] {
  const cache = useApolloClient();
  const queryData = useQuery<T>(UserInfo, {
    variables: { username },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const cacheData = cache.readFragment({
    id: `User:{"username":"${username}"}`,
    fragment: Fragments,
    fragmentName: 'UserFragment',
  });
  return [queryData, cacheData];
}
