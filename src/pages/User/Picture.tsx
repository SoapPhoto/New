import React, { memo } from 'react';
import { useQuery } from '@apollo/client';
import { useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import { UserPictureType } from '@app/common/enum/picture';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { UserPictures } from '@app/graphql/query';
import PictureSkeleton from '@app/components/Picture/Skeleton';
import PictureList from '@app/components/Picture/List';
import usePicturePagination from '@app/utils/hooks/usePicturePagination';
import Empty from '@app/components/Empty';

const Wrapper = styled.div`
  padding: 24px;
  width: 100%;
`;

interface IProps {
  type: UserPictureType;
}

const UserHome: React.FC<IProps> = memo(({ type }) => {
  const { username } = useParams();
  console.log(username);
  const {
    loading, data, networkStatus, fetchMore,
  } = useQuery<{
    userPicturesByName: IListQueryResult<PictureEntity>;
  }>(UserPictures, {
    variables: {
      username,
      type,
      query: {
        page: 1,
        pageSize: 30,
      },
    },
  });
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
    });
  };
  const [more, notData, noMore] = usePicturePagination(data?.userPicturesByName, handle, loading, networkStatus);
  if (loading && !data) {
    return (
      <Wrapper>
        <PictureSkeleton />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <PictureList onPage={more} noMore={noMore} list={data?.userPicturesByName.data ?? []} />
      <Empty size="large" loading={!noMore} emptyText="我是有底线的！" />
    </Wrapper>
  );
});

export default UserHome;
