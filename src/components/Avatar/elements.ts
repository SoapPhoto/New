import styled, { css } from 'styled-components/macro';
import Image from '../Image';

export const Wrapper = styled.div<{
  size: number;
  color: string;
  border: number;
  rainbow: number;
  online: number;
}>`
  --soap-color: ${(p) => p.color};
  position: relative;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  min-width: ${(p) => p.size}px;
  min-height: ${(p) => p.size}px;
  ${({ border }) => (border ? css`` : css`background: var(--soap-color);`)}
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.colors.text};
  border-radius: 100%;
  transition: all 0.25s ease;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.05);
  ${({ border, rainbow, online }) => (border > 0
    ? css`
          border: none;
          ::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            z-index: 0;
            background: ${online ? css`
              rgb(70,201,58)
            ` : css`
              linear-gradient(
                40deg,
                #f99b4a,
                #df376b 74%,
                #c52d91
              )
            `} !important;
          }
          ${Img} {
            overflow: hidden;
            border-radius: 100%;
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
          }
        `
    : '')}
`;

export const Text = styled.div<{ total: number }>`
  font-size: ${(p) => (p.total > 1 ? (p.total > 6 ? 0.5 : (10 - p.total + 2) / 10) : 1)}rem;
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  border-radius: inherit;
  user-select: none;
  .lazyload-wrapper {
    border-radius: inherit;
    overflow: hidden;
  }
`;
