import type { FormikHelpers } from 'formik'
import Button from '@app/components/Button'
import { FieldInput } from '@app/components/Formik'

import Head from '@app/components/Head'
import { newPassword as newPass, resetPassword } from '@app/services/auth'
import { useAccount } from '@app/stores/hooks'
import { Formik } from 'formik'
import { isArray } from 'lodash'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'

const Title = styled.h2`
  font-weight: 600;
  margin-bottom: 24px;
`

function ResetPasswordSchema(isPassword: boolean) {
  const initData: any = {
    newPassword: Yup.string()
      .min(8, '请输入正确的密码')
      .max(26, '请输入正确的密码')
      .required('请输入正确的密码'),
    repeatPassword: Yup.string()
      .min(8, '请输入正确的密码')
      .max(26, '请输入正确的密码')
      .required('请输入正确的密码'),
  }
  if (isPassword) {
    initData.password = Yup.string()
      .min(8, '请输入正确的密码')
      .max(26, '请输入正确的密码')
      .required('请输入正确的密码')
  }
  return Yup.object().shape(initData)
}

function ResetPasswordPage() {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { userInfo } = useAccount()
  const { t } = useTranslation()
  const initForm = {
    password: '',
    newPassword: '',
    repeatPassword: '',
  }
  const onSubmit = useCallback(async (values, { setFieldError, setSubmitting }: FormikHelpers<any>) => {
    const { newPassword, repeatPassword, password } = values
    if (newPassword !== repeatPassword) {
      toast.error('两次密码输入不一致')
    }
    setConfirmLoading(true)
    setSubmitting(false)
    try {
      if (userInfo!.isPassword) {
        await resetPassword({ password, newPassword })
      }
      else {
        await newPass({ newPassword })
      }
      toast.success('修改成功，请重新登录')

      setTimeout(() => window.location.href = '/login', 1000)
    }
    catch (error: any) {
      setSubmitting(true)
      setConfirmLoading(false)
      const { message } = error as any
      if (isArray(message)) {
        message.forEach((err) => {
          if (err.param === 'password' && err.message[0] === 'password_error') {
            toast.error('旧密码错误')
          }
          setFieldError(
            err.param,
            t(`backend_error.${err.message[0]}` as any, {
              defaultValue: err.message[0],
            }) as string,
          )
        })
      }
      else {
        toast.error(message)
      }
    }
  }, [t, userInfo])
  return (
    <div>
      <Head title="重置密码" />
      <Title>{t('setting.menu.resetPassword')}</Title>
      <Formik
        initialValues={initForm}
        onSubmit={onSubmit}
        validationSchema={ResetPasswordSchema(userInfo!.isPassword)}
      >
        {({
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {
              userInfo!.isPassword && (
                <FieldInput
                  type="password"
                  name="password"
                  label="旧密码"
                />
              )
            }
            <FieldInput
              type="password"
              name="newPassword"
              label="新密码"
            />
            <FieldInput
              type="password"
              name="repeatPassword"
              label="确认新密码"
            />
            <div css={css`display: flex;justify-content: flex-end;`}>
              <Button
                type="primary"
                style={{ width: 'auto' }}
                htmlType="submit"
                loading={confirmLoading}
              >
                更改密码
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default ResetPasswordPage
