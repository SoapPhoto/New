import { TFunction } from 'i18next';
import * as Yup from 'yup';

const baseSchema = (t: TFunction) => ({
  username: Yup.string()
    .min(
      1,
      t('validation.yup_longer', {
        name: t('label.username'),
        length: 1,
      }),
    )
    .max(
      26,
      t('validation.yup_greater', {
        name: t('label.username'),
        length: 26,
      }),
    )
    .required(t('validation.yup_required', { name: t('label.username') })),
  password: Yup.string()
    .min(
      8,
      t('validation.yup_longer', {
        name: t('label.password'),
        length: 8,
      }),
    )
    .max(
      26,
      t('validation.yup_greater', {
        name: t('label.password'),
        length: 26,
      }),
    )
    .required(t('validation.yup_required', { name: t('label.password') })),
});

export const LoginSchema = (t: TFunction) =>
  Yup.object().shape({
    ...baseSchema(t),
  });
