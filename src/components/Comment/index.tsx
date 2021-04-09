import React from 'react';
import { Empty } from '..';
import { Wrapper } from './elements';

const Comment = () => {
  return (
    <Wrapper>
      <Empty emptyText="暂无评论" />
    </Wrapper>
  );
};

export default Comment;
