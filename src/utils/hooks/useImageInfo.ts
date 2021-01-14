import { Toast } from '@app/components';
import { MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { getImageEXIF } from '../exif';

import { isImage } from '../image';

export default function useImageInfo(
  imageRef: MutableRefObject<File | undefined>,
) {
  const { t } = useTranslation();
  const setFile = (file: File) => {
    if (isImage(file.name)) {
      imageRef.current = file;
      getImageEXIF(file);
    } else {
      Toast.warning(t('upload.message.image_format_error') as string);
    }
  };
  return [setFile];
}
