import React, { useEffect } from 'react';

import Fragments from '@app/graphql/fragments';
import { useApolloClient } from '@apollo/client';
import { UserEntity } from '@common/types/modules/user/user.entity';
import { useAccount } from '@app/stores/hooks';
import { observer } from 'mobx-react';

export const Home = observer(() => {
  const { userInfo } = useAccount();
  const client = useApolloClient();
  useEffect(() => {
    const data = client.readFragment<UserEntity>({
      fragment: Fragments,
      fragmentName: 'UserFragment',
      id: `User:3`,
    });
    if (data) {
      setTimeout(() => {
        client.writeFragment<UserEntity>({
          fragment: Fragments,
          fragmentName: 'UserFragment',
          id: `User:3`,
          data: {
            ...data,
            username: 'sdfasdfasdf',
          } as UserEntity,
        });
      }, 1000);
    }
  }, []);
  return <div>{userInfo ? userInfo.username : ''}</div>;
});
