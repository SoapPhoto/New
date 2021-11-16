import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { rem } from 'polished';
import { observer } from 'mobx-react';
// import 'overlayscrollbars/css/OverlayScrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { useLazyQuery } from '@apollo/client';
import { UserNotification } from '@app/graphql/query';
import { NotificationEntity } from '@app/common/types/modules/notification/notification.entity';
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
  const [userNotification, userNotificationData] = useLazyQuery<{ userNotification: NotificationEntity[] }>(UserNotification);
  const { data, loading } = userNotificationData;
  useEffect(() => {
    userNotification();
  }, []);
  return (
    <Wrapper>
      <List
        options={{ scrollbars: { autoHide: 'move' } }}
      >
        {loading
          ? (
            <div css={css`min-height: 140px;display: flex;justify-content: center;align-items: center;`}>
              <Loading />
            </div>
          )
          : (
            <ListBox>
              {
                userNotificationData.data?.userNotification.map((notify) => (
                  <NotificationItem key={notify.id} data={notify} />
                ))
              }
            </ListBox>
          )}
      </List>
    </Wrapper>
  );
});
