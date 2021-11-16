import React from 'react';
import { observer } from 'mobx-react';
import { CommentEntity } from '@app/common/types/modules/comment/comment.entity';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { Wrapper } from './elements/list';

import { CommentItem } from './Item';

interface IProps {
  parent?: CommentEntity;
  author: UserEntity;
  comment: CommentEntity[];
  onConfirm: (value: string, commentId?: number) => Promise<void>;
  openModal?: (data: CommentEntity) => void;
}

export const CommentList: React.FC<IProps> = observer(({
  parent,
  author,
  comment,
  onConfirm,
  openModal,
}) => (
  <Wrapper>
    {
      comment.map((data) => (
        <CommentItem
          parent={parent}
          author={author}
          onConfirm={onConfirm}
          key={data.id}
          comment={data}
          openModal={openModal}
        />
      ))
    }
  </Wrapper>
));
