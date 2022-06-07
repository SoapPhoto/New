import 'styled-components/macro';

/* This is the suggested way of declaring theme types */
declare module 'styled-components/macro' {
  export interface DefaultTheme {
    state: string;
    foreground: string;
    background: string;
    shadowColor: string;
    space: number;
    colors: {
      pure: string;
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
      green: string;
    };
    dashboard: {};
    widget: {
      box: {
        borderColor: string;
      }
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
      collection: {
        background: string;
        addPicture: {
          background: string;
          color: string;
        };
      };
      popover: {
        theme: string;
        radius: number;
        background: string;
      };
      modal: {
        background: string;
      };
      toaster: {
        background: string;
        color: string;
      };
    };
  }
}

declare module 'react' {
  interface Attributes {
    // NOTE: unlike the plain javascript version, it is not possible to get access
    // to the element's own attributes inside function interpolations.
    // Only theme will be accessible, and only with the DefaultTheme due to the global
    // nature of this declaration.
    // If you are writing this inline you already have access to all the attributes anyway,
    // no need for the extra indirection.
    /**
       * If present, this React element will be converted by
       * `babel-plugin-styled-components` into a styled component
       * with the given css as its styles.
       */
    css?: CSSProp | undefined;
  }
}
