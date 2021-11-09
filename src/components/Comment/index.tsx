import React from 'react';
import { useTranslation } from 'react-i18next';
import Empty from '../Empty';
import { Wrapper } from './elements';

const Comment = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Empty emptyText={t('comment.empty')} />
    </Wrapper>
  );
};

export default Comment;
