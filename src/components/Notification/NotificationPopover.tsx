import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { rem } from 'polished';
import { observer } from 'mobx-react';
// import 'overlayscrollbars/css/OverlayScrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import {
  useApolloClient, useLazyQuery, useMutation, useQuery,
} from '@apollo/client';
import { UnreadNotificationCount, UserNotification } from '@app/graphql/query';
import { NotificationEntity } from '@app/common/types/modules/notification/notification.entity';
import { MarkNotificationReadAll } from '@app/graphql/mutations';
import { NotificationItem } from './NotificationItem';
import { Empty } from '../Empty';
import { Loading } from '..';

const Wrapper = styled.div`
  width: 380px;
  /* height: 200px;
  overflow: auto; */
  /* display: grid;
  grid-auto-rows: max-content;
  grid-gap: ${rem(12)}; */
`;

const List = styled(OverlayScrollbarsComponent)`
  max-height: 300px;
`;

const ListBox = styled.div`
  display: grid;
  grid-template-rows: max-content;
`;

export const NotificationPopover = observer(() => {
  const { cache } = useApolloClient();
  const { data, loading } = useQuery<{ userNotification: NotificationEntity[] }>(UserNotification, { fetchPolicy: 'cache-and-network' });
  const [markNotificationReadAll] = useMutation(MarkNotificationReadAll);
  const mark = async () => {
    await markNotificationReadAll();
    const cacheData = cache.readQuery<any>({
      query: UnreadNotificationCount,
    });
    if (cacheData?.unreadNotificationCount.count) {
      cache.writeQuery({
        query: UnreadNotificationCount,
        data: {
          unreadNotificationCount: {
            ...cacheData?.unreadNotificationCount,
            count: 0,
          },
        },
      });
    }
  };
  useEffect(() => {
    console.log();
    return () => {
      mark();
    };
  }, []);
  return (
    <Wrapper>
      <List
        options={{ scrollbars: { autoHide: 'move' } }}
      >
        {(!data && loading)
          ? (
            <div css={css`min-height: 140px;display: flex;justify-content: center;align-items: center;`}>
              <Loading />
            </div>
          )
          : (
            <ListBox>
              {
                data?.userNotification.map((notify) => (
                  <NotificationItem key={notify.id} data={notify} />
                ))
              }
            </ListBox>
          )}
      </List>
    </Wrapper>
  );
});
