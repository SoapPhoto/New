import exifr from 'exifr';
import { $enum } from 'ts-enum-util';

export interface IEXIF {
  orientation?: number;
  meteringMode?: string;
  exposureMode?: string;
  exposureBias?: string;
  date?: string;
  software?: string;
  location?: [number, number];
  make?: string;
  model?: string;
  focalLength?: string;
  aperture?: string;
  exposureTime?: string;
  ISO?: string;
  lensModel?: string;
  whiteBalance?: string;
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
    'Model',
    'Make',
    'FocalLength',
    'FNumber',
    'ExposureTime',
    'ISO',
    'MeteringMode',
    'ExposureMode',
    'ExposureProgram',
    'ExposureCompensation',
    'DateTimeOriginal',
    'Software',
    'LensModel',
    'WhiteBalance',
  ];
  const [gps, data, orientation] = await Promise.all([
    exifr.gps(image),
    exifr.parse(image, filterArr),
    exifr.orientation(image),
  ]);
  if (data) {
    const exif: IEXIF = {};
    $enum(ExifProperties).forEach((value, content) => {
      if (value === ExifProperties.ExposureTime) {
        if (data[content]) {
          if (data[content] >= 1) {
            exif[value] = data[content];
          } else {
            exif[value] = `1/${Math.round(1 / data[content])}`;
          }
        }
      } else if (data[content]) {
        exif[value] = data[content];
      }
    });
    if (gps && !Number.isNaN(gps.latitude)) {
      exif.location = [gps.longitude, gps.latitude];
    }
    if (orientation) {
      exif.orientation = orientation;
    }
    return exif;
  }
}
