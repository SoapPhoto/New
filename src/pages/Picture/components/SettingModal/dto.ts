import type { TFunction } from 'i18next'
import * as Yup from 'yup'

export function EditPictureSchema(t: TFunction) {
  return Yup.object().shape({
    title: Yup.string().required('请输入标题'),
  })
}
