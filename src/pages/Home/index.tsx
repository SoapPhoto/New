import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { PictureList } from '@app/components';
import { useQuery } from '@apollo/client';
import { Pictures } from '@app/graphql/query';

import { PicturesType } from '@app/common/enum/picture';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import Skeleton from '@app/components/Picture/Skeleton';

export const Home = observer(() => {
  const { loading, data } = useQuery<{
    pictures: { data: PictureEntity[] };
  }>(Pictures, {
    variables: {
      type: PicturesType.NEW,
      query: {
        page: 1,
        pageSize: 20,
      },
    },
  });
  return (
    <div
      style={{
        padding: '24px',
        paddingTop: 0,
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      {!loading && data ? (
        <div>
          <PictureList list={data.pictures.data} />
          {/* <PictureList list={data.pictures.data} /> */}
        </div>
      ) : (
        <div>
          <Skeleton />
        </div>
      )}
    </div>
  );
});
