import styled, { css } from 'styled-components/macro';
import { position, rgba } from 'polished';
import { animated } from 'react-spring';

import { btnMixin } from '@app/styles/mixins';
import { ButtonType } from './type';

interface IStyle {
  loading?: number;
  size?: string;
  danger?: number;
  btnType: ButtonType;
}

const btnText = ({ btnType, danger }: IStyle) => {
  if (btnType === 'text') {
    if (danger) {
      return css`
        ${(_) => _.theme.colors.error}
      `;
    }
    return css`
      ${(_) => _.theme.colors.primary}
    `;
  }
  return '#fff';
};

const btnBg = ({ btnType, danger }: IStyle) => {
  if (btnType === 'text') {
    return 'transparent';
  }
  if (danger) {
    return css`
      ${(_) => _.theme.colors.error}
    `;
  }
  if (btnType === 'secondary') {
    return css`
      ${(_) => _.theme.colors.secondary}
    `;
  }
  return css`
    ${(_) => _.theme.colors.primary}
  `;
};
const btnShadow = ({ btnType, danger }: IStyle) => {
  if (btnType === 'text') {
    return 'transparent';
  }
  if (danger) {
    return css`
      ${(_) => rgba(_.theme.colors.error, 0.5)}
    `;
  }
  return css`
    ${(_) => rgba(_.theme.colors.primary, 0.5)}
  `;
};

export const StyleButton = styled.button<IStyle>(
  ({ loading, btnType, danger }) => css`
    ${btnMixin}
    width: 100%;
    height: 32px;
    min-width: 64px;
    padding: 0 12px;
    box-shadow: 0 10px 20px -10px ${btnShadow({ btnType, danger })};
    background-color: ${btnBg({ btnType, danger })};
    color: ${btnText({ btnType, danger })};
    &:disabled {
      pointer-events: none;
      opacity: 0.35;
      cursor: default;
    }
    &:hover {
      box-shadow: 0 15px 20px -10px ${btnShadow({ btnType, danger })};
      transform: translateY(-2px);
    }
    ${danger
    && css`
      ${LoadingBox} {
        background-color: ${(p) => rgba(p.theme.colors.error, 0.8)};
      }
    `}
    ${loading
    ? css`
          pointer-events: none;
          &:disabled {
            opacity: 1 !important;
          }
        `
    : null}
  `,
);

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-top: -2px;
    margin-right: 4px;
  }
`;

export const LoadingBox = styled(animated.div as any)`
  position: absolute;
  ${position(0, 0, 0, 0)}
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => rgba(p.theme.colors.primary, 0.8)};
  /* background: ${(p) => rgba('#000', 0.2)}; */
  border-radius: inherit;
`;
