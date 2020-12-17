import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';
import { stores } from '@app/stores';
// import { MobXProviderContext } from 'mobx-react';

export function useStores() {
  return useContext<typeof stores>(MobXProviderContext as any);
}

export function useThemeStore() {
  const { theme } = useStores();
  return theme;
}

export function useAccount() {
  const { account } = useStores();
  return account;
}
