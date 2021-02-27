import { useQuery } from '@apollo/client';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { UserFollowModal } from '@app/components';
import { UserInfo } from '@app/graphql/query';
import { useSearchParamModal } from '@app/utils/hooks';
import React, { memo } from 'react';
import UserCover from './UserCover';
import UserInfoHeader from './UserInfoHeader';
import UserTab from './UserTab';

interface IProps {
  username: string;
}

const UserHeader: React.FC<IProps> = memo(({ username }) => {
  const [followerVisible, followerClose] = useSearchParamModal(
    'user-follower',
    'modal-child',
  );
  const [followedVisible, followedClose] = useSearchParamModal(
    'user-followed',
    'modal-child',
  );
  const { loading, data } = useQuery<{
    user: UserEntity;
  }>(UserInfo, {
    variables: {
      username,
    },
  });
  return (
    <>
      {loading || !data ? null : (
        <>
          <UserCover cover={data.user.cover} avatar={data.user.avatar} />
          <UserInfoHeader user={data.user} />
          <UserTab />
        </>
      )}
      <UserFollowModal
        visible={followerVisible && !loading}
        onClose={followerClose}
        type="follower"
        userId={data?.user.id || 0}
      />
      <UserFollowModal
        visible={followedVisible && !loading}
        onClose={followedClose}
        type="followed"
        userId={data?.user.id || 0}
      />
    </>
  );
});

export default UserHeader;
