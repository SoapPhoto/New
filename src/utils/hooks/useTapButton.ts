import { CSSProperties } from 'react';
import { AnimatedValue, ForwardedProps, useSpring } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { ReactEventHandlers } from 'react-use-gesture/dist/types';

type OverwriteKeys<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] };

export default function useTapButton(
  big: number = 1.1,
  small: number = 0.9,
): [
  AnimatedValue<
    ForwardedProps<OverwriteKeys<{ transform: string }, CSSProperties>>
  >,
  (...args: any[]) => ReactEventHandlers,
] {
  const [spring, set] = useSpring(() => ({
    transform: 'scale(1)',
    config: {
      mass: 1,
      tension: 300,
      friction: 26,
    },
  }));
  const bind = useGesture({
    onDrag: () => set({ transform: `scale(${small})` }),
    onDragEnd: () => set({ transform: `scale(${big})` }),
    onHover: ({ hovering }) =>
      hovering
        ? set({ transform: `scale(${big})` })
        : set({ transform: `scale(1)` }),
  });
  return [spring, bind];
}
