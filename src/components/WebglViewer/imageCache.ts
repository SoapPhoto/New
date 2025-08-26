// Enhanced imageCache.ts with local storage support using IndexedDB

interface CachedImageData {
  url: string
  blobSrc: string
  width: number
  height: number
  imageBitmap: ImageBitmap
  timestamp: number
  accessCount: number
  lastAccessed: number
  size: number
}

interface StoredImageData {
  url: string
  blob: Blob
  width: number
  height: number
  timestamp: number
  accessCount: number
  lastAccessed: number
  mimeType: string
  size: number
}

export class ImageCache {
  public cache = new Map<string, CachedImageData>()
  public maxCacheSize = 100
  public maxAge = 365 * 24 * 60 * 60 * 1000 // 1年
  public maxMemoryMB = 300
  public maxLocalStorageMB = 500 // 本地存储最大容量

  private dbName = 'ImageCacheDB'
  private dbVersion = 1
  private storeName = 'images'
  private db: IDBDatabase | null = null
  private initPromise: Promise<void> | null = null

  constructor() {
    this.initPromise = this.initDB()
  }

  // 初始化 IndexedDB
  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => {
        console.error('[ImageCache] Failed to open IndexedDB:', request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        console.log('[ImageCache] IndexedDB initialized successfully')
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // 创建对象存储
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'url' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
          store.createIndex('lastAccessed', 'lastAccessed', { unique: false })
          console.log('[ImageCache] IndexedDB object store created')
        }
      }
    })
  }

  // 确保数据库已初始化
  private async ensureDB(): Promise<void> {
    if (this.initPromise) {
      await this.initPromise
    }
  }

  // 从本地存储加载图片
  private async loadFromLocal(url: string): Promise<CachedImageData | null> {
    try {
      await this.ensureDB()
      if (!this.db)
        return null

      return new Promise((resolve) => {
        const transaction = this.db!.transaction([this.storeName], 'readonly')
        const store = transaction.objectStore(this.storeName)
        const request = store.get(url)

        request.onsuccess = async () => {
          const stored: StoredImageData = request.result
          if (!stored) {
            resolve(null)
            return
          }

          // 检查是否过期
          if (Date.now() - stored.timestamp > this.maxAge) {
            this.removeFromLocal(url)
            resolve(null)
            return
          }

          try {
            // 创建 ImageBitmap 和 blob URL
            const imageBitmap = await createImageBitmap(stored.blob)
            const blobSrc = URL.createObjectURL(stored.blob)

            const cached: CachedImageData = {
              url: stored.url,
              blobSrc,
              width: stored.width,
              height: stored.height,
              imageBitmap,
              timestamp: stored.timestamp,
              accessCount: stored.accessCount,
              lastAccessed: stored.lastAccessed,
            }

            console.log(`[ImageCache] Loaded from local storage: ${url}`)
            resolve(cached)
          }
          catch (error) {
            console.error(`[ImageCache] Failed to create ImageBitmap from local storage:`, error)
            this.removeFromLocal(url)
            resolve(null)
          }
        }

        request.onerror = () => {
          console.error('[ImageCache] Failed to load from local storage:', request.error)
          resolve(null)
        }
      })
    }
    catch (error) {
      console.error('[ImageCache] Error loading from local storage:', error)
      return null
    }
  }

  // 保存到本地存储
  private async saveToLocal(cached: CachedImageData): Promise<void> {
    try {
      await this.ensureDB()
      if (!this.db)
        return

      // 将 ImageBitmap 转换为 Blob
      const canvas = new OffscreenCanvas(cached.width, cached.height)
      const ctx = canvas.getContext('2d')
      if (!ctx)
        return

      ctx.drawImage(cached.imageBitmap, 0, 0)
      const blob = await canvas.convertToBlob({ type: 'image/png' })

      const stored: StoredImageData = {
        url: cached.url,
        blob,
        width: cached.width,
        height: cached.height,
        timestamp: cached.timestamp,
        accessCount: cached.accessCount,
        lastAccessed: cached.lastAccessed,
        mimeType: blob.type,
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([this.storeName], 'readwrite')
        const store = transaction.objectStore(this.storeName)
        const request = store.put(stored)

        request.onsuccess = () => {
          console.log(`[ImageCache] Saved to local storage: ${cached.url}`)
          resolve()
        }

        request.onerror = () => {
          console.error('[ImageCache] Failed to save to local storage:', request.error)
          reject(request.error)
        }
      })
    }
    catch (error) {
      console.error('[ImageCache] Error saving to local storage:', error)
    }
  }

  // 从本地存储删除
  private async removeFromLocal(url: string): Promise<void> {
    try {
      await this.ensureDB()
      if (!this.db)
        return

      return new Promise((resolve) => {
        const transaction = this.db!.transaction([this.storeName], 'readwrite')
        const store = transaction.objectStore(this.storeName)
        const request = store.delete(url)

        request.onsuccess = () => {
          console.log(`[ImageCache] Removed from local storage: ${url}`)
          resolve()
        }

        request.onerror = () => {
          console.error('[ImageCache] Failed to remove from local storage:', request.error)
          resolve()
        }
      })
    }
    catch (error) {
      console.error('[ImageCache] Error removing from local storage:', error)
    }
  }

  // 获取本地存储使用情况
  private async getLocalStorageUsage(): Promise<{ count: number, sizeMB: number }> {
    try {
      await this.ensureDB()
      if (!this.db)
        return { count: 0, sizeMB: 0 }

      return new Promise((resolve) => {
        const transaction = this.db!.transaction([this.storeName], 'readonly')
        const store = transaction.objectStore(this.storeName)
        const request = store.getAll()

        request.onsuccess = () => {
          const items: StoredImageData[] = request.result
          let totalSize = 0

          items.forEach((item) => {
            totalSize += item.blob.size
          })

          resolve({
            count: items.length,
            sizeMB: Math.round((totalSize / (1024 * 1024)) * 100) / 100,
          })
        }

        request.onerror = () => {
          console.error('[ImageCache] Failed to get local storage usage:', request.error)
          resolve({ count: 0, sizeMB: 0 })
        }
      })
    }
    catch (error) {
      console.error('[ImageCache] Error getting local storage usage:', error)
      return { count: 0, sizeMB: 0 }
    }
  }

  // 清理本地存储中的过期项目
  private async cleanupLocalExpired(): Promise<number> {
    try {
      await this.ensureDB()
      if (!this.db)
        return 0

      return new Promise((resolve) => {
        const transaction = this.db!.transaction([this.storeName], 'readwrite')
        const store = transaction.objectStore(this.storeName)
        const request = store.getAll()

        request.onsuccess = async () => {
          const items: StoredImageData[] = request.result
          const now = Date.now()
          let removedCount = 0

          for (const item of items) {
            if (now - item.timestamp > this.maxAge) {
              await this.removeFromLocal(item.url)
              removedCount++
            }
          }

          console.log(`[ImageCache] Cleaned up ${removedCount} expired items from local storage`)
          resolve(removedCount)
        }

        request.onerror = () => {
          console.error('[ImageCache] Failed to cleanup expired items:', request.error)
          resolve(0)
        }
      })
    }
    catch (error) {
      console.error('[ImageCache] Error cleaning up expired items:', error)
      return 0
    }
  }

  // 强制本地存储容量限制
  private async enforceLocalStorageLimit(): Promise<void> {
    const usage = await this.getLocalStorageUsage()

    if (usage.sizeMB > this.maxLocalStorageMB) {
      console.warn(`[ImageCache] Local storage usage ${usage.sizeMB}MB exceeds limit ${this.maxLocalStorageMB}MB, cleaning up...`)

      try {
        await this.ensureDB()
        if (!this.db)
          return

        return new Promise((resolve) => {
          const transaction = this.db!.transaction([this.storeName], 'readwrite')
          const store = transaction.objectStore(this.storeName)
          const index = store.index('lastAccessed')
          const request = index.getAll()

          request.onsuccess = async () => {
            const items: StoredImageData[] = request.result

            // 按最后访问时间排序，删除最旧的
            items.sort((a, b) => a.lastAccessed - b.lastAccessed)

            const toRemove = Math.ceil(items.length * 0.3) // 删除30%
            for (let i = 0; i < toRemove && i < items.length; i++) {
              await this.removeFromLocal(items[i].url)
            }

            console.log(`[ImageCache] Removed ${toRemove} items from local storage to enforce size limit`)
            resolve()
          }

          request.onerror = () => {
            console.error('[ImageCache] Failed to enforce local storage limit:', request.error)
            resolve()
          }
        })
      }
      catch (error) {
        console.error('[ImageCache] Error enforcing local storage limit:', error)
      }
    }
  }

  public async get(url: string): Promise<CachedImageData | null> {
    // 首先检查内存缓存
    const memoryCached = this.cache.get(url)

    if (memoryCached) {
      console.log(`[ImageCache] Memory cache hit: ${url}`)
    }

    if (memoryCached) {
      // 检查是否过期
      if (Date.now() - memoryCached.timestamp > this.maxAge) {
        this.remove(url)
        return null
      }

      // 更新访问信息
      memoryCached.accessCount++
      memoryCached.lastAccessed = Date.now()

      // 异步更新本地存储中的访问信息
      this.saveToLocal(memoryCached).catch(console.error)

      return memoryCached
    }

    // 尝试从本地存储加载
    const localCached = await this.loadFromLocal(url)
    if (localCached) {
      // 更新访问信息
      localCached.accessCount++
      localCached.lastAccessed = Date.now()

      // 添加到内存缓存
      this.cache.set(url, localCached)

      // 异步更新本地存储
      this.saveToLocal(localCached).catch(console.error)

      return localCached
    }

    return null
  }

  public async set(url: string, data: Omit<CachedImageData, 'accessCount' | 'lastAccessed'>): Promise<void> {
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

    // 添加到内存缓存
    this.cache.set(url, cacheData)

    // 异步保存到本地存储
    this.saveToLocal(cacheData).catch(console.error)

    // 异步强制本地存储限制
    this.enforceLocalStorageLimit().catch(console.error)

    console.log(`[ImageCache] Cached image: ${url} (${data.width}x${data.height})`)
    console.log(`[ImageCache] Cache size: ${this.cache.size}/${this.maxCacheSize}`)
  }

  public async remove(url: string): Promise<boolean> {
    const cached = this.cache.get(url)
    if (cached?.imageBitmap) {
      cached.imageBitmap.close()
    }
    if (cached?.blobSrc) {
      URL.revokeObjectURL(cached.blobSrc)
    }

    const removed = this.cache.delete(url)

    // 异步从本地存储删除
    this.removeFromLocal(url).catch(console.error)

    if (removed) {
      console.log(`[ImageCache] Removed from cache: ${url}`)
    }

    return removed
  }

  public async has(url: string): Promise<boolean> {
    // 检查内存缓存
    const memoryCached = this.cache.get(url)
    if (memoryCached) {
      if (Date.now() - memoryCached.timestamp > this.maxAge) {
        this.remove(url)
        return false
      }
      return true
    }

    // 检查本地存储
    const localCached = await this.loadFromLocal(url)
    return localCached !== null
  }

  public evictLeastUsed(): void {
    if (this.cache.size === 0)
      return

    const entries = Array.from(this.cache.entries())

    const scored = entries.map(([url, data]) => {
      const now = Date.now()
      const ageScore = (now - data.timestamp) / this.maxAge
      const accessScore = 1 / (data.accessCount + 1)
      const recencyScore = (now - data.lastAccessed) / this.maxAge

      const totalScore = ageScore * 0.4 + accessScore * 0.3 + recencyScore * 0.3

      return { url, data, score: totalScore }
    })

    scored.sort((a, b) => b.score - a.score)

    const toRemove = scored.slice(0, Math.max(1, Math.floor(this.cache.size * 0.3)))
    toRemove.forEach(({ url }) => this.remove(url))

    console.log(`[ImageCache] Evicted ${toRemove.length} least used items`)
  }

  public enforceMemoryLimit(): void {
    let totalMemoryMB = 0

    for (const [, data] of this.cache) {
      const memoryMB = data.size / (1024 * 1024)
      totalMemoryMB += memoryMB
    }

    if (totalMemoryMB > this.maxMemoryMB) {
      console.warn(`[ImageCache] Memory usage ${totalMemoryMB.toFixed(1)}MB exceeds limit ${this.maxMemoryMB}MB, cleaning up...`)

      while (totalMemoryMB > this.maxMemoryMB * 0.8 && this.cache.size > 0) {
        this.evictLeastUsed()

        totalMemoryMB = 0
        for (const [, data] of this.cache) {
          const memoryMB = (data.width * data.height * 4) / (1024 * 1024)
          totalMemoryMB += memoryMB
        }
      }
    }
  }

  public async cleanupExpired(): Promise<number> {
    const now = Date.now()
    const expired: string[] = []

    // 清理内存缓存
    for (const [url, data] of this.cache) {
      if (now - data.timestamp > this.maxAge) {
        expired.push(url)
      }
    }

    expired.forEach(url => this.remove(url))

    // 清理本地存储
    const localExpiredCount = await this.cleanupLocalExpired()

    const totalExpired = expired.length + localExpiredCount

    if (totalExpired > 0) {
      console.log(`[ImageCache] Cleaned up ${totalExpired} expired items (${expired.length} from memory, ${localExpiredCount} from local storage)`)
    }

    return totalExpired
  }

  public async clear(): Promise<void> {
    // 清理内存缓存
    this.cache.forEach((cached) => {
      if (cached.imageBitmap) {
        cached.imageBitmap.close()
      }
      if (cached.blobSrc) {
        URL.revokeObjectURL(cached.blobSrc)
      }
    })
    this.cache.clear()

    // 清理本地存储
    try {
      await this.ensureDB()
      if (this.db) {
        const transaction = this.db.transaction([this.storeName], 'readwrite')
        const store = transaction.objectStore(this.storeName)
        await new Promise<void>((resolve, reject) => {
          const request = store.clear()
          request.onsuccess = () => resolve()
          request.onerror = () => reject(request.error)
        })
      }
    }
    catch (error) {
      console.error('[ImageCache] Error clearing local storage:', error)
    }

    console.log('[ImageCache] Cache cleared (memory and local storage)')
  }

  public async getStats(): Promise<{
    memory: {
      size: number
      maxSize: number
      urls: string[]
      memoryUsageMB: number
      totalAccesses: number
    }
    localStorage: {
      count: number
      sizeMB: number
      maxSizeMB: number
    }
  }> {
    let totalMemoryMB = 0
    let totalAccesses = 0

    for (const [, data] of this.cache) {
      const memoryMB = (data.width * data.height * 4) / (1024 * 1024)
      totalMemoryMB += memoryMB
      totalAccesses += data.accessCount
    }

    const localStorage = await this.getLocalStorageUsage()

    return {
      memory: {
        size: this.cache.size,
        maxSize: this.maxCacheSize,
        urls: Array.from(this.cache.keys()),
        memoryUsageMB: Math.round(totalMemoryMB * 100) / 100,
        totalAccesses,
      },
      localStorage: {
        count: localStorage.count,
        sizeMB: localStorage.sizeMB,
        maxSizeMB: this.maxLocalStorageMB,
      },
    }
  }

  public configure(options: {
    maxCacheSize?: number
    maxAge?: number
    maxMemoryMB?: number
    maxLocalStorageMB?: number
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
    if (options.maxLocalStorageMB !== undefined) {
      this.maxLocalStorageMB = options.maxLocalStorageMB
    }

    console.log('[ImageCache] Configuration updated:', {
      maxCacheSize: this.maxCacheSize,
      maxAge: this.maxAge,
      maxMemoryMB: this.maxMemoryMB,
      maxLocalStorageMB: this.maxLocalStorageMB,
    })
  }

  public startPeriodicCleanup(intervalMs: number = 5 * 60 * 1000): void {
    setInterval(async () => {
      await this.cleanupExpired()
      this.enforceMemoryLimit()
      await this.enforceLocalStorageLimit()
    }, intervalMs)

    console.log(`[ImageCache] Started periodic cleanup (every ${intervalMs / 1000}s)`)
  }

  // 预热缓存：从本地存储加载最近使用的图片到内存
  public async warmupCache(maxItems: number = 5): Promise<void> {
    try {
      await this.ensureDB()
      if (!this.db)
        return

      const transaction = this.db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const index = store.index('lastAccessed')
      const request = index.getAll()

      request.onsuccess = async () => {
        const items: StoredImageData[] = request.result

        // 按最后访问时间排序，取最近的几个
        items.sort((a, b) => b.lastAccessed - a.lastAccessed)

        const toWarmup = items.slice(0, maxItems)
        let warmedUp = 0

        for (const item of toWarmup) {
          if (this.cache.size >= this.maxCacheSize)
            break

          const cached = await this.loadFromLocal(item.url)
          if (cached) {
            this.cache.set(item.url, cached)
            warmedUp++
          }
        }

        console.log(`[ImageCache] Warmed up ${warmedUp} items from local storage`)
      }
    }
    catch (error) {
      console.error('[ImageCache] Error during cache warmup:', error)
    }
  }
}

export const imageCache = new ImageCache()
// 辅助函数：获取本地存储使用情况（用于外部调用）
export async function getLocalStorageUsage(): Promise<{ count: number, sizeMB: number }> {
  return imageCache.getLocalStorageUsage()
}
