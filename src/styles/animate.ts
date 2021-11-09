import { css } from 'styled-components/macro';
import { timingFunctions } from 'polished';

interface IAnimateInput {
  name: string;
  inStyle: string;
  outStyle: string;
  inTiming?: string;
  outTiming?: string;
  duration?: number;
}

const animateFunc = ({
  name,
  inStyle,
  outStyle,
  duration = 0.23,
  inTiming = 'ease-in',
  outTiming = 'ease-in',
}: IAnimateInput) => css`
  .${name}-enter {
    opacity: 0;
    animation-duration: ${duration}s;
    animation-fill-mode: both;
    animation-timing-function: ${inTiming};
    animation-play-state: paused;
  }
  .${name}-appear {
    opacity: 0;
    animation-duration: ${duration}s;
    animation-fill-mode: both;
    animation-timing-function: ${outTiming};
    animation-play-state: paused;
  }
  .${name}-leave {
    animation-duration: ${duration}s;
    animation-fill-mode: both;
    animation-timing-function: ${inTiming};
    animation-play-state: paused;
  }
  .${name}-enter.${name}-enter-active {
    animation-name: ${name}In;
    animation-play-state: running;
  }
  .${name}-appear.${name}-appear-active {
    animation-name: ${name}In;
    animation-play-state: running;
  }
  .${name}-leave.${name}-leave-active {
    animation-name: ${name}Out;
    animation-play-state: running;
  }
  @keyframes ${name}In {
    ${inStyle}
  }
  @keyframes ${name}Out {
    ${outStyle}
  }
`;

export const animate = css`
  ${animateFunc({
    name: 'modalMask',
    inStyle: `
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    `,
    outStyle: `
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    `,
    inTiming: timingFunctions('easeOutQuint'),
    outTiming: timingFunctions('easeInQuint'),
    duration: 0.2,
  })}
  ${animateFunc({
    name: 'modalContent',
    inStyle: `
      0% {
        opacity: 0;
        transform: translate3d(0, 20px, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    `,
    outStyle: `
      0% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      100% {
        opacity: 0;
        transform: translate3d(0, 20px, 0);
      }
    `,
    inTiming: timingFunctions('easeOutQuint'),
    outTiming: timingFunctions('easeInQuint'),
    duration: 0.2,
  })}
  ${animateFunc({
    name: 'popper',
    inStyle: `
      0% {
        opacity: 0;
        transform: scale3d(0.98, 0.98, 0.98);
      }
      100% {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    `,
    outStyle: `
      0% {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
      100% {
        opacity: 0;
        transform: scale3d(0.98, 0.98, 0.98);
      }
    `,
    inTiming: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    outTiming: 'cubic-bezier(0.6, 0.04, 0.98, 0.34)',
    duration: 0.32,
  })}
  ${animateFunc({
    name: 'labelError',
    inStyle: `
      0% {
        opacity: 0;
        transform: translateY(-100%);
      }
      100% {
        opacity: 1;
        transform: translateY(0%);
      }
    `,
    outStyle: `
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    `,
    inTiming: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    outTiming: 'cubic-bezier(0.6, 0.04, 0.98, 0.34)',
    duration: 0.3,
  })}
`;
