import { DefaultTheme } from 'styled-components';

const gray1 = 'rgba(24,25,28,1)';
const gray2 = 'rgba(20,20,23,1)';
const gray3 = 'rgba(15,16,19,1)';
const gray4 = 'rgba(10,11,14,1)';

const theme: DefaultTheme = {
  space: 4,
  background: 'rgba(0,0,0,1)',
  foreground: '#fff',
  colors: {
    error: 'rgb(255,77,79)',
    text: '#fff',
    primary: 'rgba(26, 92, 255, 1)',
    layout: '#121212',
    secondary: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 255,255, 0.1)',
    gray1,
    gray2,
    gray3,
    gray4,
  },
  dashboard: {},
  widget: {
    scrollbar: {
      graidient: 'rgba(0,0,0,.9)',
      background: 'rgba(0,0,0,.45)',
      hover: 'rgba(0,0,0,.55)',
      active: 'rgba(0,0,0,.7)',
    },
    input: {
      bg: '#343434',
      hoverBg: gray3,
    },
    skeleton: {
      accents1: '#111111',
      accents2: '#333333',
      background: gray1,
      shadow: 'transparent',
    },
    popover: {
      theme: 'dark',
      radius: 4,
      background: '#333',
    },
    modal: {
      background: '#1f1f1f',
    },
    toaster: {
      background: '#000',
      color: '#fff',
    },
  },
  // primary: 'rgba(26, 92, 255, 1)',
  // error: 'rgb(255,77,79)',
  // text: 'rgba(241,233,231,1)',
  // textSecondary: 'rgba(241,233,231,0.6)',
  // backgroundVariant: 'rgba(28,26,26,1)',
  // border: 'rgba(241,233,231,0.15)',
  // borderLight: 'rgba(241,233,231,0.05)',
};

export default theme;
