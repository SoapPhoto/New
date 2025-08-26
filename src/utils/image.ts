import type { IEXIF } from './exif'
import { encode } from 'blurhash'
import { isString } from 'es-toolkit'
import { FastAverageColor } from 'fast-average-color'
import { getImageEXIF } from './exif'
import { isWebp } from './mixed'

// 常量定义
const DEFAULT_CDN_DOMAIN = '//cdn-oss.soapphoto.com'
const SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp'] as const
const ORIENTATION_TRANSFORMS = {
  FLIP_HORIZONTAL: 2,
  ROTATE_180: 3,
  FLIP_VERTICAL: 4,
  FLIP_VERTICAL_ROTATE_90: 5,
  ROTATE_90: 6,
  FLIP_HORIZONTAL_ROTATE_90: 7,
  ROTATE_270: 8,
} as const

// 类型定义
export interface IImageInfo {
  exif: IEXIF
  color: string
  isDark: boolean
  height: number
  width: number
  originalname: string
  size: number
  mimetype: string
  make?: string
  model?: string
  blurhash?: string
}

export const pictureStyle = {
  original: '',
  full: '@!full',
  large: '@!large',
  small: '@!small',
  regular: '@!regular',
  thumb: '@!thumbnail',
  blur: '@!thumbnailBlur',
  itemprop: '@!itemprop',
  thumbSmall: '@!thumbnailSmall',
  medium: '@!medium',
  ico: '@!ico',
} as const

export type PictureStyle = keyof typeof pictureStyle
export type ImageFormat = typeof SUPPORTED_IMAGE_FORMATS[number]

interface ImageDimensions {
  width: number
  height: number
}

interface CanvasRenderOptions {
  orientation?: number
  isBase64?: boolean
  quality?: number
}

// 错误类型定义
export class ImageProcessError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message)
    this.name = 'ImageProcessError'
  }
}

/**
 * 获取图片链接
 * @param key - 图片key
 * @param style - 图片样式
 * @param webp - 是否使用webp格式
 * @returns 完整的图片URL
 */
export function getPictureUrl(
  key: string,
  style: PictureStyle = 'regular',
  webp = true,
): string {
  if (!key) {
    throw new ImageProcessError('Image key is required', 'INVALID_KEY')
  }

  let styleName = pictureStyle[style]

  // 添加webp后缀
  if (isWebp && webp && style !== 'original') {
    styleName += '_webp'
  }

  // 处理不同类型的key
  if (/default\.svg$/.test(key)) {
    return key
  }

  if (/^\/\/cdn/.test(key)) {
    return `${key}${styleName}`
  }

  if (key.startsWith('blob:') || /\/\//.test(key)) {
    return key
  }

  // 统一处理CDN路径
  const basePath = /^photo\//.test(key) ? key : `photo/${key}`
  return `${DEFAULT_CDN_DOMAIN}/${basePath}${styleName}`
}

/**
 * 判断文件是否是支持的图片格式
 * @param fileName - 文件名
 * @returns 是否是图片格式
 */
export function isImage(fileName: string): boolean {
  if (!fileName || typeof fileName !== 'string') {
    return false
  }

  const ext = fileName.split('.').pop()?.toLowerCase()
  return ext ? SUPPORTED_IMAGE_FORMATS.includes(ext as ImageFormat) : false
}

/**
 * 计算等比缩放后的尺寸
 * @param originalWidth - 原始宽度
 * @param originalHeight - 原始高度
 * @param maxWidth - 最大宽度
 * @param maxHeight - 最大高度
 * @returns 缩放后的尺寸 [width, height]
 */
export function getImageMinSize(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
): [number, number] {
  // 参数验证
  if (originalWidth <= 0 || originalHeight <= 0 || maxWidth <= 0 || maxHeight <= 0) {
    throw new ImageProcessError('Invalid dimensions provided', 'INVALID_DIMENSIONS')
  }

  let targetWidth = originalWidth
  let targetHeight = originalHeight

  // 如果图片尺寸超过限制，进行等比缩放
  if (originalWidth > maxWidth || originalHeight > maxHeight) {
    const widthRatio = maxWidth / originalWidth
    const heightRatio = maxHeight / originalHeight
    const ratio = Math.min(widthRatio, heightRatio)

    targetWidth = Math.round(originalWidth * ratio)
    targetHeight = Math.round(originalHeight * ratio)
  }

  return [targetWidth, targetHeight]
}

/**
 * 生成图片预览
 * @param img - HTML图片元素
 * @param minSize - 最小尺寸
 * @param options - 渲染选项
 * @returns 预览图片的URL或base64
 */
export function previewImage(
  img: HTMLImageElement,
  minSize = 600,
  options: CanvasRenderOptions = {},
): Promise<string> {
  const { isBase64 = false, quality = 0.8 } = options

  return new Promise((resolve, reject) => {
    try {
      // 根据方向确定原始尺寸
      const originalWidth = img.naturalWidth
      const originalHeight = img.naturalHeight

      // 计算缩放后的尺寸
      const [scaledWidth, scaledHeight] = getImageMinSize(
        originalWidth,
        originalHeight,
        minSize,
        minSize,
      )

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new ImageProcessError('Cannot get canvas context', 'CANVAS_ERROR'))
        return
      }
      // 根据方向设置画布并应用变换
      // if (orientation && orientation !== 1) {
      //   applyOrientationTransform(ctx, orientation, scaledWidth, scaledHeight)
      // }
      // else {
      //   // 没有方向信息或正常方向
      // }
      canvas.width = scaledWidth
      canvas.height = scaledHeight

      // 绘制图片到变换后的画布上
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight)

      if (isBase64) {
        const dataURL = canvas.toDataURL('image/jpeg', quality)
        resolve(dataURL)
      }
      else {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(URL.createObjectURL(blob))
            }
            else {
              reject(new ImageProcessError('Failed to create blob', 'BLOB_ERROR'))
            }
          },
          'image/jpeg',
          quality,
        )
      }
    }
    catch (error) {
      reject(new ImageProcessError(
        `Preview generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'PREVIEW_ERROR',
      ))
    }
  })
}

/**
 * 获取图片主色调
 * @param img - HTML图片元素
 * @returns 颜色信息
 */
export async function getImageColor(img: HTMLImageElement): Promise<{
  hex: string
  isDark: boolean
  rgb: [number, number, number, number]
}> {
  try {
    const fac = new FastAverageColor()
    const color = await fac.getColorAsync(img)

    return {
      hex: color.hex,
      isDark: color.isDark,
      rgb: color.value as [number, number, number, number],
    }
  }
  catch (error) {
    console.warn('Failed to get image color, using default:', error)
    return {
      hex: '#ffffff',
      isDark: false,
      rgb: [255, 255, 255, 1],
    }
  }
}

/**
 * 生成图片BlurHash
 * @param data - 图片数据（URL或HTMLImageElement）
 * @param componentX - X方向组件数
 * @param componentY - Y方向组件数
 * @returns BlurHash字符串
 */
export function getImageBlurhash(
  data: string | HTMLImageElement,
  componentX = 4,
  componentY = 3,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new ImageProcessError('Cannot get canvas context', 'CANVAS_ERROR'))
      return
    }

    let img: HTMLImageElement
    let needsCleanup = false

    if (isString(data)) {
      img = new Image()
      img.crossOrigin = 'anonymous' // 处理跨域问题
      img.src = data
      needsCleanup = true
    }
    else {
      img = data
    }

    const processImage = () => {
      try {
        const { naturalWidth: width, naturalHeight: height } = img

        if (width === 0 || height === 0) {
          reject(new ImageProcessError('Invalid image dimensions', 'INVALID_DIMENSIONS'))
          return
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        const imageData = ctx.getImageData(0, 0, width, height)
        const blurhash = encode(imageData.data, width, height, componentX, componentY)

        if (needsCleanup && img.src.startsWith('blob:')) {
          URL.revokeObjectURL(img.src)
        }

        resolve(blurhash)
      }
      catch (error) {
        reject(new ImageProcessError(
          `BlurHash generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          'BLURHASH_ERROR',
        ))
      }
    }

    if (img.complete && img.naturalWidth > 0) {
      processImage()
    }
    else {
      img.onload = processImage
      img.onerror = () => {
        reject(new ImageProcessError('Failed to load image for BlurHash', 'IMAGE_LOAD_ERROR'))
      }
    }
  })
}

/**
 * 获取旋转后的图片尺寸
 * @param width - 原始宽度
 * @param height - 原始高度
 * @param orientation - EXIF方向值
 * @returns 旋转后的尺寸
 */
function getRotatedDimensions(width: number, height: number, orientation?: number): ImageDimensions {
  if (!orientation) {
    return { width, height }
  }

  // 这些方向值会导致宽高互换
  const rotationOrientations = [
    ORIENTATION_TRANSFORMS.FLIP_VERTICAL_ROTATE_90,
    ORIENTATION_TRANSFORMS.ROTATE_90,
    ORIENTATION_TRANSFORMS.FLIP_HORIZONTAL_ROTATE_90,
    ORIENTATION_TRANSFORMS.ROTATE_270,
  ]

  return rotationOrientations.includes(orientation)
    ? { width: height, height: width }
    : { width, height }
}

/**
 * 获取图片详细信息
 * @param image - 图片文件
 * @returns 图片信息、预览URL和base64数据
 */
export async function getImageInfo(
  image: File,
): Promise<[IImageInfo, string, string]> {
  if (!image || !(image instanceof File)) {
    throw new ImageProcessError('Invalid image file provided', 'INVALID_FILE')
  }

  if (!isImage(image.name)) {
    throw new ImageProcessError('Unsupported image format', 'UNSUPPORTED_FORMAT')
  }

  return new Promise(async (resolve, reject) => {
    let imgSrc: string | null = null

    try {
      const info: IImageInfo = {
        exif: {},
        originalname: image.name,
        color: '#ffffff',
        isDark: false,
        height: 0,
        width: 0,
        make: undefined,
        model: undefined,
        size: 0,
        mimetype: image.type,
      }

      imgSrc = URL.createObjectURL(image)
      const imgElement = new Image()
      imgElement.src = imgSrc

      // 获取EXIF信息
      const exif = await getImageEXIF(image).catch((error) => {
        console.warn('Failed to get EXIF data:', error)
        return null
      })

      if (exif) {
        info.exif = exif
        info.make = exif.Make
        info.model = exif.Model
      }

      const processImage = async () => {
        try {
          // 设置基础尺寸信息
          const originalDimensions = {
            width: imgElement.naturalWidth,
            height: imgElement.naturalHeight,
          }

          // 根据EXIF方向调整尺寸
          const adjustedDimensions = getRotatedDimensions(
            originalDimensions.width,
            originalDimensions.height,
            info.exif.orientation,
          )

          info.width = adjustedDimensions.width
          info.height = adjustedDimensions.height

          // 并行处理图片预览和颜色分析
          const [preview, previewBase64, colorInfo] = await Promise.all([
            previewImage(imgElement, 800, { orientation: info.exif.orientation }),
            previewImage(imgElement, 300, {
              orientation: info.exif.orientation,
              isBase64: true,
            }),
            getImageColor(imgElement),
          ])

          info.color = colorInfo.hex
          info.isDark = colorInfo.isDark

          // 生成BlurHash
          try {
            info.blurhash = await getImageBlurhash(previewBase64)
          }
          catch (error) {
            console.warn('Failed to generate BlurHash:', error)
            // BlurHash 失败不应该阻断整个流程
          }

          resolve([info, preview, previewBase64])
        }
        catch (error) {
          reject(new ImageProcessError(
            `Image processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'PROCESSING_ERROR',
          ))
        }
      }

      if (imgElement.complete && imgElement.naturalWidth > 0) {
        await processImage()
      }
      else {
        imgElement.onload = processImage
        imgElement.onerror = () => {
          reject(new ImageProcessError('Failed to load image', 'IMAGE_LOAD_ERROR'))
        }

        // 添加超时处理
        setTimeout(() => {
          if (!imgElement.complete) {
            reject(new ImageProcessError('Image loading timeout', 'LOAD_TIMEOUT'))
          }
        }, 30000) // 30秒超时
      }
    }
    catch (error) {
      reject(error instanceof ImageProcessError ? error : new ImageProcessError(
        `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'UNEXPECTED_ERROR',
      ))
    }
    finally {
      // 清理资源
      if (imgSrc && imgSrc.startsWith('blob:')) {
        setTimeout(() => URL.revokeObjectURL(imgSrc!), 1000)
      }
    }
  })
}

/**
 * 获取图片元数据（getImageInfo的别名）
 * @param image - 图片文件
 * @returns 图片信息、预览URL和base64数据
 */
export const getImageMetadata = getImageInfo

// 工具函数：批量处理图片
export async function processImagesInBatch(
  images: File[],
  batchSize = 3,
): Promise<Array<[IImageInfo, string, string]>> {
  const results: Array<[IImageInfo, string, string]> = []

  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize)
    const batchResults = await Promise.allSettled(
      batch.map(image => getImageInfo(image)),
    )

    batchResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value)
      }
      else {
        console.error(`Failed to process image ${i + index}:`, result.reason)
      }
    })
  }

  return results
}
/**
 * 从 URL 或文件路径中提取图片格式
 * @param url - 图片的 URL 或文件路径
 * @returns 图片格式的大写字符串，如 'JPG', 'HEIC', 'PNG' 等
 */
export function getImageFormat(url: string): string {
  if (!url)
    return 'UNKNOWN'

  const extension = url.split('.').pop()?.toUpperCase()
  return extension || 'UNKNOWN'
}
