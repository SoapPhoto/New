import * as React from 'react';
import { useThemeStore } from '@app/stores/hooks';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  const theme = useThemeStore();
  return (
    <OriginalThemeProvider theme={theme.theme}>
      {React.Children.only(props.children)}
    </OriginalThemeProvider>
  );
};
