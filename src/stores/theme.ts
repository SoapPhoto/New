import type { ThemeKeyType } from '@app/styles/theme/types'
import { themes } from '@app/styles/theme/themes'
import {
  getThemeFromStorage,
  isSystemDark,
  saveTheme,
} from '@app/styles/theme/utils'
import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx'

class Theme {
  public selected: ThemeKeyType = getThemeFromStorage() || 'system'

  constructor() {
    makeObservable(this, {
      selected: observable,
      theme: computed,
      setTheme: action,
    })
  }

  get theme() {
    if (this.selected === 'system') {
      return isSystemDark ? themes.dark : themes.light
    }
    return themes[this.selected]
  }

  public setTheme = (theme: ThemeKeyType) => {
    if (theme === 'light') {
      document.body.removeAttribute('arco-theme')
    }
    if (theme === 'dark') {
      document.body.setAttribute('arco-theme', 'dark')
    }
    saveTheme(theme)
    this.selected = theme
  }
}

export default new Theme()
