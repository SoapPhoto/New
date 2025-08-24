// Enhanced imageCache.ts with better cache management

interface CachedImageData {
  url: string
  blobSrc: string
  width: number
  height: number
  imageBitmap: ImageBitmap
  timestamp: number
  accessCount: number // 添加访问计数
  lastAccessed: number // 最后访问时间
}

export class ImageCache {
  public cache = new Map<string, CachedImageData>()
  public maxCacheSize = 10 // 最大缓存图片数量
  public maxAge = 30 * 60 * 1000 // 30分钟过期时间
  public maxMemoryMB = 200 // 最大内存使用量 (MB)

  public get(url: string): CachedImageData | null {
    const cached = this.cache.get(url)
    console.log('[ImageCache] get', cached, url, this.cache.keys())
    if (!cached)
      return null

    // 检查是否过期
    if (Date.now() - cached.timestamp > this.maxAge) {
      this.remove(url)
      return null
    }

    // 更新访问信息
    cached.accessCount++
    cached.lastAccessed = Date.now()

    return cached
  }

  public set(url: string, data: Omit<CachedImageData, 'accessCount' | 'lastAccessed'>): void {
    // 检查内存使用量
    this.enforceMemoryLimit()

    // 如果缓存已满，删除最不常用的条目
    if (this.cache.size >= this.maxCacheSize) {
      this.evictLeastUsed()
    }

    const cacheData: CachedImageData = {
      ...data,
      accessCount: 1,
      lastAccessed: Date.now(),
    }

    console.log(url, cacheData)

    this.cache.set(url, cacheData)

    console.log(`[ImageCache] Cached image: ${url} (${data.width}x${data.height})`)
    console.log(`[ImageCache] Cache size: ${this.cache.size}/${this.maxCacheSize}`)
  }

  public remove(url: string): boolean {
    const cached = this.cache.get(url)
    if (cached?.imageBitmap) {
      cached.imageBitmap.close()
    }
    const removed = this.cache.delete(url)

    if (removed) {
      console.log(`[ImageCache] Removed from cache: ${url}`)
    }

    return removed
  }

  public has(url: string): boolean {
    const cached = this.cache.get(url)
    if (!cached)
      return false

    // 检查是否过期
    if (Date.now() - cached.timestamp > this.maxAge) {
      this.remove(url)
      return false
    }

    return true
  }

  // 智能清理：优先删除最不常用且最旧的条目
  public evictLeastUsed(): void {
    if (this.cache.size === 0)
      return

    const entries = Array.from(this.cache.entries())

    // 计算综合得分：访问频率 + 时间新鲜度
    const scored = entries.map(([url, data]) => {
      const now = Date.now()
      const ageScore = (now - data.timestamp) / this.maxAge // 0-1，越大越旧
      const accessScore = 1 / (data.accessCount + 1) // 0-1，越大访问越少
      const recencyScore = (now - data.lastAccessed) / this.maxAge // 0-1，越大最近访问越少

      const totalScore = ageScore * 0.4 + accessScore * 0.3 + recencyScore * 0.3

      return { url, data, score: totalScore }
    })

    // 按得分排序，删除得分最高的（最应该被删除的）
    scored.sort((a, b) => b.score - a.score)

    const toRemove = scored.slice(0, Math.max(1, Math.floor(this.cache.size * 0.3)))
    toRemove.forEach(({ url }) => this.remove(url))

    console.log(`[ImageCache] Evicted ${toRemove.length} least used items`)
  }

  // 内存限制检查
  public enforceMemoryLimit(): void {
    let totalMemoryMB = 0

    for (const [, data] of this.cache) {
      // 估算 ImageBitmap 内存使用量 (4 bytes per pixel for RGBA)
      const memoryMB = (data.width * data.height * 4) / (1024 * 1024)
      totalMemoryMB += memoryMB
    }

    if (totalMemoryMB > this.maxMemoryMB) {
      console.warn(`[ImageCache] Memory usage ${totalMemoryMB.toFixed(1)}MB exceeds limit ${this.maxMemoryMB}MB, cleaning up...`)

      // 删除一些条目直到内存使用量降到限制以下
      while (totalMemoryMB > this.maxMemoryMB * 0.8 && this.cache.size > 0) {
        this.evictLeastUsed()

        // 重新计算内存使用量
        totalMemoryMB = 0
        for (const [, data] of this.cache) {
          const memoryMB = (data.width * data.height * 4) / (1024 * 1024)
          totalMemoryMB += memoryMB
        }
      }
    }
  }

  // 清理过期条目
  public cleanupExpired(): number {
    const now = Date.now()
    const expired: string[] = []

    for (const [url, data] of this.cache) {
      if (now - data.timestamp > this.maxAge) {
        expired.push(url)
      }
    }

    expired.forEach(url => this.remove(url))

    if (expired.length > 0) {
      console.log(`[ImageCache] Cleaned up ${expired.length} expired items`)
    }

    return expired.length
  }

  public clear(): void {
    this.cache.forEach((cached) => {
      if (cached.imageBitmap) {
        cached.imageBitmap.close()
      }
    })
    this.cache.clear()
    console.log('[ImageCache] Cache cleared')
  }

  public getStats(): {
    size: number
    maxSize: number
    urls: string[]
    memoryUsageMB: number
    totalAccesses: number
  } {
    let totalMemoryMB = 0
    let totalAccesses = 0

    for (const [, data] of this.cache) {
      const memoryMB = (data.width * data.height * 4) / (1024 * 1024)
      totalMemoryMB += memoryMB
      totalAccesses += data.accessCount
    }

    return {
      size: this.cache.size,
      maxSize: this.maxCacheSize,
      urls: Array.from(this.cache.keys()),
      memoryUsageMB: Math.round(totalMemoryMB * 100) / 100,
      totalAccesses,
    }
  }

  // 配置缓存参数
  public configure(options: {
    maxCacheSize?: number
    maxAge?: number
    maxMemoryMB?: number
  }): void {
    if (options.maxCacheSize !== undefined) {
      this.maxCacheSize = options.maxCacheSize
    }
    if (options.maxAge !== undefined) {
      this.maxAge = options.maxAge
    }
    if (options.maxMemoryMB !== undefined) {
      this.maxMemoryMB = options.maxMemoryMB
    }

    console.log('[ImageCache] Configuration updated:', {
      maxCacheSize: this.maxCacheSize,
      maxAge: this.maxAge,
      maxMemoryMB: this.maxMemoryMB,
    })
  }

  // 定期清理任务（建议在应用启动时调用）
  public startPeriodicCleanup(intervalMs: number = 5 * 60 * 1000): void {
    setInterval(() => {
      this.cleanupExpired()
      this.enforceMemoryLimit()
    }, intervalMs)

    console.log(`[ImageCache] Started periodic cleanup (every ${intervalMs / 1000}s)`)
  }
}

export const imageCache = new ImageCache()
