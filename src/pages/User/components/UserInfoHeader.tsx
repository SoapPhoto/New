import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { Avatar, EmojiText } from '@app/components';
import { customMedia } from '@app/styles/mediaQuery';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface IProps {
  user: UserEntity;
}

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: -58px auto 0px;
  padding: 0px 20px;
`;

const Box = styled.div`
  display: grid;
  height: auto;
  grid-auto-flow: row;
  grid-auto-rows: minmax(20px, auto);
  grid-template-columns: 140px auto;
  gap: 32px;
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
  ${customMedia.lessThan('mobile')`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-around;
  `}
`;
const UserTotalItem = styled.div`
  padding: 0 12px;
  ${customMedia.lessThan('mobile')`
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;
const UserTotalItemCount = styled.span`
  font-size: 20px;
  margin-right: 8px;
  font-weight: 600;
`;
const UserTotalItemLabel = styled.span`
  font-size: 12px;
  color: ${_ => _.theme.colors.secondary};
`;

const UserInfoHeader: React.FC<IProps> = ({ user }) => {
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
              <UserTotalItem>
                <UserTotalItemCount>{user.followerCount}</UserTotalItemCount>
                <UserTotalItemLabel>
                  {t('user.label.followers')}
                </UserTotalItemLabel>
              </UserTotalItem>
              <UserTotalItem>
                <UserTotalItemCount>{user.followedCount}</UserTotalItemCount>
                <UserTotalItemLabel>
                  {t('user.label.followed')}
                </UserTotalItemLabel>
              </UserTotalItem>
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
};

export default UserInfoHeader;
