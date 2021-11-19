import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { EmojiText, Popover } from '@app/components';
import Avatar from '@app/components/Avatar';
import Button from '@app/components/Button';
import FollowButton from '@app/components/FollowButton';
import { VipBadge } from '@app/components/Icons/VipBadge';
import { useAccount } from '@app/stores/hooks';
import { customMedia } from '@app/styles/mediaQuery';
import { useFollower, useSearchParamModal, useTapButton } from '@app/utils/hooks';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { animated } from 'react-spring';
import styled, { css } from 'styled-components/macro';

interface IProps {
  user: UserEntity;
}

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: -58px auto 0px;
  padding: 0px 24px;
`;

const Box = styled.div`
  display: grid;
  height: auto;
  grid-auto-flow: row;
  grid-auto-rows: minmax(20px, auto);
  grid-template-columns: 140px auto;
  gap: 32px;
  ${customMedia.lessThan('mobile')`
    grid-template-columns: 110px auto;
  `}
`;

const AvatarStyle = styled(Avatar)`
  width: 140px;
  height: 140px;
  ${customMedia.lessThan('mobile')`
    width: 110px;
    height: 110px;
  `}
`;

const OnlineTag = styled.span`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  z-index: 1;
  transition: .3s transform cubic-bezier(0.075, 0.82, 0.165, 1);
  &:after {
    content: 'Online';
    display: inline-block;
    margin-top: 4px;
    background-color: rgb(70,201,58);
    color: #fff;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 10px;
  }
`;
const AvatarContent = styled.div`
  position: relative;
  text-align: center;
  &:hover {
    ${OnlineTag} {
      transform: translate3d(0,48px, 0);
    }
  }
`;

const InfoContent = styled.div``;

const UserName = styled.div`
  position: relative;
  margin-top: 12px;
  margin-bottom: 6px;
  display: flex;
  grid-gap: 12px;
  z-index: 1;
  color: #fff;
`;

const UserTotalBox = styled.div`
  margin-top: 6px;
`;
const UserTotal = styled.div`
  display: flex;
  width: 100%;
  margin-left: -12px;
`;
const UserTotalItemBtn = styled(animated.div as any)`
  padding: 0 12px;
  cursor: pointer;
`;
const UserTotalItem = styled.div`
  padding: 0 12px;
`;
const UserTotalItemCount = styled.span`
  font-family: Rubik;
  font-size: 20px;
  margin-right: 8px;
  font-weight: 600;
`;
const UserTotalItemLabel = styled.span`
  font-size: 12px;
  color: ${(_) => _.theme.colors.secondary};
`;

const UserInfoHeader: React.FC<IProps> = memo(({ user }) => {
  const [, , followerOpen] = useSearchParamModal(
    'user-follower',
    'modal-child',
  );
  const [, , followedOpen] = useSearchParamModal(
    'user-followed',
    'modal-child',
  );
  const [spring, bind] = useTapButton(1.05, 0.93);
  const [spring1, bind1] = useTapButton(1.05, 0.93);
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Box>
        <AvatarContent>
          <AvatarStyle borderSize={6} online={user.isOnline} src={user.avatar} />
          {
            user.isOnline && <OnlineTag />
          }
        </AvatarContent>
        <InfoContent>
          <UserName>
            <EmojiText
              css={css`
                font-weight: 700;
                font-size: 28px;
                max-width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-shadow: 0px 15px 5px rgba(0,0,0,0.1),
                  10px 20px 5px rgba(0,0,0,0.05),
                  -10px 20px 5px rgba(0,0,0,0.05);
              `}
              text={user.fullName}
            />
            {
              user?.badge?.find((v) => v.name === 'prestige') && (
              <Popover
                trigger="hover"
                placement="top"
                theme="dark"
                openDelay={100}
                content={<span>{t('label.vipppp')}</span>}
              >
                <div css={css`display: flex;align-items: center;font-size: 28px;`}>
                  <VipBadge size="1.2em" />
                </div>
              </Popover>
              )
            }
            <FollowButton user={user} />
          </UserName>
          <UserTotalBox>
            <UserTotal>
              <UserTotalItemBtn
                {...bind()}
                style={{
                  transform: spring.transform,
                }}
                onClick={() => followerOpen()}
              >
                <UserTotalItemCount>{user.followerCount}</UserTotalItemCount>
                <UserTotalItemLabel>
                  {t('user.label.followers')}
                </UserTotalItemLabel>
              </UserTotalItemBtn>
              <UserTotalItemBtn
                {...bind1()}
                style={{
                  transform: spring1.transform,
                }}
                onClick={() => followedOpen()}
              >
                <UserTotalItemCount>{user.followedCount}</UserTotalItemCount>
                <UserTotalItemLabel>
                  {t('user.label.followed')}
                </UserTotalItemLabel>
              </UserTotalItemBtn>
              <UserTotalItem>
                <UserTotalItemCount>{user.likesCount}</UserTotalItemCount>
                <UserTotalItemLabel>{t('user.label.likes')}</UserTotalItemLabel>
              </UserTotalItem>
            </UserTotal>
          </UserTotalBox>
        </InfoContent>
      </Box>
    </Wrapper>
  );
});

export default UserInfoHeader;
