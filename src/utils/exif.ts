import exifr from 'exifr'
import { $enum } from 'ts-enum-util'

export interface IEXIF {
  orientation?: number
  meteringMode?: string
  exposureMode?: string
  exposureBias?: string
  date?: string
  software?: string
  location?: [number, number]
  make?: string
  model?: string
  focalLength?: string
  aperture?: string
  exposureTime?: string
  ISO?: string
  lensModel?: string
  whiteBalance?: string
  [key: string]: any
}

export enum ExifProperties {
  Model = 'model',
  Make = 'make',
  FocalLength = 'focalLength',
  FNumber = 'aperture',
  ExposureTime = 'exposureTime',
  ISO = 'ISO',
  MeteringMode = 'meteringMode',
  ExposureProgram = 'exposureMode',
  ExposureCompensation = 'exposureBias',
  DateTimeOriginal = 'date',
  Software = 'software',
  Orientation = 'orientation',
  LensModel = 'lensModel',
  WhiteBalance = 'whiteBalance',
}

export async function getImageEXIF(image: File): Promise<IEXIF | undefined> {
  const filterArr = [
    'tz',
    'tzSource',
    'Orientation',
    'Make',
    'Model',
    'Software',
    'Artist',
    'Copyright',
    'ExposureTime',

    'FNumber',
    'ExposureProgram',
    'ISO',
    'OffsetTime',
    'OffsetTimeOriginal',
    'OffsetTimeDigitized',
    'ShutterSpeedValue',
    'ApertureValue',
    'BrightnessValue',
    'ExposureCompensationSet',
    'ExposureCompensationMode',
    'ExposureCompensationSetting',

    'ExposureCompensation',
    'MaxApertureValue',
    'LightSource',
    'Flash',
    'FocalLength',

    'ColorSpace',
    'ExposureMode',
    'FocalLengthIn35mmFormat',
    'SceneCaptureType',
    'LensMake',
    'LensModel',
    'MeteringMode',
    'WhiteBalance',
    'WBShiftAB',
    'WBShiftGM',
    'WhiteBalanceBias',
    'WhiteBalanceFineTune',
    'FlashMeteringMode',
    'SensingMethod',
    'FocalPlaneXResolution',
    'FocalPlaneYResolution',

    'Aperture',
    'ScaleFactor35efl',
    'ShutterSpeed',
    'LightValue',
    'Rating',
    // GPS
    'GPSAltitude',
    'GPSCoordinates',
    'GPSAltitudeRef',
    'GPSLatitude',
    'GPSLatitudeRef',
    'GPSLongitude',
    'GPSLongitudeRef',
    // HDR相关字段
    'MPImageType',
  ]
  const [gps, data, orientation] = await Promise.all([
    exifr.gps(image),
    exifr.parse(image, filterArr),
    exifr.orientation(image),
  ])
  if (data) {
    const exif: IEXIF = {
      ...data,
    }
    if (gps && !Number.isNaN(gps.latitude)) {
      exif.location = [gps.longitude, gps.latitude]
    }
    if (orientation) {
      exif.orientation = orientation
    }
    return exif
  }
}
