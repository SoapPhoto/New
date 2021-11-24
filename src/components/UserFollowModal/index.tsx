import React, { memo, useEffect, useMemo } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import styled from 'styled-components/macro';

import { useLazyQuery } from '@apollo/client';
import { FollowedUsers, FollowerUsers } from '@app/graphql/query';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { useTranslation } from 'react-i18next';
import Modal from '@app/components/Modal';
import UserItem from './UserItem';
import { Loading } from '..';

const Content = styled(OverlayScrollbarsComponent)`
  flex: 1;
  /* max-height: 80vh;
  height: 100px; */
`;

interface IProps {
  visible: boolean;
  onClose: () => void;
  type: 'follower' | 'followed';
  userId: number;
}

const UserFollowModal: React.FC<IProps> = memo(
  ({
    visible, onClose, type, userId,
  }) => {
    const { t } = useTranslation();
    const [followedQuery, followedData] = useLazyQuery<{
      followedUsers: UserEntity[];
    }>(FollowedUsers, {
      fetchPolicy: 'cache-first',
    });
    const [followerQuery, followerData] = useLazyQuery<{
      followerUsers: UserEntity[];
    }>(FollowerUsers, {
      fetchPolicy: 'cache-first',
    });
    useEffect(() => {
      if (visible) {
        if (type === 'follower') {
          followerQuery({
            variables: {
              id: userId,
              query: {
                page: 1,
                pageSize: 30,
              },
            },
          });
        } else {
          console.log(userId);
          followedQuery({
            variables: {
              id: userId,
              query: {
                page: 1,
                pageSize: 30,
              },
            },
          });
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);
    const result = useMemo(() => {
      if (type === 'follower') {
        return {
          called: followerData.called,
          loading: followerData.loading,
          data: followerData.data?.followerUsers || [],
        };
      }
      return {
        called: followedData.called,
        loading: followedData.loading,
        data: followedData.data?.followedUsers || [],
      };
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
        autoMobile={false}
        visible={visible}
        onClose={onClose}
        maxWidth={400}
      >
        <Modal.Header>
          <Modal.Title>
            {type === 'follower'
              ? t('user.label.followers')
              : t('user.label.followed')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Content
          css={`
            max-height: 400px;
            height: 80vh;
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
              {data.map((user) => (
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
