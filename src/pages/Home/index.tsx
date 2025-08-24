import { NetworkStatus } from '@apollo/client'
import { PicturesType } from '@app/common/enum/picture'
import Empty from '@app/components/Empty'

import Head from '@app/components/Head'

import PictureList from '@app/components/Picture/List'
import { usePicturesQuery } from '@app/graphql/hooks/query'
import React, {
  useMemo,
  useRef,
} from 'react'
import Skeleton from './Skeleton'

function HomePage() {
  const {
    loading,
    data,
    fetchMore,
    networkStatus,
  } = usePicturesQuery({
    type: PicturesType.NEW,
    query: {
      page: 1,
      pageSize: 30,
    },
  })
  const currentPage = useRef(data?.pictures.page ?? 1)
  const maxPage = useMemo(() => (data?.pictures ? Math.ceil(data!.pictures.count / data!.pictures.pageSize) : 0), [data])
  const notData = useMemo(() => (loading && networkStatus === NetworkStatus.loading) || !data, [data, loading, networkStatus])
  const noMore = useMemo(() => {
    if (!data?.pictures) {
      return true
    }
    return data.pictures.page >= maxPage
  }, [data?.pictures, maxPage])
  const more = async () => {
    if (!data || networkStatus !== NetworkStatus.ready) {
      return
    }
    if (noMore) {
      return
    }
    currentPage.current += 1
    await fetchMore({
      variables: {
        query: {
          page: currentPage.current,
          pageSize: 30,
        },
      },
    })
  }
  return (
    <div
      style={{
        paddingTop: 0,
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      <Head title="首页" />
      { notData
        ? (
            <div>
              <Skeleton />
            </div>
          )
        : (
            <div>
              <PictureList onPage={more} noMore={noMore} list={data!.pictures.data} />
              <Empty size="large" loading={!noMore} emptyText="我是有底线的！" />
            </div>
          )}
    </div>
  )
}
export default HomePage
