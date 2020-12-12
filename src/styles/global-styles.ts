import { createGlobalStyle } from 'styled-components';
import { animate } from './animate';
import normalize from './normalize';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    color: rgb(44, 62, 80);
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }
  ${normalize}
  ${animate}
`;
