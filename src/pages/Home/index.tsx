import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { NetworkStatus } from '@apollo/client';

import { PictureList } from '@app/components';
import Button from '@app/components/Button';

import { PicturesType } from '@app/common/enum/picture';
import { usePicturesQuery } from '@app/graphql/hooks/query';
import Skeleton from './Skeleton';

const Home = observer(() => {
  const { t } = useTranslation();
  const {
    loading, data, fetchMore, networkStatus,
  } = usePicturesQuery({
    type: PicturesType.NEW,
    query: {
      page: 1,
      pageSize: 20,
    },
  });

  const more = useCallback(() => {
    if (!data || networkStatus !== NetworkStatus.ready) {
      return;
    }
    const { pictures } = data;
    const { count, page, pageSize } = pictures;
    const nowPage = page + 1;
    if (pageSize * page >= count) {
      return;
    }
    fetchMore({
      variables: {
        query: {
          page: nowPage,
          pageSize: 20,
        },
      },
    });
  }, [data, fetchMore, networkStatus]);
  return (
    <div
      style={{
        padding: '28px',
        paddingTop: 0,
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      {(loading && networkStatus === NetworkStatus.loading) || !data ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <div>
          <PictureList list={data!.pictures.data} />
          <Button onClick={more}>{t('label.more')}</Button>
        </div>
      )}
    </div>
  );
});
export default Home;
