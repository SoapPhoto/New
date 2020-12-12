import { css } from 'styled-components';

export const boxMixin = css`
  width: 100%;
  border-radius: 4px;
  padding: 32px;
  overflow: hidden;
`;
export const btnMixin = css`
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  text-transform: uppercase;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
`;
