import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { rem } from 'polished';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';

import { NotificationEntity } from '@app/common/types/modules/notification/notification.entity';
import { NotificationCategory } from '@app/common/enum/notification';
import Image from '@app/components/Image';
import { useFollower } from '@app/utils/hooks';
import { getPictureUrl } from '@app/utils/image';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { A, EmojiText, Popover } from '..';
import Avatar from '../Avatar';

interface IProps {
  data: NotificationEntity;
}

const Item = styled.div<{ read: number }>`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  grid-gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.widget.box.borderColor};
  ${(_) => (!_.read ? css`
    background: ${({ theme }) => theme.colors.gray1};
    ` as any : undefined)}
`;

const User = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-gap: 8px;
  align-items: center;
`;

const UserName = styled(EmojiText)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const Content = styled.div`
`;

const ContentHeader = styled.div`
  margin-bottom: 4px;
`;

const Handle = styled.div``;

const Picture = styled(A)`
  display: block;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 2px;
  & > img {
    width: 100%;
    height: 100%;
    font-family: "object-fit:cover";
    object-fit: cover;
  }
`;

const Date = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 12px;
  margin-left: 8px;
`;

export const NotificationItem: React.FC<IProps> = observer(({ data }) => {
  const [follow, followLoading] = useFollower();
  const content = useCallback(() => {
    switch (data.category) {
      case NotificationCategory.LIKED:
        return '喜欢了你的照片';
      case NotificationCategory.COMMENT:
        if (data.comment) {
          return `评论了：${data.comment.content}`;
        }
        return '';
      case NotificationCategory.REPLY:
        if (data.comment) {
          return `回复了：${data.comment.content}`;
        }
        return '';
      case NotificationCategory.FOLLOW:
        return '关注了你';
      default:
        return '';
    }
  }, [data.category, data.comment]);
  const handle = useCallback(() => {
    if (
      data.category === NotificationCategory.LIKED
      || data.category === NotificationCategory.COMMENT
      || data.category === NotificationCategory.REPLY
    ) {
      let picture: PictureEntity | undefined;
      if (data.category === NotificationCategory.LIKED) {
        picture = data.picture;
      } else {
        picture = data.comment?.picture;
      }
      if (picture) {
        const { key, id } = picture;
        return (
          <Picture to={`/picture/${id}`}>
            <Image src={getPictureUrl(key, 'itemprop')} />
          </Picture>
        );
      }
      return (
        <div>此图片已删除</div>
      );
    }
    if (data.category === NotificationCategory.FOLLOW) {
      if (data.user) {
        return (
          <div />
          // <FollowButton
          //   disabled={followLoading}
          //   size="small"
          //   user={data.user}
          //   isFollowing={isFollowing}
          //   onClick={() => follow(data.user!)}
          // />
        );
      }
    }
    return null;
  }, [data]);
  return (
    <Item read={data.read ? 1 : 0}>
      <User>
        <A
          css={css`font-size: 0;`}
          to={`/user/${data.publisher.username}`}
        >
          <Avatar size={36} src={data.publisher.avatar} />
        </A>
        <Content>
          <ContentHeader>
            <A
              to={`/user/${data.publisher.username}`}
              style={{ textDecoration: 'none' }}
              css={css`margin-right: 12px;`}
            >
              <UserName text={data.publisher.fullName} />
            </A>
            <Popover
              openDelay={100}
              trigger="hover"
              placement="top"
              theme="dark"
              content={<span>{dayjs(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>}
            >
              <Date>{dayjs(data.createTime).fromNow()}</Date>
            </Popover>
          </ContentHeader>
          <EmojiText
            css={css`font-size: 12px;img {font-size: 16px;}`}
            text={content()}
          />
        </Content>
      </User>
      <Handle>{handle()}</Handle>
    </Item>
  );
});
