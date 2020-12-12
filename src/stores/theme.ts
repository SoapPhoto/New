import { computed, makeObservable, observable } from 'mobx';
import { themes } from 'styles/theme/themes';
import { ThemeKeyType } from 'styles/theme/types';
import { isSystemDark } from 'styles/theme/utils';

class Theme {
  public selected: ThemeKeyType = 'dark';

  constructor() {
    makeObservable(this, {
      selected: observable,
      theme: computed,
    });
  }

  get theme() {
    if (this.selected === 'system') {
      return isSystemDark ? themes.dark : themes.dark;
    }
    return themes[this.selected];
  }
}

export default new Theme();
