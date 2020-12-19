import { isWebp } from './mixed';

export const pictureStyle = {
  full: '@!full',
  small: '@!small',
  regular: '@!regular',
  thumb: '@!thumbnail',
  blur: '@!thumbnailBlur',
  itemprop: '@!itemprop',
  thumbSmall: '@!thumbnailSmall',
  ico: '@!ico',
};

export type PictureStyle = keyof typeof pictureStyle;

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
