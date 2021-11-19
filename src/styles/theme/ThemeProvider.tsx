import React, { useEffect } from 'react';
import { useThemeStore } from '@app/stores/hooks';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components/macro';
import { observer } from 'mobx-react';
import { isSystemDark } from './utils';

export const ThemeProvider = observer(
  (props: { children: React.ReactChild }) => {
    const { theme, selected } = useThemeStore();
    useEffect(() => {
      let t = selected;
      if (t === 'system') {
        t = isSystemDark ? 'dark' : 'light';
      }
      if (t === 'light') {
        document.body.removeAttribute('arco-theme');
      } else {
        document.body.setAttribute('arco-theme', 'dark');
      }
    }, [selected]);
    return (
      <OriginalThemeProvider theme={() => theme}>
        {React.Children.only(props.children)}
      </OriginalThemeProvider>
    );
  },
);
