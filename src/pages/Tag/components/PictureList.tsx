import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import { useQuery } from '@apollo/client'

import PictureList from '@app/components/Picture/List'
import Skeleton from '@app/components/Picture/Skeleton'
import { TagPictures } from '@app/graphql/query'
import React, { memo } from 'react'

interface IProps {
  name: string
}

const List: React.FC<IProps> = memo(({ name }) => {
  const { loading, data } = useQuery<{
    tagPictures: IListQueryResult<PictureEntity>
  }>(TagPictures, {
    variables: {
      name,
      query: {
        page: 1,
        pageSize: 30,
      },
    },
  })
  if (loading && !data) {
    return <Skeleton />
  }
  return <PictureList noMore={false} list={data!.tagPictures.data} />
})

export default List
