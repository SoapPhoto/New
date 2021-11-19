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
  .ReloadPrompt-container {
    padding: 0;
    margin: 0;
    width: 0;
    height: 0;
  }
  .ReloadPrompt-toast {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 16px;
    padding: 12px;
    border: 1px solid #8885;
    border-radius: 4px;
    z-index: 1;
    text-align: left;
    box-shadow: 3px 4px 5px 0 #8885;
    background-color: white;
  }
  .ReloadPrompt-toast-message {
    margin-bottom: 8px;
  }
  .ReloadPrompt-toast-button {
    border: 1px solid #8885;
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
  }
  ${normalize}
  ${animate}
  ${scroll}
  ${scrollbar}
`;
