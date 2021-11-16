import { MutableRefObject, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { getImageInfo, IImageInfo, isImage } from '../image';

export default function useImageInfo(
  imageRef: MutableRefObject<File | undefined>,
): [
    IImageInfo | undefined,
    string | undefined,
    (file: File) => void,
    () => void,
  ] {
  const [info, setInfo] = useState<IImageInfo>();
  const [thumbnail, setThumbnail] = useState<string>();
  const { t } = useTranslation();
  const getInfo = async () => {
    const [data, url] = await getImageInfo(imageRef.current!);
    setInfo(data);
    setThumbnail(url);
  };
  const setFile = (file: File) => {
    if (isImage(file.name)) {
      imageRef.current = file;
      getInfo();
    } else {
      toast.error(t('upload.message.image_format_error'));
    }
  };
  const clear = () => {
    setThumbnail(undefined);
    setInfo(undefined);
    imageRef.current = undefined;
  };
  return [info, thumbnail, setFile, clear];
}
