import type { LoadingIndicatorRef } from './components/LoadingIndicator'
import type {
  ProgressiveImageState,
} from './types'

import { ImageLoaderManager } from '@app/utils/imageLoaderManager'

import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingState } from '../WebglViewer'
import { SHOW_SCALE_INDICATOR_DURATION } from './types'

export function useProgressiveImageState(): [
  ProgressiveImageState,
  {
    setBlobSrc: (src: string | null) => void
    setHighResLoaded: (loaded: boolean) => void
    setError: (error: boolean) => void
    setIsHighResImageRendered: (rendered: boolean) => void
    setCurrentScale: (scale: number) => void
    setShowScaleIndicator: (show: boolean) => void
    setIsThumbnailLoaded: (loaded: boolean) => void
    setIsLivePhotoPlaying: (playing: boolean) => void
  },
] {
  const [blobSrc, setBlobSrc] = useState<string | null>(null)
  const [highResLoaded, setHighResLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [isHighResImageRendered, setIsHighResImageRendered] = useState(false)
  const [currentScale, setCurrentScale] = useState(1)
  const [showScaleIndicator, setShowScaleIndicator] = useState(false)
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false)
  const [isLivePhotoPlaying, setIsLivePhotoPlaying] = useState(false)

  return [
    {
      blobSrc,
      highResLoaded,
      error,
      isHighResImageRendered,
      currentScale,
      showScaleIndicator,
      isThumbnailLoaded,
      isLivePhotoPlaying,
    },
    {
      setBlobSrc,
      setHighResLoaded,
      setError,
      setIsHighResImageRendered,
      setCurrentScale,
      setShowScaleIndicator,
      setIsThumbnailLoaded,
      setIsLivePhotoPlaying,
    },
  ]
}

export function useImageLoader(src: string, isCurrentImage: boolean, highResLoaded: boolean, error: boolean, onProgress?: (progress: number) => void, onError?: () => void, onBlobSrcChange?: (blobSrc: string | null) => void, loadingIndicatorRef?: React.RefObject<LoadingIndicatorRef | null>, setBlobSrc?: (src: string | null) => void, setHighResLoaded?: (loaded: boolean) => void, setError?: (error: boolean) => void, setIsHighResImageRendered?: (rendered: boolean) => void) {
  const { t } = useTranslation()
  const imageLoaderManagerRef = useRef<ImageLoaderManager | null>(null)

  useEffect(() => {
    if (highResLoaded || error || !isCurrentImage)
      return

    // Create new image loader manager
    const imageLoaderManager = new ImageLoaderManager()
    imageLoaderManagerRef.current = imageLoaderManager

    function cleanup() {
      setHighResLoaded?.(false)
      setBlobSrc?.(null)
      setError?.(false)
      onBlobSrcChange?.(null)
      setIsHighResImageRendered?.(false)

      // Reset loading indicator
      loadingIndicatorRef?.current?.resetLoadingState()
    }

    const loadImage = async () => {
      try {
        const result = await imageLoaderManager.loadImage(src, {
          onProgress,
          onError,
          onLoadingStateUpdate: (state) => {
            loadingIndicatorRef?.current?.updateLoadingState(state)
          },
        })

        setBlobSrc?.(result.blobSrc)
        onBlobSrcChange?.(result.blobSrc)
        setHighResLoaded?.(true)
      }
      catch (loadError) {
        console.error('Failed to load image:', loadError)
        setError?.(true)

        // 显示错误状态，而不是完全隐藏图片
        loadingIndicatorRef?.current?.updateLoadingState({
          isVisible: true,
          isError: true,
          errorMessage: t('photo.error.loading'),
        })
      }
    }

    cleanup()
    loadImage()

    return () => {
      imageLoaderManager.cleanup()
    }
  }, [
    highResLoaded,
    error,
    onProgress,
    src,
    onError,
    isCurrentImage,
    onBlobSrcChange,
    loadingIndicatorRef,
    t,
    setBlobSrc,
    setHighResLoaded,
    setError,
    setIsHighResImageRendered,
  ])

  return imageLoaderManagerRef
}

export function useScaleIndicator(onZoomChange?: (isZoomed: boolean) => void, setCurrentScale?: (scale: number) => void, setShowScaleIndicator?: (show: boolean) => void) {
  const scaleIndicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleScaleChange = useCallback(
    (scale: number, isZoomed: boolean) => {
      // 更新缩放倍率并显示提示
      startTransition(() => {
        setCurrentScale?.(scale)
        setShowScaleIndicator?.(true)
      })

      // 清除之前的定时器
      if (scaleIndicatorTimeoutRef.current) {
        clearTimeout(scaleIndicatorTimeoutRef.current)
      }

      scaleIndicatorTimeoutRef.current = setTimeout(() => {
        setShowScaleIndicator?.(false)
      }, SHOW_SCALE_INDICATOR_DURATION)

      onZoomChange?.(isZoomed)
    },
    [onZoomChange, setCurrentScale, setShowScaleIndicator],
  )

  // WebGL Image Viewer 的缩放变化处理
  const onTransformed = useCallback(
    (originalScale: number, relativeScale: number) => {
      const isZoomed = Math.abs(relativeScale - 1) > 0.01
      console.log('isZoomed', originalScale, isZoomed)
      handleScaleChange(originalScale, isZoomed)
    },
    [handleScaleChange],
  )

  // DOM Image Viewer 的缩放变化处理
  const onDOMTransformed = useCallback(
    (isZoomed: boolean, scale: number) => {
      handleScaleChange(scale, isZoomed)
    },
    [handleScaleChange],
  )

  return { onTransformed, onDOMTransformed }
}

export function useWebGLLoadingState(loadingIndicatorRef: React.RefObject<LoadingIndicatorRef | null>) {
  const { t } = useTranslation()

  const handleWebGLLoadingStateChange = useCallback(
    (
      isLoading: boolean,
      state?: LoadingState,
      quality?: 'high' | 'medium' | 'low' | 'unknown',
    ) => {
      let message = ''

      if (state === LoadingState.CREATE_TEXTURE) {
        message = t('photo.webgl.creatingTexture')
      }
      else if (state === LoadingState.IMAGE_LOADING) {
        message = t('photo.webgl.loadingImage')
      }

      loadingIndicatorRef.current?.updateLoadingState({
        isVisible: isLoading,
        isWebGLLoading: isLoading,
        webglMessage: message,
        webglQuality: quality,
      })
    },
    [t, loadingIndicatorRef],
  )

  return handleWebGLLoadingStateChange
}
