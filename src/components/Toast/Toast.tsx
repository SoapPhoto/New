import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useTransition } from 'react-spring';
import { reduce } from 'lodash';

import { Container, Toast, ToastBox, Content, ActionBox } from './elements';

export type ToastType = 'success' | 'warning' | 'error' | 'base';

export type ToastAction = (onDelete: () => void) => ReactNode;

export interface ITotalConfig {
  key: string;
  title: string;
  index: number;
  action?: ToastAction;
  type?: ToastType;
}

interface IProps {
  toasts: ITotalConfig[];
  type?: ToastType;
  onDelete: (key: string) => void;
}
const SPACE = 12;
const MIN_HEIGHT = 72;

const ToastComponent: React.FC<IProps> = ({ toasts, onDelete }) => {
  const timer = useRef<number>();
  const [isOverviewing, setIsOverviewing] = useState(false);
  const heights = useRef(new Map());
  const [refMap] = useState(() => new WeakMap());
  // 删除掉不存在消息的数据
  useEffect(() => {
    [...(heights.current.keys() as any)].forEach(key => {
      if (!toasts.find(v => v.key === key)) {
        heights.current.delete(key);
      }
    });
  }, [toasts]);
  const setRef = (ref: HTMLDivElement | null, item: ITotalConfig) => {
    if (ref) {
      refMap.set(item, ref);
      if (!heights.current.get(item.key)) {
        heights.current.set(item.key, ref.offsetHeight);
      }
    }
  };
  const updateTransition = (item: ITotalConfig) => async (next: any) => {
    let opacity = item.index >= 3 ? 0 : 1;
    if (isOverviewing) {
      setTimeout(async () => {
        await next({
          maxHeight: heights.current.get(item.key),
        });
      });
      const heightArr = toasts
        .slice(0, item.index)
        .map(v => heights.current.get(v.key));
      await next({
        transform: `translate3d(0px, -${
          reduce(
            heightArr,
            function (sum: number, n: number) {
              return sum + n;
            },
            0,
          ) +
          SPACE * (item.index + 1)
        }, 0px) scale(1)`,
        childOpacity: 1,
        opacity: opacity,
      });
    } else if (item.index === 0) {
      await next({
        childOpacity: 1,
        opacity: opacity,
        transform: `translate3d(0px, 0px, 0px)  scale(1)`,
      });
    } else {
      setTimeout(async () => {
        await next({
          childOpacity: item.index === 0 ? 1 : 0,
          transform: `translate3d(0px, -${
            refMap.get(toasts[0]).offsetHeight - MIN_HEIGHT + SPACE * item.index
          }, 0px) scale(${1 - (item.index * 6) / 100})`,
        });
      });
      await next({
        opacity: opacity,
        maxHeight: MIN_HEIGHT,
      });
    }
  };

  const transitions = useTransition(toasts, (item: ITotalConfig) => item.key, {
    update: updateTransition as any,
    from: {
      opacity: 0,
      childOpacity: 0,
      transform: `translate3d(0px, 100px, 0px)  scale(1)`,
    } as any,
    leave: {
      opacity: 0,
      childOpacity: 0,
      transform: `translate3d(0px, 100px, 0px)  scale(1)`,
    } as any,
    enter: ((item: ITotalConfig) => async (next: any) => {
      await next({
        opacity: 1,
        childOpacity: 1,
        maxHeight: refMap.get(item).offsetHeight,
        transform: `translate3d(0px, 0px, 0px)  scale(1)`,
      });
    }) as any,
  });
  return (
    <Container>
      {transitions.map(({ key, item, props: { ...style } }) => (
        <ToastBox
          style={{
            ...style,
            maxHeight: 'auto',
            zIndex: 9900 - item.index,
            display: item.index > 3 ? 'none' : 'block',
          }}
          ref={ref => setRef(ref, item)}
          key={key}
          onMouseEnter={() => {
            clearTimeout(timer.current);
            setIsOverviewing(true);
          }}
          onMouseLeave={() => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
              setIsOverviewing(false);
            }, 100);
          }}
        >
          <Toast
            type={item.type || 'success'}
            style={{
              maxHeight: style.maxHeight,
            }}
          >
            <Content
              style={{
                opacity: (style as any).childOpacity,
              }}
            >
              <div style={{ flex: 1 }}>{item.title}</div>
              {item.action && (
                <ActionBox>{item.action(() => onDelete(item.key))}</ActionBox>
              )}
            </Content>
          </Toast>
        </ToastBox>
      ))}
    </Container>
  );
};

export default ToastComponent;
