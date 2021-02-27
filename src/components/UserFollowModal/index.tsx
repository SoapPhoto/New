import React, { memo, useEffect, useMemo } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import styled from 'styled-components';

import { Loading, Modal } from '..';
import { useLazyQuery } from '@apollo/client';
import { FollowedUsers, FollowerUsers } from '@app/graphql/query';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import UserItem from './UserItem';

const Content = styled(OverlayScrollbarsComponent)`
  flex: 1;
  /* max-height: 100%; */
`;

interface IProps {
  visible: boolean;
  onClose: () => void;
  type: 'follower' | 'followed';
  userId: number;
}

const UserFollowModal: React.FC<IProps> = memo(
  ({ visible, onClose, type, userId }) => {
    const [followedQuery, followedData] = useLazyQuery<{
      followedUsers: UserEntity[];
    }>(FollowedUsers, {
      fetchPolicy: 'network-only',
    });
    const [followerQuery, followerData] = useLazyQuery<{
      followerUsers: UserEntity[];
    }>(FollowerUsers, {
      fetchPolicy: 'network-only',
    });
    useEffect(() => {
      if (visible) {
        if (type === 'follower') {
          followerQuery({
            variables: {
              id: userId,
              limit: 30,
              offset: 0,
            },
          });
        } else {
          followedQuery({
            variables: {
              id: userId,
              limit: 30,
              offset: 0,
            },
          });
        }
      }
    }, [visible]);
    const result = useMemo(() => {
      if (type === 'follower') {
        return {
          called: followerData.called,
          loading: followerData.loading,
          data: followerData.data?.followerUsers || [],
        };
      } else {
        return {
          called: followedData.called,
          loading: followedData.loading,
          data: followedData.data?.followedUsers || [],
        };
      }
    }, [
      followedData.called,
      followedData.data?.followedUsers,
      followedData.loading,
      followerData.called,
      followerData.data?.followerUsers,
      followerData.loading,
      type,
    ]);
    const { called, loading, data } = result;
    return (
      <Modal
        closable
        centered
        visible={visible}
        onClose={onClose}
        maxWidth={400}
      >
        <Modal.Header>
          <Modal.Title>{type === 'follower' ? '粉丝' : '关注'}</Modal.Title>
        </Modal.Header>
        <Modal.Content
          css={`
            max-height: 400px;
            height: 90vh;
            display: flex;
            flex-direction: column;
          `}
        >
          {loading || !called ? (
            <div
              css={`
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <Loading />
            </div>
          ) : (
            <Content
              options={{
                scrollbars: { autoHide: 'move' },
                sizeAutoCapable: false,
              }}
            >
              {data.map(user => (
                <UserItem key={user.id} user={user} />
              ))}
            </Content>
          )}
        </Modal.Content>
      </Modal>
    );
  },
);

export default UserFollowModal;
