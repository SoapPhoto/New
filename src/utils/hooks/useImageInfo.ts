import type { BaiduClassify } from '@app/common/types/shared/baidu/interface/baidu.interface'
import type { MutableRefObject } from 'react'
import type { IImageInfo } from '../image'
import { imageClassify } from '@app/services/picture'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { useTranslation } from 'react-i18next'
import { getImageInfo, isImage } from '../image'

export default function useImageInfo(
  imageRef: MutableRefObject<File | undefined>,
): [
    IImageInfo | undefined,
    string | undefined,
    (file: File) => void,
    () => void,
    BaiduClassify[] | undefined,
] {
  const [info, setInfo] = useState<IImageInfo>()
  const [thumbnail, setThumbnail] = useState<string>()
  const [base64, setBase64] = useState<string>()
  const [classify, setClassify] = useState<BaiduClassify[]>()
  const { t } = useTranslation()
  const getInfo = async () => {
    const [data, url, base64Data] = await getImageInfo(imageRef.current!)
    setBase64(base64Data)
    setInfo(data)
    setThumbnail(url)
  }
  const getImageClassify = async () => {
    const { data } = await imageClassify(base64!)
    if (data) {
      setClassify(data)
    }
  }
  useEffect(() => {
    if (base64) {
      getImageClassify()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base64])
  const setFile = (file: File) => {
    if (isImage(file.name)) {
      imageRef.current = file
      getInfo()
    }
    else {
      toast.error(t('upload.message.image_format_error'))
    }
  }
  const clear = () => {
    setThumbnail(undefined)
    setInfo(undefined)
    setClassify(undefined)
    setBase64(undefined)

    imageRef.current = undefined
  }
  return [info, thumbnail, setFile, clear, classify]
}
