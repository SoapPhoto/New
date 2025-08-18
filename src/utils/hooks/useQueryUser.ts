import type {
  OperationVariables,
  QueryResult,
} from '@apollo/client'
import type { UserEntity } from '@app/common/types/modules/user/user.entity'
import {
  useApolloClient,
  useQuery,
} from '@apollo/client'
import Fragments from '@app/graphql/fragments'
import { UserInfo } from '@app/graphql/query'
import { useEffect } from 'react'

export default function useQueryUser<T>(username: string): [QueryResult<T, OperationVariables>, UserEntity | undefined] {
  const queryData = useQuery<T>(UserInfo, {
    fetchPolicy: 'cache-first',
    variables: { username },
  })
  const cache = useApolloClient()
  useEffect(() => {
    if (username) {
      if (queryData.data) {
        // 更新
        queryData.refetch({
          username,
        })
      }
      // query({
      //   variables: { username },
      // });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])
  // const queryData = useQuery<T>(UserInfo, {
  //   variables: { username },
  // });
  const cacheData = cache.readFragment({
    id: `User:{"username":"${username}"}`,
    fragment: Fragments,
    fragmentName: 'UserFragment',

  })
  return [queryData, cacheData]
}
