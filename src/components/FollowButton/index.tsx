import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { useAccount } from '@app/stores/hooks';
import { useFollower } from '@app/utils/hooks';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import Button from '../Button';

interface IProps {
  user: UserEntity
}

const FollowBox = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
`;

const FollowButton: React.FC<IProps> = ({ user }) => {
  const [follow, followLoading] = useFollower();
  const { userInfo } = useAccount();
  const { t } = useTranslation();
  const isMe = useMemo(() => user.id === userInfo?.id, [user.id, userInfo?.id]);
  if (isMe) return null;
  return (
    <FollowBox>
      <Button
        type={user.isFollowing ? 'secondary' : 'primary'}
        loading={followLoading}
        onClick={() => follow(user)}
      >
        {user.isFollowing ? t('label.followed') : t('label.follow')}
      </Button>
    </FollowBox>
  );
};

export default FollowButton;
