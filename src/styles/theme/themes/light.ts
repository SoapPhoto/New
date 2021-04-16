import { DefaultTheme } from 'styled-components';

const gray1 = 'rgba(249,252,253,1)';
const gray2 = 'rgba(244,247,248,1)';
const gray3 = 'rgba(240,243,244,1)';
const gray4 = 'rgba(230,233,234,1)';

const theme: DefaultTheme = {
  space: 4,
  background: '#fff',
  foreground: 'rgb(44, 62, 80)',
  colors: {
    border: gray3,
    error: 'rgb(255,77,79)',
    text: 'rgba(58,52,51,1)',
    primary: 'rgba(26, 92, 255, 1)',
    layout: '#fff',
    secondary: '#8a92a9',
    gray1,
    gray2,
    gray3,
    gray4,
  },
  dashboard: {},
  widget: {
    scrollbar: {
      graidient: 'rgba(255,255,255,.9)',
      background: 'rgba(0,0,0,.45)',
      hover: 'rgba(0,0,0,.55)',
      active: 'rgba(0,0,0,.7)',
    },
    input: {
      bg: gray2,
      hoverBg: gray3,
    },
    skeleton: {
      accents1: '#fafafa',
      accents2: '#eaeaea',
      background: '#fff',
      shadow: 'rgba(0, 0, 0, 0.06)',
    },
    popover: {
      theme: 'light',
      radius: 4,
      background: '#333',
    },
    modal: {
      background: '#fff',
    },
    toaster: {
      background: '#fff',
      color: 'rgba(58,52,51,1)',
    },
  },
};

export default theme;
