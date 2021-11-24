import { UserEntity } from '@app/common/types/modules/user/user.entity';
import Head from '@app/components/Head';
import UserFollowModal from '@app/components/UserFollowModal';
import { useSearchParamModal } from '@app/utils/hooks';
import useQueryUser from '@app/utils/hooks/useQueryUser';
import useUserOnlineStatusSubscription from '@app/utils/hooks/useUserOnlineStatusSubscription';
import React, { memo } from 'react';
import UserSkeleton from '../Skeleton';
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
  const [{ loading, data }, cacheData] = useQueryUser<{ user: UserEntity }>(username);
  let user: UserEntity | undefined;
  if (!data) {
    user = cacheData;
  } else {
    user = data.user;
  }
  // ws 用户在线状态
  useUserOnlineStatusSubscription(user?.id);
  return (
    <>
      {((loading && !user) || !user) ? (
        <UserSkeleton />
      ) : (
        <>
          <Head title={`${user.fullName ?? ''} (@${user?.username})`} />
          <UserCover cover={user.cover} avatar={user.avatar} />
          <UserInfoHeader user={user} />
          <UserTab />
          <UserFollowModal
            visible={followerVisible && !loading}
            onClose={followerClose}
            type="follower"
            userId={user?.id || 0}
          />
          <UserFollowModal
            visible={followedVisible && !loading}
            onClose={followedClose}
            type="followed"
            userId={user?.id || 0}
          />
        </>
      )}
    </>
  );
});

export default UserHeader;
