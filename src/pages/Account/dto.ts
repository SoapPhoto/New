import type { TFunction } from 'i18next'
import * as Yup from 'yup'

function baseSchema(t: TFunction) {
  return {
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
  }
}

export function LoginSchema(t: TFunction) {
  return Yup.object().shape({
    ...baseSchema(t),
  })
}

export function RegisterSchema(t: TFunction) {
  return Yup.object().shape({
    email: Yup.string()
      .email(t('validation.yup_format', { name: t('label.email') }))
      .required(t('validation.yup_required', { name: t('label.email') })),
    ...baseSchema(t),
  })
}
