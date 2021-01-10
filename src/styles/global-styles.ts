import { createGlobalStyle } from 'styled-components';
import { animate } from './animate';
import normalize from './normalize';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    color: ${p => p.theme.foreground};
  }
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }
  a {
    text-decoration: none;
    color: ${p => p.theme.colors.primary}
  }
  .lazyload-wrapper {
    width: 100%;
    height: 100%;
  }
  ${normalize}
  ${animate}
`;
