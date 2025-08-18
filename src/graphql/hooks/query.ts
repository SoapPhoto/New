import type { QueryHookOptions } from '@apollo/client'
import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'

import type { ListQueryData, PicturesQueryVariables } from '../interface'
import { useQuery } from '@apollo/client'
import { Pictures } from '@app/graphql/query/query.graphql'

const defaultOptions: QueryHookOptions<any, any> = {
}

export function usePicturesQuery<
  TData = ListQueryData<'pictures', PictureEntity>,
  TVariables = PicturesQueryVariables,
>(
  variables: TVariables,
  options?: Omit<QueryHookOptions<TData, TVariables>, 'variables'>,
) {
  return useQuery<TData, TVariables>(Pictures, {
    ...defaultOptions,
    ...options,
    variables,
  })
}
