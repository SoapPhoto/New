import { UserEntity } from '@app/common/types/modules/user/user.entity';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, EmojiText, Popover } from '..';
import { StrutAlign } from '../Icons';
import { VipBadge } from '../Icons/VipBadge';

interface IUserItemProps {
  user: UserEntity;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const Info = styled.div`
  margin-left: 8px;
  flex: 1;
  overflow: hidden;
`;

const Username = styled.span`
  font-weight: 500;
  color: ${_ => _.theme.colors.text};
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Bio = styled(EmojiText)`
  font-size: 12px;
  color: ${_ => _.theme.colors.secondary};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 4px;
`;

const UserItem: React.FC<IUserItemProps> = memo(({ user }) => {
  const { t } = useTranslation();
  return (
    <Wrapper key={user.id}>
      <Avatar size={42} src={user.avatar} />
      <Info>
        <p>
          <Link to={`/@${user.username}`}>
            <Username>
              <EmojiText text={user.fullName} />
              {user.badge.find(v => v.name === 'prestige') && (
                <Popover
                  trigger="hover"
                  placement="top"
                  theme="dark"
                  openDelay={100}
                  content={<span>{t('label.vipppp')}</span>}
                >
                  <span>
                    <StrutAlign>
                      <VipBadge
                        size={18}
                        style={{ marginLeft: '4px', marginTop: -3 }}
                      />
                    </StrutAlign>
                  </span>
                </Popover>
              )}
            </Username>
          </Link>
        </p>
        {user.bio && <Bio text={user.bio} />}
      </Info>
    </Wrapper>
  );
});

export default UserItem;
