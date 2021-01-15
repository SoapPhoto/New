import { Toast } from '@app/components';
import { MutableRefObject, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getImageInfo, IImageInfo, isImage } from '../image';

export default function useImageInfo(
  imageRef: MutableRefObject<File | undefined>,
): [IImageInfo | undefined, string | undefined, (file: File) => void] {
  const [info, setInfo] = useState<IImageInfo>();
  const [thumbnail, setThumbnail] = useState<string>();
  const { t } = useTranslation();
  const getInfo = async () => {
    const [data, url, base64] = await getImageInfo(imageRef.current!);
    console.log(base64);
    setInfo(data);
    setThumbnail(url);
  };
  const setFile = (file: File) => {
    if (isImage(file.name)) {
      imageRef.current = file;
      getInfo();
    } else {
      Toast.warning(t('upload.message.image_format_error') as string);
    }
  };
  return [info, thumbnail, setFile];
}
