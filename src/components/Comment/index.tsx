import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { AddComment } from '@app/graphql/mutations';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { Comments } from '@app/graphql/query';
import { CommentEntity } from '@app/common/types/modules/comment/comment.entity';
import { ListQueryData } from '@app/graphql/interface';
import { useAccount } from '@app/stores/hooks';
import { observer } from 'mobx-react';
import Empty from '../Empty';
import CommentEditor from './Editor';
import { Wrapper } from './elements';
import { CommentList } from './List';

interface IProps {
  id: number
  author: UserEntity
}

const Comment: React.FC<IProps> = ({ id, author }) => {
  const { t } = useTranslation();
  const { isLogin } = useAccount();
  const commentsData = useQuery<ListQueryData<'comments', CommentEntity>>(Comments, {
    variables: {
      id,
      query: {
        page: 1,
        pageSize: 10,
      },
    },
  });
  const [addComment, { data }] = useMutation(AddComment);
  const add = async (value: string, commentId?: number) => {
    await addComment({
      variables: {
        id,
        commentId,
        data: {
          content: value,
        },
      },
    });
    commentsData.refetch();
  };
  return (
    <Wrapper>
      {
        isLogin && (
          <CommentEditor onConfirm={add} />
        )
      }
      <CommentList
        author={author}
        onConfirm={add}
        comment={commentsData.data?.comments.data ?? []}
        // openModal={openModal}
      />
      {
        (commentsData.data?.comments.count === 0 || !commentsData.data) && (
          <Empty emptyText={t('comment.empty')} />
        )
      }
    </Wrapper>
  );
};

export default observer(Comment);
