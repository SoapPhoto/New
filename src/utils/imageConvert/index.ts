import type { LoadingCallbacks } from '../imageLoaderManager'
import type { ConversionResult, ImageConverterStrategy } from './type'
/**
 * 图像转换策略模式实现
 * 支持多种浏览器原生不支持的图片格式转换
 */
import { HeicConverterStrategy } from './strategies/heic'
import { TiffConverterStrategy } from './strategies/tiff'

// 图像转换策略管理器
export class ImageConverterManager {
  private strategies = new Map<string, ImageConverterStrategy>()

  constructor() {
    // 注册默认策略
    this.registerStrategy(new HeicConverterStrategy())
    this.registerStrategy(new TiffConverterStrategy())
  }

  /**
   * 注册转换策略
   */
  registerStrategy(strategy: ImageConverterStrategy): void {
    // 为每个支持的格式注册策略
    strategy.getSupportedFormats().forEach((format) => {
      this.strategies.set(format, strategy)
    })
    console.info(`Registered image converter strategy: ${strategy.getName()}`)
  }

  /**
   * 移除转换策略
   */
  removeStrategy(strategyName: string): boolean {
    let removed = false
    const strategy = Array.from(this.strategies.values()).find(
      s => s.getName() === strategyName,
    )

    if (strategy) {
      strategy.getSupportedFormats().forEach((format) => {
        if (this.strategies.get(format) === strategy) {
          this.strategies.delete(format)
          removed = true
        }
      })
      if (removed) {
        console.info(`Removed image converter strategy: ${strategyName}`)
      }
    }
    return removed
  }

  /**
   * 获取所有已注册的策略
   */
  getStrategies(): ImageConverterStrategy[] {
    const uniqueStrategies = new Set(this.strategies.values())
    return Array.from(uniqueStrategies)
  }

  /**
   * 使用 file-type 直接查找适合的转换策略
   */
  async findSuitableStrategy(
    blob: Blob,
  ): Promise<ImageConverterStrategy | null> {
    try {
      // 使用 file-type 检测文件格式
      const { fileTypeFromBlob } = await import('file-type')
      const fileType = await fileTypeFromBlob(blob)

      if (!fileType) {
        console.info('Could not detect file type with file-type library')
        return null
      }

      // 直接根据 MIME 类型查找策略
      const strategy = this.strategies.get(fileType.mime)

      if (strategy) {
        // 验证策略是否确实需要转换这个文件
        const shouldConvert = await strategy.shouldConvert(blob)
        if (shouldConvert) {
          console.info(
            `Found suitable conversion strategy: ${strategy.getName()}`,
          )
          return strategy
        }
        else {
          console.info(
            `Strategy ${strategy.getName()} detected but conversion not needed`,
          )
          return null
        }
      }

      return null
    }
    catch (error) {
      console.error('File type detection failed:', error)
      return null
    }
  }

  /**
   * 执行图像转换
   */
  async convertImage(
    blob: Blob,
    originalUrl: string,
    callbacks?: LoadingCallbacks,
  ): Promise<ConversionResult | null> {
    const strategy = await this.findSuitableStrategy(blob)

    if (!strategy) {
      console.info('No conversion strategy needed for this image')
      return null
    }

    console.info(`Converting image using ${strategy.getName()} strategy`)
    return await strategy.convert(blob, originalUrl, callbacks)
  }

  /**
   * 获取支持的格式列表
   */
  getSupportedFormats(): string[] {
    return Array.from(this.strategies.keys())
  }
}

// 导出单例实例
export const imageConverterManager = new ImageConverterManager()
