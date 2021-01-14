import styled, { css } from 'styled-components';
import { position, rgba } from 'polished';

import { btnMixin } from '@app/styles/mixins';

export const StyleButton = styled.button<{ loading: number; size?: string }>`
  ${btnMixin}
  width: 100%;
  height: 32px;
  min-width: 64px;
  padding: 0 12px;
  box-shadow: 0 10px 20px -10px ${p => rgba(p.theme.colors.primary, 0.5)};
  background-color: ${p => p.theme.colors.primary};
  color: #fff;
  cursor: ${p => (p.loading ? 'default' : 'pointer')};
  ${p =>
    !p.loading
      ? css`
          &:hover {
            box-shadow: 0 15px 20px -10px ${p => rgba(p.theme.colors.primary, 0.6)};
            transform: translateY(-2px);
          }
        `
      : css``}
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingBox = styled.div`
  position: absolute;
  ${position(0, 0, 0, 0)}
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => rgba(p.theme.colors.primary, 0.8)};
  border-radius: inherit;
`;
