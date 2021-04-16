import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const EditPictureSchema = (t: TFunction) =>
  Yup.object().shape({
    title: Yup.string().required('请输入标题'),
  });
