import { useCallback, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'

interface LoadingState {
  isVisible: boolean
  isConverting: boolean
  isHeicFormat: boolean
  loadingProgress: number
  loadedBytes: number
  totalBytes: number
  conversionMessage?: string // 视频转换消息
  codecInfo?: string // 编码器信息

  // WebGL 相关状态
  isWebGLLoading?: boolean // WebGL 纹理是否正在加载
  webglMessage?: string // WebGL 加载消息
  webglQuality?: 'high' | 'medium' | 'low' | 'unknown' // WebGL 纹理质量

  // 错误状态
  isError?: boolean // 是否出现错误
  errorMessage?: string // 错误消息
}

interface LoadingIndicatorRef {
  updateLoadingState: (state: Partial<LoadingState>) => void
  resetLoadingState: () => void
}

const initialLoadingState: LoadingState = {
  isVisible: false,
  isConverting: false,
  isHeicFormat: false,
  loadingProgress: 0,
  loadedBytes: 0,
  totalBytes: 0,
  conversionMessage: undefined,

  isWebGLLoading: false,
  webglMessage: undefined,
  webglQuality: 'unknown',

  isError: false,
  errorMessage: undefined,
}

const Container = styled.div`
  pointer-events: none;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 10;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 0.75rem;
  backdrop-filter: blur(4px);
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
`

const IconContainer = styled.div`
  position: relative;
`

const ErrorIcon = styled.div`
  font-size: 1.125rem;
  color: #f87171;
`

const LoadingIcon = styled.div`
  font-size: 1.125rem;
  animation: spin 1s linear infinite;
`

const MessageContainer = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.125rem;
`

const Message = styled.p<{ isError?: boolean }>`
  font-size: 0.75rem;
  font-weight: ${props => (props.isError ? 'bold' : 'normal')};
  color: ${props => (props.isError ? '#f87171' : 'white')};
`

const SubMessage = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
`

const WebGLQuality = styled.span<{ quality: string }>`
  font-size: 0.75rem;
  color: ${props =>
    props.quality === 'high'
      ? '#4ade80'
      : props.quality === 'medium'
        ? '#fbbf24'
        : props.quality === 'low'
          ? '#f87171'
          : '#94a3b8'};
`

const Progress = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
`

export function LoadingIndicator({
  ref,
}: {
  ref?: React.Ref<LoadingIndicatorRef | null>
}) {
  const [loadingState, setLoadingState] = useState<LoadingState>(
    initialLoadingState,
  )

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        updateLoadingState: (partialState: Partial<LoadingState>) => {
          setLoadingState((prev) => {
            if (partialState.isVisible === false) {
              return initialLoadingState
            }
            return { ...prev, ...partialState }
          })
        },
        resetLoadingState: () => {
          setLoadingState(initialLoadingState)
        },
      }),
      [],
    ),
  )

  if (!loadingState.isVisible) {
    return null
  }

  return (
    <Container>
      <Content>
        <IconContainer>
          {loadingState.isError ? (
            <ErrorIcon className="i-mingcute-warning-line" />
          ) : (
            <LoadingIcon className="i-mingcute-loading-3-line" />
          )}
        </IconContainer>
        <MessageContainer>
          {loadingState.isError ? (
            <>
              <Message isError>{loadingState.errorMessage || '图片加载失败'}</Message>
              <SubMessage>加载中</SubMessage>
            </>
          ) : loadingState.isConverting ? (
            <>
              <Message>{loadingState.conversionMessage || '转换中...'}</Message>
            </>
          ) : loadingState.isWebGLLoading ? (
            <>
              <div className="flex items-center gap-2">
                <Message>{loadingState.webglMessage || 'WebGL 纹理加载'}</Message>
                {loadingState.webglQuality !== 'unknown' && (
                  <WebGLQuality quality={loadingState.webglQuality!}>
                    {loadingState.webglQuality}
                  </WebGLQuality>
                )}
              </div>
              <SubMessage>正在构建高质量纹理...</SubMessage>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Message>{loadingState.isHeicFormat ? 'HEIC' : '加载中...'}</Message>
                <Progress>
                  {Math.round(loadingState.loadingProgress)}
                  %
                </Progress>
              </div>
              {loadingState.totalBytes > 0 && (
                <SubMessage>
                  {(loadingState.loadedBytes / 1024 / 1024).toFixed(1)}
                  {' '}
                  MB /
                  {' '}
                  {(loadingState.totalBytes / 1024 / 1024).toFixed(1)}
                  {' '}
                  MB
                </SubMessage>
              )}
            </>
          )}
        </MessageContainer>
      </Content>
    </Container>
  )
}

export type { LoadingIndicatorRef, LoadingState }
