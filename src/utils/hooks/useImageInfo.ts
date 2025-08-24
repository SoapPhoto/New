import type { BaiduClassify } from '@app/common/types/shared/baidu/interface/baidu.interface'
import type { RefObject } from 'react'
import type { IImageInfo } from '../image'

import { imageClassify } from '@app/services/picture'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { getImageInfo, isImage } from '../image'

// 返回类型定义
type UseImageInfoReturn = readonly [
  info: IImageInfo | undefined,
  thumbnail: string | undefined,
  setFile: (file: File) => void,
  clearImage: () => void,
  classify: BaiduClassify[] | undefined,
]

// Hook 状态接口
interface ImageInfoState {
  info?: IImageInfo
  thumbnail?: string
  base64?: string
  classify?: BaiduClassify[]
}

/**
 * 图片信息管理 Hook
 * @param imageRef - 图片文件引用
 * @returns 图片信息相关状态和操作方法
 */
export default function useImageInfo(
  imageRef: RefObject<File | null>,
): UseImageInfoReturn {
  const [state, setState] = useState<ImageInfoState>({})
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  // 获取图片信息
  const getInfo = async (file: File): Promise<void> => {
    if (isLoading)
      return

    setIsLoading(true)
    try {
      const [data, url, base64Data] = await getImageInfo(file)

      setState(prevState => ({
        ...prevState,
        info: {
          ...data,
          originalname: file.name,
          size: file.size,
          mimetype: file.type,
        },
        thumbnail: url,
        base64: base64Data,
      }))
    }
    catch (error) {
      console.error('Failed to get image info:', error)
      toast.error(t('upload.message.image_process_error'))

      // 清理状态
      setState({})
      imageRef.current = null
    }
    finally {
      setIsLoading(false)
    }
  }

  // 设置文件
  const setFile = (file: File): void => {
    if (!file) {
      toast.error(t('upload.message.no_file'))
      return
    }

    // 文件大小检查 (可配置)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      toast.error(t('upload.message.file_too_large'))
      return
    }

    if (isImage(file.name)) {
      imageRef.current = file
      getInfo(file)
    }
    else {
      toast.error(t('upload.message.image_format_error'))
    }
  }

  // 清理图片信息
  const clearImage = useCallback((): void => {
    setState({})
    if (imageRef.current) {
      imageRef.current = null
    }
  }, [imageRef])

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      // 清理可能存在的对象 URL 以防内存泄漏
      if (state.thumbnail && state.thumbnail.startsWith('blob:')) {
        URL.revokeObjectURL(state.thumbnail)
      }
    }
  }, [state.thumbnail])

  return [
    state.info,
    state.thumbnail,
    setFile,
    clearImage,
    state.classify,
  ] as const
}
