import { themes } from './themes';
import { ThemeKeyType } from './types';

/* istanbul ignore next line */
export const isSystemDark = window?.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')?.matches
  : undefined;

export function saveTheme(theme: ThemeKeyType) {
  window.localStorage && localStorage.setItem('selectedTheme', theme);
}

/* istanbul ignore next line */
export function getThemeFromStorage(): ThemeKeyType | null {
  const keys = Object.keys(themes);
  if (keys.find(v => v === localStorage.getItem('selectedTheme'))) {
    return localStorage.getItem('selectedTheme') as ThemeKeyType;
  }
  return null;
}
