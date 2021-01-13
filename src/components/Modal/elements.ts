import { rgba } from 'polished';
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
  width: 100%;
  overflow: hidden;
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
  ${p =>
    p.centered
      ? css`
          text-align: center;
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

export const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
`;

export const ModalBackground = styled.div<{ background: string }>`
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 150px;
  filter: blur(4px);
  background: linear-gradient(
      ${p => rgba(p.theme.background, 0.8)},
      ${p => p.theme.background} 150px
    ),
    url('${p => p.background}');
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  padding: 24px;
`;
