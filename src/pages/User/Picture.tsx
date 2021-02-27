import React, { memo } from 'react';
import { useQuery } from '@apollo/client';

import { UserPictureType } from '@app/common/enum/picture';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { UserPictures } from '@app/graphql/query';
import PictureSkeleton from '@app/components/Picture/Skeleton';
import { PictureList } from '@app/components';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 24px;
  width: 100%;
`;

interface IProps {
  username: string;
  type: UserPictureType;
}

const UserHome: React.FC<IProps> = memo(({ username, type }) => {
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
  if (loading && !data) return <PictureSkeleton />;
  return (
    <Wrapper>
      <PictureList list={data!.userPicturesByName.data} />
    </Wrapper>
  );
});

export default UserHome;
