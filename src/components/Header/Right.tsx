import React, { useCallback } from 'react';
import { Moon, Search, Sun, UploadCloud } from 'react-feather';
import styled from 'styled-components';

import { A, Popover } from '@app/components';
import { space } from '@app/utils/theme';
import { observer } from 'mobx-react';
import { useAccount, useThemeStore } from '@app/stores/hooks';
import Avatar from '../Avatar';
import { skeletonCss } from '@app/styles/mixins';
import { Menu, MenuItem, MenuItemLink } from './Menu';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: ${space(8)}px;
`;

export const SkeletonItem = styled.div`
  width: 80px;
  height: 12px;
  border-radius: 4px;
  margin-right: 12px;
  ${skeletonCss}
`;

const SkeletonAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  ${skeletonCss}
`;

export const Right = observer(() => {
  const { selected, setTheme } = useThemeStore();
  const { init, userInfo } = useAccount();
  const { t } = useTranslation();
  const switchTheme = useCallback(() => {
    setTheme(selected === 'dark' ? 'light' : 'dark');
  }, [setTheme, selected]);
  if (!init) {
    return (
      <Wrapper>
        <SkeletonItem />
        <SkeletonAvatar />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {userInfo ? (
        <>
          <A style={{ marginRight: 16 }} to="/upload">
            <UploadCloud />
          </A>
          <Popover
            trigger="click"
            placement="bottom"
            contentStyle={{ padding: 0 }}
            content={
              <Menu>
                <MenuItem>
                  <MenuItemLink to={`/@${userInfo.username}`}>
                    {t('menu.setting')}
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink onClick={switchTheme}>
                    {selected === 'dark' ? t('menu.light') : t('menu.dark')}
                    {selected === 'dark' ? (
                      <Sun size={18} />
                    ) : (
                      <Moon size={18} />
                    )}
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink to={`/@${userInfo.username}`}>
                    设置
                  </MenuItemLink>
                </MenuItem>
              </Menu>
            }
          >
            <div>
              <Avatar size={36} src={userInfo.avatar} />
            </div>
          </Popover>
        </>
      ) : (
        <>
          <A style={{ marginRight: 16 }} to="/search">
            <Search />
          </A>
          <A to="/login">登录</A>
        </>
      )}
    </Wrapper>
  );
});
