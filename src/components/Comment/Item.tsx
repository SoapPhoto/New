import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import { rem } from 'polished';
import { css } from 'styled-components/macro';
import day from 'dayjs';

import { CommentEntity } from '@app/common/types/modules/comment/comment.entity';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { useTranslation } from 'react-i18next';
import { useAccount } from '@app/stores/hooks';
import UserPopover from '../UserPopover';
import {
  ChildComment, ConfirmText, ContentBox, ContentItem, Dot, InfoBox, ItemBox, MainBox, MoreChildComment, MoreChildCommentBtn, ReplyLabel, UserLabel, UserName,
} from './elements/list';
import { A, EmojiText, Popover } from '..';
import { ChevronsRight, StrutAlign } from '../Icons';
import CommentEditor from './Editor';
import { CommentList } from './List';
import Avatar from '../Avatar';

interface ICommentItem {
  visibleChild?: boolean;
  parent?: CommentEntity;
  author: UserEntity;
  comment: CommentEntity;
  onConfirm: (value: string, commentId?: number) => Promise<void>;
  openModal?: (data: CommentEntity) => void;
}

export const CommentItem: React.FC<ICommentItem> = observer(({
  visibleChild = true,
  parent,
  author,
  comment,
  onConfirm,
  openModal,
}) => {
  const { t } = useTranslation();
  const { isLogin } = useAccount();
  const [isComment, setComment] = useState(false);
  const [visibleComment, setVisibleComment] = useState(true);
  const {
    user, id, content, createTime, childComments, replyUser, replyComment,
  } = comment;
  const openComment = useCallback(() => {
    setComment(!isComment);
  }, [isComment]);
  const handleChildComment = useCallback(() => {
    setVisibleComment(!visibleComment);
  }, [visibleComment]);
  const addComment = useCallback(async (commentContent: string) => {
    await onConfirm(commentContent, comment.id);
    setComment(false);
  }, [comment.id, onConfirm]);
  const openItemModal = useCallback(() => {
    if (openModal) {
      openModal(comment);
    }
  }, [comment, openModal]);
  return (
    <ItemBox id={`comment-${id}`}>
      <UserPopover username={user.username}>
        <A
          to={`/user/${user.username}`}
        >
          <Avatar src={user.avatar} />
        </A>
      </UserPopover>
      <MainBox>
        <ContentBox>
          <ContentItem>
            <A
              to={`/user/${user.username}`}
              css={css`text-decoration: none;display: inline-block;` as any}
            >
              <UserName>
                <EmojiText
                  text={user.fullName}
                />
              </UserName>
            </A>
            {
              author.username === user.username && (
                <UserLabel>
                  {t('comment.author')}
                </UserLabel>
              )
            }
            {
              !!(replyComment && replyUser) && !!(parent?.id !== comment.replyComment.id) && (
                <ReplyLabel>
                  <StrutAlign>
                    <ChevronsRight size={18} />
                  </StrutAlign>
                  <UserPopover username={replyUser.username}>
                    <A
                      to={`/user/${replyUser.username}`}
                      css={css`text-decoration: none;display: inline-block; margin-left: ${rem(4)};` as any}
                    >
                      <UserName>
                        <EmojiText
                          text={replyUser.fullName}
                        />
                      </UserName>
                    </A>
                  </UserPopover>
                  {/* <span>：</span> */}
                </ReplyLabel>
              )
            }
            <Dot>·</Dot>
            <Popover
              openDelay={100}
              trigger="hover"
              placement="top"
              theme="dark"
              content={<span>{day(createTime).format('YYYY-MM-DD HH:mm:ss')}</span>}
            >
              <p css={css`font-size: 12px;color: ${({ theme }) => theme.colors.secondary};`}>
                {day(createTime).fromNow()}
              </p>
            </Popover>
          </ContentItem>
          <div>
            <EmojiText
              text={content}
            />
          </div>
        </ContentBox>
        <InfoBox>
          {
            childComments?.length > 0 && visibleChild && (
              <>
                <ConfirmText
                  onClick={handleChildComment}
                >
                  {visibleComment ? t('comment.close_reply') : t('comment.open_reply', { total: comment.subCount.toString() })}
                </ConfirmText>
                {
                  isLogin && (
                    <Dot>·</Dot>
                  )
                }
              </>
            )
          }
          {
            isLogin && (
              <>
                <ConfirmText
                  onClick={openComment}
                >
                  {t('comment.reply')}
                </ConfirmText>
              </>
            )
          }
        </InfoBox>
        {
          isComment && (
            <div css={css`margin-top: ${rem(12)};`}>
              <CommentEditor
                child
                onConfirm={addComment}
                placeholder={`${t('comment.reply')}@${user.fullName}：`}
                onClose={() => setComment(false)}
              />
            </div>
          )
        }
        {
          childComments?.length > 0 && visibleComment && visibleChild && (
            <ChildComment>
              <CommentList
                openModal={openModal}
                parent={comment}
                author={author}
                onConfirm={onConfirm}
                comment={childComments}
              />
              {
                comment.subCount > 3 && (
                  <MoreChildComment>
                    <MoreChildCommentBtn type="secondary" onClick={openItemModal}>{t('comment.open_all_comment')}</MoreChildCommentBtn>
                  </MoreChildComment>
                )
              }
            </ChildComment>
          )
        }
      </MainBox>
    </ItemBox>
  );
});
