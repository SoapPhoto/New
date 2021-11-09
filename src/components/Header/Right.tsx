import React, { useCallback } from 'react';
import {
  Moon, Search, Sun, UploadCloud,
} from 'react-feather';
import styled from 'styled-components/macro';

import { A, IconButton, Popover } from '@app/components';
import { space } from '@app/utils/theme';
import { observer } from 'mobx-react';
import { useAccount, useThemeStore } from '@app/stores/hooks';
import { skeletonCss } from '@app/styles/mixins';
import { useTranslation } from 'react-i18next';
import { useSearchParamModal } from '@app/utils/hooks';
import { Menu, MenuItem, MenuItemLink } from './Menu';
import Avatar from '../Avatar';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: ${space(8)}px;
  svg {
    color: ${(_) => _.theme.colors.secondary};
    transition: color 0.25s ease;
    &:hover {
      color: ${(_) => _.theme.colors.text};
    }
  }
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
  const [, , openUpload] = useSearchParamModal('upload');
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
          <IconButton onClick={() => openUpload()}>
            <UploadCloud />
          </IconButton>
          <div style={{ width: '22px' }} />
          <Popover
            trigger="click"
            placement="bottom"
            contentStyle={{ padding: 0 }}
            content={(
              <Menu>
                <MenuItem>
                  <MenuItemLink to={`/user/${userInfo.username}`}>
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
              </Menu>
            )}
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
          <A to="/login">{t('label.login')}</A>
        </>
      )}
    </Wrapper>
  );
});
