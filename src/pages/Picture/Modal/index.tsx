import IconButton from '@app/components/Button/IconButton';
import { X } from '@app/components/Icons';
import { customMedia } from '@app/styles/mediaQuery';
import ScrollLocker from 'rc-util/lib/Dom/scrollLocker';
import PortalWrapper from 'rc-util/lib/PortalWrapper';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import PictureSkeleton from '../Skeleton';
import PictureModalContent from './Content';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  z-index: 1000;
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  filter: alpha(opacity=50);
  z-index: 1000;
`;

const Content = styled.div`
  position: relative;
  top: 20px;
  margin: 0 auto;
  background: ${(p) => p.theme.widget.modal.background};
  border-radius: 6px;
  width: 100%;
  max-width: 940px;
  overflow: hidden;
  ${customMedia.lessThan('mobile')`
    top: 0px;
    min-height: 100vh;
  `}
`;

const CloseBox = styled(IconButton)`
  position: absolute;
  right: 20px;
  top: 24px;
  z-index: 2;
  color: ${(_) => _.theme.colors.secondary};
  transition: color 0.25s ease;
  &:hover {
    color: ${(_) => _.theme.colors.text};
  }
`;

const scrollLocker = new ScrollLocker();
const PictureModal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contentClickRef = useRef(false);
  const contentTimeoutRef = useRef<number>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollLocker.lock();
    return () => scrollLocker.unLock();
  }, []);
  const onContentMouseDown: React.MouseEventHandler = () => {
    clearTimeout(contentTimeoutRef.current);
    contentClickRef.current = true;
  };

  const onContentMouseUp: React.MouseEventHandler = () => {
    contentTimeoutRef.current = window.setTimeout(() => {
      contentClickRef.current = false;
    });
  };
  const close = (e: React.SyntheticEvent) => {
    if (contentClickRef.current) {
      contentClickRef.current = false;
    } else if (wrapperRef.current === e.target) {
      navigate(-1);
    }
    return null;
  };
  return (
    <PortalWrapper visible getContainer={document.body as any}>
      {() => (
        <div>
          <Mask />
          <Wrapper
            onClick={close}
            ref={wrapperRef}
          >
            <Content
              onMouseDown={onContentMouseDown}
              onMouseUp={onContentMouseUp}
            >
              <CloseBox
                onClick={() => {
                  navigate(-1);
                }}
              >
                <X />
              </CloseBox>
              <PictureModalContent />

            </Content>
          </Wrapper>
        </div>
      )}
    </PortalWrapper>
  );
};

export default PictureModal;
