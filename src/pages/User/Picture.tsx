import type { UserPictureType } from '@app/common/enum/picture'
import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import { useQuery } from '@apollo/client'
import Empty from '@app/components/Empty'

import PictureList from '@app/components/Picture/List'
import PictureSkeleton from '@app/components/Picture/Skeleton'
import { UserPictures } from '@app/graphql/query'
import usePicturePagination from '@app/utils/hooks/usePicturePagination'
import React, { memo } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 24px;
  width: 100%;
`

interface IProps {
  type: UserPictureType
}

const UserHome: React.FC<IProps> = memo(({ type }) => {
  const { username } = useParams()
  const {
    loading,
    data,
    networkStatus,
    fetchMore,
  } = useQuery<{
    userPicturesByName: IListQueryResult<PictureEntity>
  }>(UserPictures, {
    variables: {
      username,
      type,
      query: {
        page: 1,
        pageSize: 30,
      },
    },
  })
  const handle = async (current: number) => {
    await fetchMore({
      variables: {
        username,
        type,
        query: {
          page: current,
          pageSize: 30,
        },
      },
    })
  }
  const [more, notData, noMore] = usePicturePagination(data?.userPicturesByName, handle, loading, networkStatus)
  if (loading && !data) {
    return (
      <Wrapper>
        <PictureSkeleton />
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <PictureList onPage={more} noMore={noMore} list={data?.userPicturesByName.data ?? []} />
      <Empty size="large" loading={!noMore} emptyText="我是有底线的！" />
    </Wrapper>
  )
})

export default UserHome
