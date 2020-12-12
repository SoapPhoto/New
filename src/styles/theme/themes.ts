import dark from './themes/dark';
import light from './themes/light';

export type Theme = typeof light;

export const themes = {
  light: light,
  dark: dark,
};
