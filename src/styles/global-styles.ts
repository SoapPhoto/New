import { createGlobalStyle } from 'styled-components/macro';
import { animate } from './animate';
import normalize from './normalize';
import scroll from './scroll';
import scrollbar from './scrollbar';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    color: ${(p) => p.theme.foreground};
  }
  p,
  label {
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }
  a {
    text-decoration: none;
    color: ${(p) => p.theme.colors.primary}
  }
  .lazyload-wrapper {
    width: 100%;
    height: 100%;
  }
  ${normalize}
  ${animate}
  ${scroll}
  ${scrollbar}
`;
