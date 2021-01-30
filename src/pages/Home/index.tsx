import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import { Button, PictureList } from '@app/components';
import { NetworkStatus, useQuery } from '@apollo/client';
import { Pictures } from '@app/graphql/query';

import { PicturesType } from '@app/common/enum/picture';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import Skeleton from '@app/components/Picture/Skeleton';
import { IPaginationListData } from '@app/graphql/interface';

export const Home = observer(() => {
  const { loading, data, fetchMore, networkStatus } = useQuery<{
    pictures: IPaginationListData<PictureEntity>;
  }>(Pictures, {
    notifyOnNetworkStatusChange: true,
    variables: {
      type: PicturesType.NEW,
      query: {
        page: 1,
        pageSize: 20,
      },
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
  console.log(data, loading);
  return (
    <div
      style={{
        padding: '24px',
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
          <Button onClick={more}>加载更多</Button>
        </div>
      )}
    </div>
  );
});
