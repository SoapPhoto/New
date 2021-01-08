import { action, computed, makeObservable, observable } from 'mobx';
import { themes } from '@app/styles/theme/themes';
import { ThemeKeyType } from '@app/styles/theme/types';
import {
  getThemeFromStorage,
  isSystemDark,
  saveTheme,
} from '@app/styles/theme/utils';

class Theme {
  public selected: ThemeKeyType = getThemeFromStorage() || 'system';

  constructor() {
    makeObservable(this, {
      selected: observable,
      theme: computed,
      setTheme: action,
    });
  }

  get theme() {
    if (this.selected === 'system') {
      return isSystemDark ? themes.dark : themes.light;
    }
    return themes[this.selected];
  }

  public setTheme = (theme: ThemeKeyType) => {
    saveTheme(theme);
    this.selected = theme;
  };
}

export default new Theme();
