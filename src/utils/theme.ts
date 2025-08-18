import type { DefaultTheme, ThemedStyledProps } from 'styled-components'

export function space(num = 1) {
  return <P>(
    context: ThemedStyledProps<P, DefaultTheme>,
  ) => context.theme.space * num
}
