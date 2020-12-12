import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';
import { stores } from 'stores';
// import { MobXProviderContext } from 'mobx-react';

export function useStores() {
  return useContext<typeof stores>(MobXProviderContext as any);
}

export function useThemeStore() {
  const { theme } = useStores();
  return theme;
}
