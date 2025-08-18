import type { UserEntity } from '@app/common/types/modules/user/user.entity'
import { EmojiText, Popover } from '@app/components'
import Avatar from '@app/components/Avatar'

import FollowButton from '@app/components/FollowButton'

import dayjs from 'dayjs'
import { observer } from 'mobx-react'
import React from 'react'
import {
  BaseInfoItem,
  TimeSpan,
  UserHeader,
  UserHeaderWrapper,
  UserInfo,
  UserInfoRight,
  UserLink,
  UserName,
} from '../elements'

interface IProps {
  user: UserEntity
  createTime: Date
  isMe: boolean
}

const HeaderUserInfo: React.FC<IProps> = observer(({ user, createTime }) => (
  <UserHeaderWrapper>
    <UserHeader>
      <UserInfo>
        <Avatar src={user?.avatar} size={44} />
        <UserInfoRight>
          <UserLink style={{ marginBottom: '4px' }} to={`/user/${user?.username}`}>
            <UserName>
              {user && <EmojiText text={user?.fullName} />}
            </UserName>
          </UserLink>
          <BaseInfoItem>
            <Popover
              openDelay={200}
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
        {
          user && <FollowButton user={user} />
        }
      </UserInfo>
    </UserHeader>
  </UserHeaderWrapper>
))

export default HeaderUserInfo
