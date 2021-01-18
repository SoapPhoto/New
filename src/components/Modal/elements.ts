import { customMedia } from '@app/styles/mediaQuery';
import { rgba } from 'polished';
import { animated } from 'react-spring';
import styled, { css } from 'styled-components';
import { IconButton } from '..';

export const Mask = styled(animated.div)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  filter: alpha(opacity=50);
  z-index: 1000;
  /* backdrop-filter: saturate(180%) blur(4px); */
`;

export const Wrapper = styled.div<{ centered: number; fullscreen: number }>`
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
  ${p => customMedia.lessThan('mobile')`
  ${
    p.fullscreen
      ? `
      padding: 0;
        ${Content} {
      width: 100%;
      max-width: 100% !important;
      height: 100vh;
      border-radius: 0px;
      overflow-y: auto;
    }
  `
      : ''
  }
  `}
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

export const Box = styled.div`
  width: 100%;
  height: 100%;
`;

export const CloseBox = styled(IconButton)`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 2;
`;

export const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
`;

export const ModalBackground = styled.div<{
  background: string;
  height?: number;
}>`
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  height: ${p => p.height || 90}px;
  filter: blur(4px);
  transform: scale(1.1);
  background: linear-gradient(
      ${p => rgba(p.theme.background, 0.75)},
      ${p => p.theme.background} 90px
    ),
    url('${p => p.background}');
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  padding: 24px;
`;
