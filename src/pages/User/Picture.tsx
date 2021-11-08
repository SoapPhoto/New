import React, { memo } from 'react';
import { useQuery } from '@apollo/client';

import { UserPictureType } from '@app/common/enum/picture';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { UserPictures } from '@app/graphql/query';
import PictureSkeleton from '@app/components/Picture/Skeleton';
import { PictureList } from '@app/components';
import styled from 'styled-components';
import { useMatch, useParams } from 'react-router';

const Wrapper = styled.div`
  padding: 24px;
  width: 100%;
`;

interface IProps {
  type: UserPictureType;
}

const UserHome: React.FC<IProps> = memo(({ type }) => {
  const { username } = useParams();
  const { loading, data } = useQuery<{
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
  if (loading && !data) {
    return (
      <Wrapper>
        <PictureSkeleton />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <PictureList list={data!.userPicturesByName.data} />
    </Wrapper>
  );
});

export default UserHome;
