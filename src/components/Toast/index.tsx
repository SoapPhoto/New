import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import ToastComponent, { ITotalConfig, ToastAction, ToastType } from './Toast';

interface IState {
  toasts: ITotalConfig[];
}

interface IToastArg {
  title: string;
  duration?: number;
  type?: ToastType;
  action?: ToastAction;
}

const timerCache: Record<string, number> = {};

class ToastInstance extends React.PureComponent<{}, IState> {
  state = {
    toasts: [],
  };

  add = (config: IToastArg) => {
    const key = uuidv4();
    if (config.duration && config.duration > 0) {
      timerCache[key] = window.setTimeout(() => {
        delete timerCache[key];
        this.delete(key);
      }, config.duration);
    }
    this.setState(state => {
      const array = [
        {
          key,
          title: config.title,
          type: config.type,
          action: config.action,
        },
        ...state.toasts,
      ];
      return {
        toasts: array.map((v, index) => ({
          ...v,
          index,
        })),
      };
    });
  };

  getKey = () => {};

  delete = (key: string) => {
    if (timerCache[key]) {
      clearTimeout(timerCache[key]);
      delete timerCache[key];
    }
    this.setState(state => {
      const array = state.toasts.filter(v => v.key !== key);
      return {
        toasts: array.map((v, index) => ({
          ...v,
          index,
        })),
      };
    });
  };

  render() {
    return <ToastComponent onDelete={this.delete} toasts={this.state.toasts} />;
  }
}

class Toast {
  public ref!: ToastInstance;

  constructor() {
    if (!(typeof window === 'undefined')) {
      const div = document.createElement('div');
      document.body.appendChild(div);
      let called = false;
      const refFunc = (ref: ToastInstance | null) => {
        if (called) {
          return;
        }
        if (ref) {
          called = true;
          this.ref = ref;
        }
      };
      ReactDOM.render(<ToastInstance ref={refFunc} />, div);
    }
  }

  public base = (
    title: string,
    duration: number = 3000,
    action?: ToastAction,
  ) => {
    this.ref.add({
      title,
      duration,
      type: 'base',
      action,
    });
  };

  public success = (
    title: string,
    duration: number = 3000,
    action?: ToastAction,
  ) => {
    this.ref.add({
      title,
      duration,
      type: 'success',
      action,
    });
  };

  public warning = (
    title: string,
    duration: number = 3000,
    action?: ToastAction,
  ) => {
    this.ref.add({
      title,
      duration,
      type: 'warning',
      action,
    });
  };

  public error = (
    title: string,
    duration: number = 3000,
    action?: ToastAction,
  ) => {
    this.ref.add({
      title,
      duration,
      type: 'error',
      action,
    });
  };
}

export default new Toast();
