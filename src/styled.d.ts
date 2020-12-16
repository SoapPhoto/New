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
    };
    dashboard: {};
    widget: {};
  }
}
