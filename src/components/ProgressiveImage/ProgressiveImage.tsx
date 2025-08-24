import type { WebGLImageViewerRef } from '../WebglViewer'
import type { ProgressiveImageProps } from './types'

import { cx } from '@app/utils/cn'
import { useCallback, useRef } from 'react'

import styled from 'styled-components'
import { WebGLImageViewer } from '../WebglViewer'
import {
  useImageLoader,
  useProgressiveImageState,
  useScaleIndicator,
  useWebGLLoadingState,
} from './hooks'

// 操作提示
const OperationTip = styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  font-size: 12px;
  color: #fff;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100vh;
  &:hover{
    ${OperationTip} {
      opacity: 1;
    }
  }
`
const Image = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease-in-out;
`

const WebGLImageContent = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
`

export function ProgressiveImage({
  src,
  thumbnailSrc,
  alt,
  width,
  height,
  className,
  onError,
  onProgress,
  onZoomChange,
  onBlobSrcChange,
  maxZoom = 20,
  minZoom = 1,
  isCurrentImage = false,
  isLivePhoto = false,
  livePhotoVideoUrl,
  isHDR = false,
  loadingIndicatorRef,
}: ProgressiveImageProps) {
  // State management
  const [state, setState] = useProgressiveImageState()
  const {
    blobSrc,
    highResLoaded,
    error,
    isHighResImageRendered,
    isThumbnailLoaded,
    isLivePhotoPlaying,
  } = state

  // Refs
  const thumbnailRef = useRef<HTMLImageElement>(null)
  const webglImageViewerRef = useRef<WebGLImageViewerRef | null>(null)

  // Hooks
  useImageLoader(
    src,
    isCurrentImage,
    highResLoaded,
    error,
    onProgress,
    onError,
    onBlobSrcChange,
    loadingIndicatorRef,
    setState.setBlobSrc,
    setState.setHighResLoaded,
    setState.setError,
    setState.setIsHighResImageRendered,
  )

  const { onTransformed, onDOMTransformed } = useScaleIndicator(
    onZoomChange,
    setState.setCurrentScale,
    setState.setShowScaleIndicator,
  )

  const handleWebGLLoadingStateChange
    = useWebGLLoadingState(loadingIndicatorRef)

  const handleThumbnailLoad = useCallback(() => {
    setState.setIsThumbnailLoaded(true)
  }, [setState])
  // const showContextMenu = useShowContextMenu()

  // const isHDRSupported = useMediaQuery('(dynamic-range: high)')
  // Only use HDR if the browser supports it and the image is HDR
  // const shouldUseHDR = isHDR && isHDRSupported

  return (
    <Wrapper>
      {/* 缩略图 - 在高分辨率图片未加载或加载失败时显示 */}
      {thumbnailSrc && (!isHighResImageRendered || error) && (
        <Image
          ref={thumbnailRef}
          src={thumbnailSrc}
          key={thumbnailSrc}
          alt={alt}
          className={cx(
            'absolute inset-0 h-full w-full object-contain transition-opacity duration-300',
            isThumbnailLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={handleThumbnailLoad}
        />
      )}

      {/* 高分辨率图片 - 只在成功加载且非错误状态时显示 */}
      {highResLoaded && blobSrc && isCurrentImage && !error && (
        <WebGLImageContent>
          <WebGLImageViewer
            ref={webglImageViewerRef}
            src={blobSrc}
            className="absolute inset-0 h-full w-full"
            width={width}
            height={height}
            initialScale={1}
            minScale={minZoom}
            maxScale={maxZoom}
            limitToBounds={true}
            centerOnInit={true}
            smooth={true}
            onZoomChange={onTransformed}
            onLoadingStateChange={handleWebGLLoadingStateChange}
          />
        </WebGLImageContent>
      )}

      {/* 操作提示 */}
      {!isLivePhoto && (
        <OperationTip>
          双击或捏合缩放
        </OperationTip>
      )}

      {/* 缩放倍率提示 */}
      {/* <AnimatePresence>
        {showScaleIndicator && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none absolute bottom-4 left-4 z-20 flex items-center gap-0.5 rounded bg-black/50 px-3 py-1 text-lg text-white tabular-nums"
          >
            <SlidingNumber number={currentScale} decimalPlaces={1} />
            x
          </m.div>
        )}
      </AnimatePresence> */}
    </Wrapper>
  )
}
