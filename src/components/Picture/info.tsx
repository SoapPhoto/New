import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import type { FC } from 'react'
import { getImageFormat } from '@app/utils/image'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { handleHover } from './elements'
import {
  CarbonIsoOutline,
  MaterialSymbolsShutterSpeed,
  StreamlineImageAccessoriesLensesPhotosCameraShutterPicturePhotographyPicturesPhotoLens,
  TablerAperture,
} from './icon'

// 样式组件
const Wrapper = styled.div`
  position: absolute;
  overflow: hidden;
  inset: 0;
`

const InfoWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  opacity: 0;
  padding: 16px;
  ${handleHover}
`

const GradientOverlay = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent);
  opacity: 0;
  transition: opacity 300ms;
  ${handleHover}
`

const Title = styled.h3`
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
  transition: opacity 300ms;
  color: #fff;
  font-weight: 600;
`

// EXIF 数据类型定义
interface ExifData {
  focalLength35mm: number | null
  iso: string | number | null
  shutterSpeed: string | null
  aperture: string | null
}

// EXIF 项组件接口
interface ExifItemProps {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label?: string
}

// EXIF 显示项组件
const ExifItem: FC<ExifItemProps> = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
    <Icon className="text-white/70" />
    <span className="text-white/90">
      {label && `${label} `}
      {value}
    </span>
  </div>
)

// 基本信息项组件
const BasicInfoItem: FC<{ children: React.ReactNode }> = ({ children }) => (
  <span>{children}</span>
)

// 组件主体接口
interface InfoProps {
  picture: PictureEntity
}

export const Info: FC<InfoProps> = ({ picture }) => {
  // 使用 useMemo 优化 EXIF 数据处理
  const exifData = useMemo((): ExifData => {
    const { exif } = picture

    if (!exif) {
      return {
        focalLength35mm: null,
        iso: null,
        shutterSpeed: null,
        aperture: null,
      }
    }

    // 等效焦距处理
    const focalLength35mm = exif.FocalLengthIn35mmFormat
      ?? exif.FocalLength
      ?? exif.focalLength
      ?? null

    // ISO 处理
    const iso = exif.ISO ?? null

    // 快门速度处理
    let shutterSpeed: string | null = null
    if (exif.ExposureTime) {
      const exposureTime = Number(exif.ExposureTime)
      shutterSpeed = exposureTime >= 1
        ? `${exposureTime}s`
        : `1/${Math.round(1 / exposureTime)}s`
    }
    else if (exif.exposureTime) {
      shutterSpeed = String(exif.exposureTime)
    }

    // 光圈处理
    const aperture = exif.FNumber
      ? `f/${exif.FNumber}`
      : exif.aperture
        ? `f/${exif.aperture}`
        : null

    return {
      focalLength35mm: focalLength35mm ? Number(focalLength35mm) : null,
      iso,
      shutterSpeed,
      aperture,
    }
  }, [picture.exif])

  // 格式化文件大小
  const formattedSize = useMemo(() =>
    (picture.size / 1024 / 1024).toFixed(1), [picture.size])

  // 获取图片格式
  const imageFormat = useMemo(() =>
    getImageFormat(picture.originalname) || 'JPG', [picture.originalname])

  // EXIF 项配置
  const exifItems = useMemo(() => [
    {
      key: 'focalLength',
      condition: exifData.focalLength35mm,
      icon: StreamlineImageAccessoriesLensesPhotosCameraShutterPicturePhotographyPicturesPhotoLens,
      value: `${exifData.focalLength35mm}mm`,
    },
    {
      key: 'aperture',
      condition: exifData.aperture,
      icon: TablerAperture,
      value: exifData.aperture!,
    },
    {
      key: 'shutterSpeed',
      condition: exifData.shutterSpeed,
      icon: MaterialSymbolsShutterSpeed,
      value: exifData.shutterSpeed!,
    },
    {
      key: 'iso',
      condition: exifData.iso,
      icon: CarbonIsoOutline,
      value: `ISO ${exifData.iso}`,
    },
  ].filter(item => item.condition), [exifData])

  return (
    <Wrapper>
      <GradientOverlay />
      <InfoWrapper>
        <Title>{picture.title}</Title>

        {/* 基本信息 */}
        <div className="mb-2 flex flex-wrap gap-2 text-xs text-white/80">
          <BasicInfoItem>{imageFormat}</BasicInfoItem>
          <span>•</span>
          <BasicInfoItem>
            {picture.width}
            {' '}
            ×
            {picture.height}
          </BasicInfoItem>
          <span>•</span>
          <BasicInfoItem>
            {formattedSize}
            MB
          </BasicInfoItem>
          {picture.make && (
            <>
              <span>•</span>
              <BasicInfoItem>{picture.make}</BasicInfoItem>
            </>
          )}
        </div>

        {/* 标签 */}
        {picture.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {picture.tags.map(tag => (
              <Link
                key={tag.id}
                className="rounded-full bg-white/20! px-2 py-0.5 text-xs text-white/90! backdrop-blur-sm"
                to={`/tag/${tag.name}`}
                onClick={e => e.stopPropagation()}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* EXIF 信息 */}
        {exifItems.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pb-4 text-xs @[600px]:grid-cols-4 mt-4">
            {exifItems.map(item => (
              <ExifItem
                key={item.key}
                icon={item.icon}
                value={item.value}
              />
            ))}
          </div>
        )}
      </InfoWrapper>
    </Wrapper>
  )
}
