import React, { useCallback, useRef, useEffect } from 'react';
import {
  Moon, Search, Sun, UploadCloud,
} from 'react-feather';
import styled from 'styled-components/macro';
import { useLocation, useNavigate } from 'react-router-dom';
import { animated } from 'react-spring';

import {
  A, EmojiText, Popover,
} from '@app/components';
import { space } from '@app/utils/theme';
import { observer } from 'mobx-react';
import { useAccount, useThemeStore } from '@app/stores/hooks';
import { skeletonCss } from '@app/styles/mixins';
import { useTranslation } from 'react-i18next';
import { useSearchParamModal, useTapButton } from '@app/utils/hooks';
import {
  Menu, MenuItem, MenuItemLink, MenuProfile, UserName,
} from './Menu';
import Avatar from '../Avatar';
import { PopoverRef } from '../Popover';
import IconButton from '../Button/IconButton';
import { Notify } from './Notify';

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
  const navigate = useNavigate();
  const pathname = useLocation();
  const popoverRef = useRef<PopoverRef>(null);
  const { selected, setTheme } = useThemeStore();
  const { init, userInfo, logout } = useAccount();
  const { t } = useTranslation();
  const [spring, bind] = useTapButton();
  const [, , openUpload] = useSearchParamModal('upload');
  const switchTheme = useCallback(() => {
    setTheme(selected === 'dark' ? 'light' : 'dark');
  }, [setTheme, selected]);
  useEffect(() => {
    if (popoverRef.current) {
      popoverRef.current?.close();
    }
  }, [pathname]);
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
          <IconButton onClick={() => navigate('/s')}>
            <Search />
          </IconButton>
          <div style={{ width: '22px' }} />
          <IconButton onClick={() => openUpload()}>
            <UploadCloud />
          </IconButton>
          <div style={{ width: '22px' }} />
          <Notify />
          <Popover
            trigger="click"
            popoverRef={popoverRef}
            placement="bottom"
            contentStyle={{ padding: 0 }}
            content={(
              <Menu>
                <MenuItem>
                  <MenuItemLink to={`/user/${userInfo.username}`}>
                    <MenuProfile>
                      <Avatar
                        size={34}
                        src={userInfo!.avatar}
                      />
                      <UserName>
                        <EmojiText
                          text={userInfo.fullName}
                        />
                      </UserName>
                    </MenuProfile>
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink to="/setting/profile">
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
                  <MenuItemLink onClick={logout}>
                    {t('menu.signout')}
                  </MenuItemLink>
                </MenuItem>
              </Menu>
            )}
          >
            <animated.button
              {...bind()}
              style={{
                transform: spring.transform as any,
                cursor: 'pointer',
              }}
            >
              <Avatar size={36} src={userInfo.avatar} />
            </animated.button>
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
