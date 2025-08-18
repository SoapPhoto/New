import type { stores } from '@app/stores'
import { MobXProviderContext } from 'mobx-react'
import { use } from 'react'
// import { MobXProviderContext } from 'mobx-react';

export function useStores() {
  return use<typeof stores>(MobXProviderContext as any)
}

export function useThemeStore() {
  const { theme } = useStores()
  return theme
}

export function useAccount() {
  const { account } = useStores()
  return account
}
