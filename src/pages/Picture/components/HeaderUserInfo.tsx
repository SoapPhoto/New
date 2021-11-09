import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React from 'react';

import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { EmojiText, Popover } from '@app/components';
import Button from '@app/components/Button';
import Avatar from '@app/components/Avatar';

import { useAccount } from '@app/stores/hooks';
import { useFollower } from '@app/utils/hooks';
import { useTranslation } from 'react-i18next';
import {
  BaseInfoItem,
  HeaderUserInfoFollowBtnBox,
  TimeSpan,
  UserHeader,
  UserHeaderWrapper,
  UserInfo,
  UserInfoRight,
  UserLink,
  UserName,
} from '../elements';

interface IProps {
  user: UserEntity;
  createTime: Date;
}

const HeaderUserInfo: React.FC<IProps> = observer(({ user, createTime }) => {
  const { t } = useTranslation();
  const { userInfo } = useAccount();
  const [follow, followLoading] = useFollower();
  return (
    <UserHeaderWrapper>
      <UserHeader>
        <UserInfo>
          <Avatar src={user.avatar} size={44} />
          <UserInfoRight>
            <UserLink style={{ marginBottom: '4px' }} to={`/user/${user.username}`}>
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
            <HeaderUserInfoFollowBtnBox>
              <Button loading={followLoading} onClick={() => follow(user)}>
                {user.isFollowing ? t('label.followed') : t('label.follow')}
              </Button>
            </HeaderUserInfoFollowBtnBox>
          )}
        </UserInfo>
      </UserHeader>
    </UserHeaderWrapper>
  );
});

export default HeaderUserInfo;
