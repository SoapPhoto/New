import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import PortalWrapper from 'rc-util/lib/PortalWrapper';
import ScrollLocker from 'rc-util/lib/Dom/scrollLocker';
import { useSpring } from 'react-spring';

import Confirm from './Confirm';

import {
  Mask,
  Wrapper,
  Content,
  ModalContent,
  ModalBackground,
  ModalHeader,
  ModalTitle,
  CloseBox,
} from './elements';
import { X } from '../Icons';

export interface IModalProps {
  closable?: boolean;
  afterClose?: () => any;
  centered?: boolean;
  destroyOnClose?: boolean;
  maxWidth?: number | string;
  visible: boolean;
  fullscreen?: boolean;
  onClose?: (e: SyntheticEvent) => any;
  maskClosable?: boolean;
  autoMobile?: boolean;
  contentStyle?: React.CSSProperties;
}

const scrollLocker = new ScrollLocker();

const springConfig = {
  mass: 1,
  tension: 340,
  friction: 30,
};

let openTotal = 0;

const InternalModal: React.FC<IModalProps> = ({
  visible,
  onClose,
  afterClose,
  centered,
  fullscreen,
  closable = false,
  maskClosable = true,
  destroyOnClose,
  maxWidth,
  children,
  autoMobile = true,
  contentStyle,
}) => {
  const isInit = useRef(false);
  const [animatedVisible, setAnimatedVisible] = useState(false);
  const [closed, setClosed] = useState(!visible);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentClickRef = useRef(false);
  const contentTimeoutRef = useRef<number>();
  const maskSpringProps = useSpring({
    // backdropFilter: animatedVisible
    //   ? "saturate(180%) blur(15px)"
    //   : "saturate(180%) blur(15px)",
    opacity: animatedVisible ? 1 : 0,
    config: springConfig,
  });
  const contentSpringProps = useSpring({
    opacity: animatedVisible ? 1 : 0,
    transform: animatedVisible
      ? `scale3d(1, 1, 1) translate3d(0px, 0px, 0px)`
      : `scale3d(0.94, 0.94, 0.94) translate3d(0px, 30px, 0px)`,
    config: springConfig,
    onRest: endValues => {
      if (!visible && endValues.value.opacity === 0 && !closed) {
        destroy();
      }
    },
  });
  useEffect(() => {
    isInit.current = true;
    return () => destroy();
  }, []);
  useEffect(() => {
    if (visible !== animatedVisible) {
      if (visible) {
        setTimeout(() => open(), 10);
      } else {
        close();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  // useEffect(() => {
  //   if (animatedVisible) {
  //     setClosed(!animatedVisible);
  //   } else {
  //     if (openTotal !== 0) {
  //       openTotal--;
  //     }
  //   }
  // }, [animatedVisible]);
  const open = () => {
    setAnimatedVisible(true);
    setClosed(false);
    openTotal++;
    scrollLocker.lock();
  };
  const close = () => {
    setAnimatedVisible(false);
  };
  const destroy = () => {
    setClosed(true);
    openTotal--;
    if (openTotal <= 0) {
      openTotal = 0;
      scrollLocker.unLock();
    }
    afterClose?.();
  };
  const onContentMouseDown: React.MouseEventHandler = () => {
    clearTimeout(contentTimeoutRef.current);
    contentClickRef.current = true;
  };

  const onContentMouseUp: React.MouseEventHandler = () => {
    contentTimeoutRef.current = window.setTimeout(() => {
      contentClickRef.current = false;
    });
  };
  let onWrapperClick: (e: React.SyntheticEvent) => null;
  if (maskClosable) {
    onWrapperClick = e => {
      if (contentClickRef.current) {
        contentClickRef.current = false;
      } else if (wrapperRef.current === e.target) {
        onClose?.(e);
      }
      return null;
    };
  }
  const closeIconToRender = (
    <CloseBox
      onClick={e => {
        onClose?.(e);
      }}
    >
      <X />
    </CloseBox>
  );
  if (destroyOnClose && closed) {
    return null;
  }
  return (
    <>
      <PortalWrapper visible={!closed} getContainer={document.body as any}>
        {() => {
          return (
            <div style={{ display: closed ? 'none' : 'block' }}>
              <Mask style={{ ...maskSpringProps }} />
              <Wrapper
                fullscreen={!!fullscreen}
                centered={!!centered}
                autoMobile={!!autoMobile}
                ref={wrapperRef}
                onClick={onWrapperClick}
              >
                <Content
                  style={{
                    ...contentSpringProps,
                    ...(maxWidth ? { maxWidth: maxWidth } : {}),
                    ...contentStyle,
                  }}
                  onMouseDown={onContentMouseDown}
                  onMouseUp={onContentMouseUp}
                >
                  {closable && closeIconToRender}
                  {children}
                </Content>
              </Wrapper>
            </div>
          );
        }}
      </PortalWrapper>
    </>
  );
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
type InternalModal = typeof InternalModal;

interface IModal extends InternalModal {
  Content: typeof ModalContent;
  Background: typeof ModalBackground;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Confirm: typeof Confirm;
}

const Modal: IModal = InternalModal as IModal;
Modal.Content = ModalContent;
Modal.Background = ModalBackground;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Confirm = Confirm;

export default Modal;
