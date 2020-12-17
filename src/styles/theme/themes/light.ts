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
    error: 'rgb(255,77,79)',
    text: 'rgba(58,52,51,1)',
    primary: 'rgba(26, 92, 255, 1)',
    layout: '#fff',
    gray1,
    gray2,
    gray3,
    gray4,
  },
  dashboard: {},
  widget: {
    input: {
      bg: gray2,
      hoverBg: gray3,
    },
  },
};

export default theme;
