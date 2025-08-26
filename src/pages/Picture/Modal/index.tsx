import IconButton from '@app/components/Button/IconButton'
import { X } from '@app/components/Icons'
import { customMedia } from '@app/styles/mediaQuery'
import { AnimatePresence, motion } from 'motion/react'
import ScrollLocker from 'rc-util/lib/Dom/scrollLocker'
import PortalWrapper from 'rc-util/lib/PortalWrapper'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import PictureModalContent from './Content'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  z-index: 1000;
`

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
`

const Content = styled(motion.div)`
  position: relative;
  top: 0;
  margin: 0 auto;
  background: ${p => p.theme.widget.modal.background};
  border-radius: 0px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  ${customMedia.lessThan('mobile')`
    top: 0px;
    min-height: 100vh;
  `}
`

const CloseBox = styled(IconButton)`
  position: absolute;
  right: 20px;
  top: 24px;
  z-index: 2;
  color: ${_ => _.theme.colors.secondary};
  transition: color 0.25s ease;
  &:hover {
    color: ${_ => _.theme.colors.text};
  }
`

const scrollLocker = new ScrollLocker()

const PictureModal: React.FC = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
  const contentClickRef = useRef(false)
  const contentTimeoutRef = useRef<number>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollLocker.lock()
    return () => scrollLocker.unLock()
  }, [])
  const onContentMouseDown: React.MouseEventHandler = () => {
    clearTimeout(contentTimeoutRef.current)
    contentClickRef.current = true
  }

  const onContentMouseUp: React.MouseEventHandler = () => {
    contentTimeoutRef.current = window.setTimeout(() => {
      contentClickRef.current = false
    })
  }
  const close = (e: React.SyntheticEvent) => {
    if (contentClickRef.current) {
      contentClickRef.current = false
    }
    else if (wrapperRef.current === e.target) {
      navigate(-1)
    }
    return null
  }
  return (
    <PortalWrapper visible getContainer={document.body as any}>
      {() => (
        <AnimatePresence
          onExitComplete={() => {
            navigate(-1)
          }}
        >
          {isOpen && (
            <Wrapper
              onClick={close}
              ref={wrapperRef}
            >
              <Content
                variants={{
                  initial: {
                    opacity: 0,
                    translateY: 20,
                    scale: 0.95,
                  },
                  animate: { opacity: 1, transform: 'translateY(0px)', scale: 1 },
                  exit: { opacity: 0, transform: 'translateY(20px)', scale: 0.95 },
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                onMouseDown={onContentMouseDown}
                onMouseUp={onContentMouseUp}
              >
                <CloseBox
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <X />
                </CloseBox>
                <PictureModalContent />
              </Content>
            </Wrapper>
          )}
        </AnimatePresence>
      )}
    </PortalWrapper>
  )
}

export default PictureModal
