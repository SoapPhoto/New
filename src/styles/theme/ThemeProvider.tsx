import * as React from 'react';
import { useThemeStore } from '@app/stores/hooks';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components/macro';
import { observer } from 'mobx-react';

export const ThemeProvider = observer(
  (props: { children: React.ReactChild }) => {
    const theme = useThemeStore();
    return (
      <OriginalThemeProvider theme={theme.theme}>
        {React.Children.only(props.children)}
      </OriginalThemeProvider>
    );
  },
);
