import { observer } from 'mobx-react';
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import { Popover } from '..';
import IconButton from '../Button/IconButton';
import { Bell } from '../Icons';
import { NotificationPopover } from '../Notification';
import { PopoverRef } from '../Popover';

const ButtonBox = styled.div`
  position: relative;
  margin-right: 24px;
  font-size: 0;
`;

export const Notify: React.FC = observer(() => {
  const pathname = useLocation();
  const popoverRef = useRef<PopoverRef>(null);
  useEffect(() => {
    if (popoverRef.current) {
      popoverRef.current?.close();
    }
  }, [pathname]);
  return (
    <div>
      <Popover
        popoverRef={popoverRef}
        trigger="click"
        placement="bottom"
        theme="light"
        content={<NotificationPopover />}
      >
        <ButtonBox>
          <IconButton>
            <Bell />
          </IconButton>
          <div
            css={css`
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${({ theme }) => theme.colors.error};
            border-radius: 50%;
            right: -4px;
            top: -4px;
          `}
          />
        </ButtonBox>
      </Popover>
    </div>
  );
});
