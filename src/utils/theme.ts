import { DefaultTheme, ThemedStyledProps } from 'styled-components';

export const space = (num = 1) => <P>(
  context: ThemedStyledProps<P, DefaultTheme>,
) => context.theme.space * num;
