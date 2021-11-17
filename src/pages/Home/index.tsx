import React, {
  useCallback, useMemo, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { NetworkStatus } from '@apollo/client';

import PictureList from '@app/components/Picture/List';

import { PicturesType } from '@app/common/enum/picture';
import { usePicturesQuery } from '@app/graphql/hooks/query';
import { Helmet } from 'react-helmet-async';
import Head from '@app/components/Head';
import Skeleton from './Skeleton';

const Home = () => {
  const { t } = useTranslation();
  const {
    loading, data, fetchMore, networkStatus,
  } = usePicturesQuery({
    type: PicturesType.NEW,
    query: {
      page: 1,
      pageSize: 50,
    },
  });
  const currentPage = useRef(data?.pictures.page ?? 1);
  const maxPage = useMemo(() => (data?.pictures ? Math.ceil(data!.pictures.count / data!.pictures.pageSize) : 0), [data]);
  const noMore = useMemo(() => {
    if (!data?.pictures) {
      return true;
    }
    return data.pictures.page >= maxPage;
  }, [data?.pictures, maxPage]);
  const more = useCallback(async () => {
    if (!data || networkStatus !== NetworkStatus.ready) {
      return;
    }
    if (noMore) {
      return;
    }
    currentPage.current += 1;
    await fetchMore({
      variables: {
        query: {
          page: currentPage.current,
          pageSize: 50,
        },
      },
    });
  }, [currentPage, data, fetchMore, networkStatus, noMore]);
  return (
    <div
      style={{
        padding: '28px',
        paddingTop: 0,
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      <Head title="首页" />
      {(loading && networkStatus === NetworkStatus.loading) || !data ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <div>
          <PictureList onPage={more} noMore={false} list={data!.pictures.data} />
        </div>
      )}
    </div>
  );
};
export default Home;
