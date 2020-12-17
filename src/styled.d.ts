import 'styled-components';

/* This is the suggested way of declaring theme types */
declare module 'styled-components' {
  export interface DefaultTheme {
    foreground: string;
    background: string;
    space: number;
    colors: {
      text: string;
      error: string;
      primary: string;
      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      layout: string;
    };
    dashboard: {};
    widget: {
      input: {
        bg: string;
        hoverBg: string;
      };
    };
  }
}
