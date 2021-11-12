import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import List from './components/PictureList';
import { Title } from './elements';

const TagPage = memo(() => {
  const params = useParams();
  const name = useMemo(() => decodeURI(params.name as string), [params.name]);
  // const { loading, data } = useQuery<{
  //   tag: IListQueryResult<PictureEntity>;
  // }>(Tag, {
  //   variables: {
  //     name: name,
  //   },
  // });
  return (
    <div>
      <Title>{name}</Title>
      <List name={name} />
    </div>
  );
});

export default TagPage;
