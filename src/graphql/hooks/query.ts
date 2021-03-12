import { QueryHookOptions, useQuery } from '@apollo/client';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { Pictures } from '@app/graphql/query/query.graphql';
import { ListQueryData, PicturesQueryVariables } from '../interface';

const defaultOptions: QueryHookOptions = {};

export function usePicturesQuery<
  TData = ListQueryData<'pictures', PictureEntity>,
  TVariables = PicturesQueryVariables
>(
  variables: TVariables,
  options?: Omit<QueryHookOptions<TData, TVariables>, 'variables'>,
) {
  return useQuery<TData, TVariables>(Pictures, {
    ...defaultOptions,
    ...options,
    variables,
  });
}
