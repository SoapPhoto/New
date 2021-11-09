import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { EmojiText } from '@app/components';
import Avatar from '@app/components/Avatar';
import { customMedia } from '@app/styles/mediaQuery';
import { useSearchParamModal, useTapButton } from '@app/utils/hooks';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { animated } from 'react-spring';
import styled from 'styled-components/macro';

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

const AvatarContent = styled.div``;

const InfoContent = styled.div``;

const UserName = styled.h2`
  position: relative;
  font-size: 28px;
  margin-top: 12px;
  margin-bottom: 6px;
  display: grid;
  grid-template-columns: 1fr max-content;
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
          <AvatarStyle src={user.avatar} />
        </AvatarContent>
        <InfoContent>
          <UserName>
            <EmojiText text={user.fullName} />
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
