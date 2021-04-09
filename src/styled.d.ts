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
      secondary: string;
      border: string;
    };
    dashboard: {};
    widget: {
      scrollbar: {
        graidient: string;
        background: string;
        hover: string;
        active: string;
      };
      input: {
        bg: string;
        hoverBg: string;
      };
      skeleton: {
        accents1: string;
        accents2: string;
        background: string;
        shadow: string;
      };
      popover: {
        theme: string;
        radius: number;
        background: string;
      };
      modal: {
        background: string;
      };
    };
  }
}
