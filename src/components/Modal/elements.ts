import { animated } from 'react-spring';
import styled, { css } from 'styled-components';

export const Mask = styled(animated.div)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  filter: alpha(opacity=50);
  z-index: 1000;
`;

export const Content = styled(animated.div)`
  position: relative;
  top: 100px;
  margin: 0 auto;
  background: ${p => p.theme.background};
  border-radius: 4px;
  padding: 12px;
`;

export const Wrapper = styled.div<{ centered: number }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  z-index: 1000;
  text-align: center;
  ${p =>
    p.centered
      ? css`
          padding: 12px 0px;
          &::before {
            display: inline-block;
            width: 0;
            height: 100%;
            vertical-align: middle;
            content: '';
          }
          ${Content} {
            top: 0px;
            display: inline-block;
            text-align: left;
            vertical-align: middle;
          }
        `
      : ''}
`;

export const Box = styled.div`
  width: 100%;
  height: 100%;
`;
