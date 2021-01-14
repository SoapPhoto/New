import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React from 'react';

import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { EmojiText, Popover, Button } from '@app/components';
import Avatar from '@app/components/Avatar';

import {
  BaseInfoItem,
  TimeSpan,
  UserHeader,
  UserHeaderWrapper,
  UserInfo,
  UserInfoRight,
  UserLink,
  UserName,
} from '../elements';
import { useAccount } from '@app/stores/hooks';
import { useFollower } from '@app/utils/hooks';

interface IProps {
  user: UserEntity;
  createTime: Date;
}

const HeaderUserInfo: React.FC<IProps> = observer(({ user, createTime }) => {
  const { userInfo } = useAccount();
  const [follow, followLoading] = useFollower();
  return (
    <UserHeaderWrapper>
      <UserHeader>
        <UserInfo>
          <Avatar src={user.avatar} size={44} />
          <UserInfoRight>
            <UserLink style={{ marginBottom: '4px' }} to={`/@${user.username}`}>
              <UserName>
                <EmojiText text={user.fullName} />
              </UserName>
            </UserLink>
            <BaseInfoItem>
              <Popover
                openDelay={100}
                trigger="hover"
                placement="top"
                theme="dark"
                content={
                  <span>{dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                }
              >
                <TimeSpan>{dayjs(createTime).fromNow()}</TimeSpan>
              </Popover>
            </BaseInfoItem>
          </UserInfoRight>
          {userInfo && (
            <div
              css={`
                margin-left: 12px;
                display: flex;
                align-items: center;
              `}
            >
              <Button loading={followLoading} onClick={() => follow(user)}>
                {user.isFollowing ? '已关注' : '关注'}
              </Button>
            </div>
          )}
        </UserInfo>
      </UserHeader>
    </UserHeaderWrapper>
  );
});

export default HeaderUserInfo;