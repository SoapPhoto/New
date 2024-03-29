import { IconButton } from '@app/pages/Picture/elements';
import { customMedia } from '@app/styles/mediaQuery';
import { rgba } from 'polished';
import { animated } from 'react-spring';
import styled, { css } from 'styled-components/macro';

export const Mask = styled(animated.div as any)`
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

export const Wrapper = styled.div<{
  centered: boolean;
  fullscreen: boolean;
  autoMobile: boolean;
}>(
  ({ centered, fullscreen, autoMobile }) => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    outline: 0;
    -webkit-overflow-scrolling: touch;
    z-index: 1000;
    ${centered
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
    ${customMedia.lessThan('mobile')`
      ${
  fullscreen
    ? css`
              padding: 0;
              ${Content} {
                width: 100%;
                max-width: 100% !important;
                height: 100vh;
                border-radius: 0px;
                overflow-y: auto;
              }
            `
    : autoMobile
            && css`
              padding: 0;
              &::before {
                content: none;
              }
              ${Content} {
                position: absolute;
                top: auto;
                bottom: 0px;
                left: 0;
                right: 0;
                max-height: 87vh;
                overflow-y: auto;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
              }
            `
}
    `}
  `,
);

export const Content = styled(animated.div as any)`
  position: relative;
  top: 100px;
  margin: 0 auto;
  background: ${(p) => p.theme.widget.modal.background};
  border-radius: 6px;
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
  color: ${(_) => _.theme.colors.secondary};
  transition: color 0.25s ease;
  &:hover {
    color: ${(_) => _.theme.colors.text};
  }
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
  height: ${(p) => p.height || 90}px;
  filter: blur(4px);
  transform: scale(1.1);
  background: linear-gradient(
      ${(p) => rgba(p.theme.widget.modal.background, 0.85)},
      ${(p) => p.theme.widget.modal.background} 90px
    ),
    url('${(p) => p.background}');
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  padding: 24px;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid ${(_) => _.theme.colors.border};
  ${ModalTitle} {
    padding: 0px;
  }
`;
