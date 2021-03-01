import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePopper } from 'react-popper';
import { useSpring } from 'react-spring';
import contains from 'rc-util/lib/Dom/contains';
import PortalWrapper from 'rc-util/lib/PortalWrapper';
import { isFunction } from 'lodash';
import { Arrow, Content, Tooltip } from './elements';
import { Placement } from '@popperjs/core';
import ResizeObserver from 'resize-observer-polyfill';
import { useTheme } from 'styled-components';

interface IPopoverProps {
  onOpen?: () => void;
  content: React.ReactElement;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  destroyOnClose?: boolean;
  theme?: PopoverTheme;
  openDelay?: number;
  contentStyle?: React.CSSProperties | undefined;
}

export type PopoverTheme = 'dark' | 'light';

const Popover: React.FC<IPopoverProps> = ({
  content,
  children,
  trigger,
  theme,
  placement = 'auto',
  destroyOnClose,
  contentStyle,
  openDelay,
  onOpen,
}) => {
  const themeContext = useTheme();
  const [popperSize, setPopperSize] = useState({ width: 0, height: 0 });
  const [popupVisible, setPopupVisible] = useState(false);
  const [closed, setClosed] = useState(true);
  const openTimer = useRef<number>();
  const closeTimer = useRef<number>();
  const referenceElementRef = useRef<HTMLButtonElement>();
  const [
    referenceElement,
    _setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);
  const popperElementRef = useRef<HTMLDivElement>();
  const [popperElement, _setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const themeState = useMemo(
    () => (theme ? theme : themeContext.widget.popover.theme),
    [theme, themeContext.widget.popover.theme],
  );
  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [
        { name: 'arrow', options: { element: arrowElement } },
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 12,
            altBoundary: false,
          },
        },
        // {
        //   name: "applyArrowHide",
        //   enabled: true,
        //   phase: "write",
        //   fn({ state }) {
        //     setArrowHide(state.modifiersData.arrow?.centerOffset !== 0);
        //   }
        // },
        // {
        //   name: "preventOverflow",
        //   options: {
        //     tetherOffset: () => (arrowHide ? -16 : 0)
        //   }
        // }
      ],
    },
  );
  const props = useSpring({
    opacity: popupVisible ? 1 : 0,
    transform: popupVisible ? `scale3d(1, 1, 1)` : `scale3d(0.88, 0.88, 0.88)`,
    config: {
      mass: 1,
      tension: 340,
      friction: 30,
    },
    onRest: () => {
      if (!popupVisible) {
        setClosed(true);
      }
    },
  });
  const observer = useMemo(
    () =>
      new ResizeObserver(entries => {
        if (entries[0]) {
          const { width, height } = entries[0].contentRect;
          setPopperSize({ width, height });
        }
      }),
    [],
  );

  const setReferenceElement = (state: HTMLButtonElement) => {
    _setReferenceElement(state);
    referenceElementRef.current = state;
  };

  const setPopperElement = (state: HTMLDivElement) => {
    _setPopperElement(state);
    popperElementRef.current = state;
  };

  const onDocumentClick = useCallback(e => {
    const { target } = e;
    const root = referenceElementRef.current;
    const popupNode = popperElementRef.current;
    if (!contains(root, target) && !contains(popupNode, target)) {
      setPopupVisible(false);
    }
  }, []);

  useEffect(() => {
    if (popupVisible) {
      onOpen?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupVisible]);

  useEffect(() => {
    if (trigger === 'click') {
      if (popupVisible) {
        document.addEventListener('mousedown', onDocumentClick);
      } else {
        document.removeEventListener('mousedown', onDocumentClick);
      }
      return () => document.removeEventListener('mousedown', onDocumentClick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, popupVisible]);
  // content变化的话强制更新
  useEffect(() => {
    if (update) {
      update();
    }
  }, [popperSize, update]);
  useEffect(() => {
    if (!popperElement) return;
    observer.observe(popperElement);
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popperElement]);
  useEffect(() => {
    if (popperElement) {
      if (popupVisible && trigger === 'hover') {
        popperElement.addEventListener('mouseover', e => {
          e.stopPropagation();
          clearTimeout(closeTimer.current);
        });
        popperElement.addEventListener('mouseout', e => {
          const { relatedTarget } = e;
          const root = referenceElementRef.current;
          const popupNode = popperElementRef.current;
          if (
            !contains(root, relatedTarget as HTMLDivElement) &&
            !contains(popupNode, relatedTarget as HTMLDivElement)
          ) {
            setPopupVisible(false);
          }
        });
      }
    }
  }, [popperElement, popupVisible, trigger]);
  useEffect(() => {
    if (popupVisible) {
      setClosed(!popupVisible);
    }
  }, [popupVisible]);

  const child = React.Children.only(children) as React.ReactElement;

  const selfEvents = useCallback(
    (type: string, e: any) => {
      if (child && child.props && isFunction(child.props[type])) {
        child.props[type](e);
      }
    },
    [child],
  );

  const open = useCallback(() => {
    if (openDelay) {
      clearTimeout(openTimer.current!);
      openTimer.current = window.setTimeout(() => {
        if (isFunction(onOpen)) {
          onOpen();
        }
        setPopupVisible(true);
      }, openDelay);
    } else {
      if (isFunction(onOpen)) {
        onOpen();
      }
      setPopupVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChildClick = useCallback(
    e => {
      if (!popupVisible) {
        open();
      } else {
        setPopupVisible(false);
      }
      selfEvents('onClick', e);
    },
    [open, popupVisible, selfEvents],
  );

  const onMouseEnter = useCallback(
    e => {
      if (!popupVisible) {
        open();
      }
      selfEvents('onMouseEnter', e);
    },
    [open, popupVisible, selfEvents],
  );

  const onMouseLeave = useCallback(
    e => {
      if (popupVisible) {
        clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => {
          setPopupVisible(false);
        }, 150);
      }
      clearTimeout(openTimer.current);
      selfEvents('onMouseLeave', e);
    },
    [popupVisible, selfEvents],
  );

  const newChildProps: any = {
    ref: setReferenceElement,
  };
  // click
  if (trigger === 'click') {
    newChildProps.onClick = onChildClick;
  }

  // hover
  if (trigger === 'hover') {
    newChildProps.onMouseEnter = onMouseEnter;
    newChildProps.onMouseLeave = onMouseLeave;
  }
  const childRender = React.cloneElement(child, newChildProps);
  if (destroyOnClose && closed) {
    return childRender;
  }

  return (
    <>
      {childRender}
      <PortalWrapper visible={!closed} getContainer={document.body as any}>
        {() => (
          <Tooltip
            ref={setPopperElement}
            {...attributes.popper}
            x-theme={themeState}
            style={{ ...styles.popper, display: !closed ? 'initial' : 'none' }}
          >
            <Content
              style={{
                ...props,
                ...(contentStyle ? contentStyle : {}),
                position: 'relative',
              }}
            >
              {content}
              <Arrow
                ref={setArrowElement}
                data-popper-arrow
                style={{ ...styles.arrow }}
                {...attributes.arrow}
              />
            </Content>
          </Tooltip>
        )}
      </PortalWrapper>
    </>
  );
};
export default Popover;
