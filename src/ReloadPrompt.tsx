// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react';
import { Notification } from '@arco-design/web-react';

import { useRegisterSW } from 'virtual:pwa-register/react';

import '@arco-design/web-react/es/Notification/style/index.js';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components/macro';
import Button from './components/Button';
import { useThemeStore } from './stores/hooks';

const ReloadPrompt = () => {
  const { theme } = useThemeStore();
  // replaced dynamically
  const buildDate = '__DATE__';
  // replaced dyanmicaly
  const reloadSW = '__RELOAD_SW__';

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // @ts-ignore
      if (reloadSW === 'true') {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        r && setInterval(() => {
          console.log('Checking for sw update');
          r.update();
        }, 20000 /* 20s for testing purposes */);
      } else {
        // eslint-disable-next-line prefer-template
        console.log('SW Registered: ' + r);
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };
  function updateNotification() {
    const id = `${Date.now()}`;
    Notification.info({
      id,
      content: offlineReady ? '准备就绪！' : '新内容可用，单击重新加载按钮进行更新！',
      duration: 0,
      position: 'bottomRight',
      onClose: () => {
        close();
      },
      btn: (
        <span>
          <ThemeProvider theme={theme}>
            <Button
              style={{ width: 'auto' }}
              onClick={() => {
                updateServiceWorker(true);
                Notification.remove(id);
              }}
            >
              {offlineReady ? '好的！' : '重新加载'}
            </Button>
          </ThemeProvider>
        </span>
      ),
    });
  }
  useEffect(() => {
    if (offlineReady || needRefresh) {
      updateNotification();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offlineReady, needRefresh]);

  return (
    <div className="ReloadPrompt-container">
      {/* { (offlineReady || needRefresh)
          && (
          <div className="ReloadPrompt-toast">
            <div className="ReloadPrompt-message">
              { offlineReady
                ? <span>App ready to work offline</span>
                : <span>New content available, click on reload button to update.</span>}
            </div>
            { needRefresh && <button className="ReloadPrompt-toast-button" onClick={() => updateServiceWorker(true)}>Reload</button> }
            <button className="ReloadPrompt-toast-button" onClick={() => close()}>Close</button>
          </div>
          )} */}
    </div>
  );
};

export default observer(ReloadPrompt);
