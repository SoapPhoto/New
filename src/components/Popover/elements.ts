import { animated } from 'react-spring';
import styled from 'styled-components';

export const Tooltip = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  &[data-popper-placement^='top'] [data-popper-arrow] {
    bottom: -4px;
  }
  &[data-popper-placement^='right'] [data-popper-arrow] {
    left: -4px;
  }
  &[data-popper-placement^='bottom'] [data-popper-arrow] {
    top: -4px;
  }
  &[data-popper-placement^='left'] [data-popper-arrow] {
    right: -4px;
  }
  [data-small] {
    display: block;
  }
  [data-small] ~ *:not([data-small]) {
    display: none;
  }
`;

export const Content = styled(animated.div)`
  ${Tooltip}[data-popper-placement^="top"] & {
    transform-origin: 50% 120%;
  }
  ${Tooltip}[data-popper-placement^="left"] & {
    transform-origin: 120% 50%;
  }
  ${Tooltip}[data-popper-placement^="right"] & {
    transform-origin: -20% 50%;
  }
  ${Tooltip}[data-popper-placement^="bottom"] & {
    transform-origin: 50% -20%;
  }
  ${Tooltip}[x-theme^="dark"] & {
    color: ${p => p.theme.colors.text};
    background-color: #18191c;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.48),
      0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.2);
  }
  ${Tooltip}[x-theme^="light"] & {
    color: ${p => p.theme.colors.text};
    background-color: #fff;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  /* background: ${p => p.theme.widget.popover.background}; */
  padding: 5px 10px;
  border-radius: ${p => p.theme.widget.popover.radius}px;
  font-size: 14px;
  text-align: left;
  z-index: 1;
`;

export const Arrow = styled.div`
  &,
  &::before {
    width: 10px;
    height: 10px;
    position: absolute;
    z-index: -1;
  }
  &::before {
    content: '';
    transform: rotate(45deg);
    top: 0;
    left: 0;
    ${Tooltip}[x-theme^="dark"] & {
      background-color: #18191c;
    }
    ${Tooltip}[x-theme^="light"] &::before {
      background-color: #fff;
    }
  }
`;
