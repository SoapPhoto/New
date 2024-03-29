/* eslint-disable no-async-promise-executor */
import { FastAverageColor } from 'fast-average-color';
import isString from 'lodash/isString';
import { encode } from 'blurhash';

import { isWebp } from './mixed';
import { getImageEXIF, IEXIF } from './exif';

export interface IImageInfo {
  exif: IEXIF;
  color: string;
  isDark: boolean;
  height: number;
  width: number;
  make?: string;
  model?: string;
  blurhash?: string;
}

export const pictureStyle = {
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
};

export type PictureStyle = keyof typeof pictureStyle;

/**
 * 获取图片链接
 *
 * @export
 * @param {string} key
 * @param {PictureStyle} [style='regular']
 * @param {boolean} [webp=true]
 * @returns
 */
export function getPictureUrl(
  key: string,
  style: PictureStyle = 'regular',
  webp = true,
) {
  let styleName = pictureStyle[style];
  if (isWebp && webp) {
    styleName += '_webp';
  }
  if (/default.svg$/.test(key)) {
    return `${key}`;
  }
  if (/^\/\/cdn/.test(key)) {
    return `${key}${styleName}`;
  }
  if (/^blob:/.test(key)) {
    return key;
  }
  if (/\/\//.test(key)) {
    return key;
  }
  if (/^photo\//.test(key)) {
    return `//cdn-oss.soapphoto.com/${key}${styleName}`;
  }
  return `//cdn-oss.soapphoto.com/photo/${key}${styleName}`;
}
/**
 * 判断文件是否是图片格式
 *
 * @export
 * @param {string} fileName
 * @returns
 */
export function isImage(fileName: string) {
  const imgType = ['jpg', 'jpeg', 'png'];
  const ext = fileName.split('.').pop()!;
  console.log(ext);
  return imgType.indexOf(ext.toLocaleLowerCase()) >= 0;
}

export function getImageMinSize(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
) {
  // 目标尺寸
  let targetWidth = width;
  let targetHeight = height;
  // 图片尺寸超过400x400的限制
  if (width > maxWidth || height > maxHeight) {
    if (width / height > maxWidth / maxHeight) {
      // 更宽，按照宽度限定尺寸
      targetWidth = maxWidth;
      targetHeight = Math.round(maxWidth * (height / width));
    } else {
      targetHeight = maxHeight;
      targetWidth = Math.round(maxHeight * (width / height));
    }
  }
  return [targetWidth, targetHeight];
}

export function previewImage(
  img: HTMLImageElement,
  minSize = 600,
  orientation?: number,
  isBase64 = false,
): Promise<string> {
  return new Promise((resolve) => {
    const [width, height] = getImageMinSize(
      img.naturalWidth,
      img.naturalHeight,
      minSize,
      minSize,
    );
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    switch (orientation) {
      case 2:
        canvas.width = width;
        canvas.height = height;
        // horizontal flip
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        break;
      case 3:
        canvas.width = width;
        canvas.height = height;
        // 180 graus
        ctx.translate(width / 2, height / 2);
        ctx.rotate((180 * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
        break;
      case 4:
        canvas.width = width;
        canvas.height = height;
        // vertical flip
        ctx.translate(0, height);
        ctx.scale(1, -1);
        break;
      case 5:
        // vertical flip + 90 rotate right
        canvas.height = width;
        canvas.width = height;
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
      case 6:
        canvas.width = height;
        canvas.height = width;
        // 90 graus
        ctx.translate(height / 2, width / 2);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
        break;
      case 7:
        // horizontal flip + 90 rotate right
        canvas.height = width;
        canvas.width = height;
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(width, -height);
        ctx.scale(-1, 1);
        break;
      case 8:
        canvas.height = width;
        canvas.width = height;
        // -90 graus
        ctx.translate(height / 2, width / 2);
        ctx.rotate((-90 * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
        break;
      default:
        canvas.width = width;
        canvas.height = height;
    }
    ctx.drawImage(img, 0, 0, width, height);
    if (isBase64) {
      resolve(canvas.toDataURL());
    } else {
      canvas.toBlob((blob) => {
        resolve(window.URL.createObjectURL(blob!));
      });
    }
  });
}

export async function getImageColor(img: HTMLImageElement) {
  const fac = new FastAverageColor();
  const color = await fac.getColorAsync(img);
  return color;
}

export function getImageBlurhash(
  data: string | HTMLImageElement,
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    let img: HTMLImageElement;
    if (isString(data)) {
      img = new Image();
      img.src = data;
    } else {
      img = data;
    }
    const set = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(img.src);
      const imageData = ctx.getImageData(0, 0, width, height);
      const blurhash = encode(imageData.data, width, height, 4, 3);
      resolve(blurhash);
    };
    if (img.complete) {
      set();
    } else {
      img.onload = async () => {
        set();
      };
    }
  });
}

/**
 * 获取图片详细信息
 *
 * @export
 * @param {File} image
 * @returns {Promise<[IImageInfo, string, string]>}
 */
export async function getImageInfo(
  image: File,
): Promise<[IImageInfo, string, string]> {
  return new Promise(async (res) => {
    const info: IImageInfo = {
      exif: {},
      color: '#fff',
      isDark: false,
      height: 0,
      width: 0,
      make: undefined,
      model: undefined,
    };
    const imgSrc = window.URL.createObjectURL(image);
    const imgHtml = document.createElement('img');
    imgHtml.src = imgSrc;
    const exif = await getImageEXIF(image);
    if (exif) {
      info.exif = exif;
      info.make = exif.make;
      info.model = exif.model;
    }
    let previewSrc: string;
    let previewBase64: string;
    const setPreviewImage = async () => {
      info.height = imgHtml.naturalHeight;
      info.width = imgHtml.naturalWidth;
      if (info.exif && info.exif.orientation) {
        // 有翻转的长宽对调
        if (info.exif.orientation >= 5) {
          info.height = imgHtml.naturalWidth;
          info.width = imgHtml.naturalHeight;
        }
      }
      [previewSrc, previewBase64] = await Promise.all([
        previewImage(imgHtml, 800, info.exif.orientation),
        previewImage(imgHtml, 300, info.exif.orientation, true),
      ]);
    };
    const setColor = async () => {
      const colorData = await getImageColor(imgHtml);
      info.isDark = colorData.isDark;
      info.color = colorData.hex;
    };
    const setBlurhash = async () => {
      const blurhash = await getImageBlurhash(previewBase64);
      info.blurhash = blurhash;
    };
    const setInfo = async () => {
      await Promise.all([setPreviewImage(), setColor()]);
      await setBlurhash();
      res([info, previewSrc!, previewBase64!]);
    };
    if (imgHtml.complete) {
      setInfo();
    } else {
      imgHtml.onload = async () => {
        setInfo();
      };
    }
  });
}
