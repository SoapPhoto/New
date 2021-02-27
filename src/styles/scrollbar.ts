import { css } from 'styled-components';

const scrollbar = css`
  #theme-demo-plugin-four-graidient-left,
  #theme-demo-plugin-four-graidient-right {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
    width: 30px;
    height: 100%;
    pointer-events: none;
  }
  #theme-demo-plugin-four-graidient-left {
    left: 0;
    background: linear-gradient(
      to right,
      ${_ => _.theme.widget.scrollbar.graidient} 0,
      transparent 100%
    );
  }
  #theme-demo-plugin-four-graidient-right {
    right: 0;
    background: linear-gradient(
      to right,
      transparent 0,
      ${_ => _.theme.widget.scrollbar.graidient} 100%
    );
  }
  .os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
    background: ${_ => _.theme.widget.scrollbar.background};
  }
  /* .os-theme-light>.os-scrollbar>.os-scrollbar-track>.os-scrollbar-handle{background:rgba(255,255,255,.4)} */
  .os-theme-dark
    > .os-scrollbar:hover
    > .os-scrollbar-track
    > .os-scrollbar-handle {
    background: ${_ => _.theme.widget.scrollbar.hover};
  }
  /* .os-theme-light>.os-scrollbar:hover>.os-scrollbar-track>.os-scrollbar-handle{background:rgba(255,255,255,.55)} */
  .os-theme-dark
    > .os-scrollbar
    > .os-scrollbar-track
    > .os-scrollbar-handle.active {
    background: ${_ => _.theme.widget.scrollbar.active};
  }
  /* .os-theme-light>.os-scrollbar>.os-scrollbar-track>.os-scrollbar-handle.active{background:rgba(255,255,255,.7)} */
`;
export default scrollbar;
