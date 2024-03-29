import { css, DefaultTheme, keyframes } from 'styled-components/macro';
import { rgba } from 'polished';

export const boxMixin = (theme: DefaultTheme, width: string, wrapper = false) => `
  width: 100%;
  max-width: ${width};
  border-radius: 4px;
  background-color: ${theme.background};
  box-shadow: ${theme.shadowColor} 0 6px 20px;
  border: 1px solid ${theme.widget.box.borderColor};
  ${wrapper ? 'margin: 0 auto;' : ''}
  padding: 32px;
  overflow: hidden;
`;

export const btnMixin = css`
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  line-height: normal;
  /* letter-spacing: 0.0892857143em; */
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
`;

export const skeletonKeyframes = keyframes`
  0% {
    background-position: 200% 50%;
  }

  100% {
    background-position: -200% 50%;
  }
`;

export const skeletonCss = css`
  background: linear-gradient(
    270deg,
    ${(p) => rgba(p.theme.widget.skeleton.accents1, 1)},
    ${(p) => rgba(p.theme.widget.skeleton.accents2, 1)},
    ${(p) => rgba(p.theme.widget.skeleton.accents2, 1)},
    ${(p) => rgba(p.theme.widget.skeleton.accents1, 1)}
  );
  background-size: 400% 400%;
  animation: ${skeletonKeyframes} 8s ease-in-out infinite;
`;

export const skeletonCss2 = css`
  background: linear-gradient(
    270deg,
    ${(p) => rgba(p.theme.widget.skeleton.accents2, 0.4)},
    ${(p) => rgba(p.theme.widget.skeleton.accents2, 0.6)},
    ${(p) => rgba(p.theme.widget.skeleton.accents2, 0.6)},
    ${(p) => rgba(p.theme.widget.skeleton.accents2, 0.4)}
  );
  background-size: 400% 400%;
  animation: ${skeletonKeyframes} 8s ease-in-out infinite;
`;

export const initButton = css`
  cursor: pointer;
  outline: none;
  border: none;
`;
