import { useRef, useState, useEffect, MutableRefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export default function useMeasure(): [
  {
    ref: React.Ref<any>;
  },
  DOMRectReadOnly,
] {
  const ref = useRef<Element>();
  const [bounds, set] = useState<DOMRectReadOnly>({
    bottom: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    right: 0,
  });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  );
  useEffect(() => {
    ro.observe(ref.current as any);
    return ro.disconnect;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [{ ref }, bounds];
}
