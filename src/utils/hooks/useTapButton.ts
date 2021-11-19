import { CSSProperties } from 'react';
import {
  Interpolation,
  SpringValue,
  SpringValues,
  to,
  useSpring,
} from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { ReactEventHandlers } from 'react-use-gesture/dist/types';

type OverwriteKeys<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] };

export default function useTapButton(
  big: number = 1.1,
  small: number = 0.9,
): [
    { transform: Interpolation<string, any> },
    (...args: any[]) => ReactEventHandlers,
  ] {
  const [spring, animate] = useSpring(
    {
      x: 1,
      config: {
        mass: 1,
        tension: 300,
        friction: 26,
      },
    },
    [],
  );
  const bind = useGesture({
    onDrag: () => animate.start({ x: small }),
    onDragEnd: () => animate.start({ x: big }),
    onHover: ({ hovering }) => (hovering ? animate.start({ x: big }) : animate.start({ x: 1 })),
  });
  return [
    {
      transform: to(spring.x, (x) => `scale(${x})`),
    },
    bind,
  ];
}
