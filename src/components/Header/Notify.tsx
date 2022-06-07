import { useQuery } from '@apollo/client';
import { UnreadNotificationCount } from '@app/graphql/query';
import { Badge } from '@arco-design/web-react';
import { observer } from 'mobx-react';
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { useTheme } from 'styled-components/macro';

import { isSystemDark } from '@app/styles/theme/utils';
import { useThemeStore } from '@app/stores/hooks';
import { Popover } from '..';
import IconButton from '../Button/IconButton';
import { Bell } from '../Icons';
import { NotificationPopover } from '../Notification';
import { PopoverRef } from '../Popover';

import '@arco-design/web-react/es/Badge/style/index.js';

const ButtonBox = styled.div`
  position: relative;
  margin-right: 24px;
  font-size: 0;
`;

export const Notify: React.FC = observer(() => {
  const { data } = useQuery<{ unreadNotificationCount: { count: number } }>(UnreadNotificationCount);
  const pathname = useLocation();
  const popoverRef = useRef<PopoverRef>(null);
  const { theme } = useThemeStore();
  useEffect(() => {
    if (popoverRef.current) {
      popoverRef.current?.close();
    }
  }, [pathname]);
  console.log(theme.state);
  return (
    <div>
      <Popover
        popoverRef={popoverRef}
        trigger="click"
        placement="bottom"
        theme={theme.state}
        destroyOnClose
        content={<NotificationPopover />}
        contentStyle={{ padding: 0 }}
      >
        <ButtonBox>
          <IconButton>
            <Badge count={data?.unreadNotificationCount.count ?? 0} maxCount={9} dotStyle={{ fontSize: 10 }}>
              <Bell />
            </Badge>
          </IconButton>
        </ButtonBox>
      </Popover>
    </div>
  );
});
