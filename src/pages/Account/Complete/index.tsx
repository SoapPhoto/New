import type { FormikHelpers, FormikProps } from 'formik'
import { FieldInput } from '@app/components'
import Button from '@app/components/Button'
import { useAccount } from '@app/stores/hooks'
import { FormikValidationFilter } from '@app/utils/error'
import useUrlQuery from '@app/utils/hooks/useUrlQuery'
import { isEmpty } from 'es-toolkit/compat'
import { Formik } from 'formik'
import { observer } from 'mobx-react'
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { animated, useSpring } from 'react-spring'
import { Des, Title } from '../elements'

interface IValues {
  username: string
  name: string
}

const a = animated as any

function isUserName(number: string) {
  const reg = /^(?=.*[A-z]|\d*_+\d*)\w{2,15}$/
  return reg.test(number)
}

function AuthCompletePage() {
  const navigate = useNavigate()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { activeUser } = useAccount()
  const timer = useRef<number>(null)
  const { code } = useUrlQuery()
  const formRef = useRef<FormikProps<IValues>>(null)
  const [props, animate] = useSpring(() => ({
    opacity: 0,
    transform: 'translateX(-5%)',
  }))
  useEffect(() => {
    timer.current = window.setTimeout(() => {
      animate.start({
        opacity: 1,
        transform: 'translateX(0%)',
      })
    }, 100)
    return () => { animate.stop(); clearTimeout(timer.current!) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const validate = useCallback((values: IValues) => {
    if (isEmpty(values.username)) {
      return {
        username: '请填写用户名!',
      }
    }
    if (!isUserName(values.username)) {
      return {
        username: '请填写正确用户名!',
      }
    }
    return {}
  }, [])
  const handleOk = async (value: IValues, { setSubmitting }: FormikHelpers<IValues>) => {
    setSubmitting(true)
    setConfirmLoading(true)
    try {
      await activeUser({
        ...value,
        code: code as string,
      })
      setTimeout(async () => {
        navigate('/', { replace: true })
      }, 400)
    }
    catch (err: any) {
      if (err.message === 'no_info') {
        toast.error('验证信息已过期，请返回登录页面重新登录')
      }

      formRef.current?.setErrors(FormikValidationFilter<IValues>(err))
      setConfirmLoading(false)
      setSubmitting(false)
    }
  }
  return (
    <a.div style={props}>
      <Title>完善账号信息</Title>
      <Des>
        完善即可完成注册。
      </Des>
      <Formik<IValues>
        initialValues={{
          username: '',
          name: '',
        }}
        validate={validate}
        onSubmit={handleOk}
        innerRef={formRef as any}
        isInitialValid
      >
        {({
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FieldInput
              required
              name="username"
              label="用户名（登录名）"
            />
            <FieldInput
              style={{ marginTop: 24 }}
              name="name"
              label="昵称（显示的名称）"
            />
            <Button
              type="primary"
              style={{ marginTop: 42, width: '100%' }}
              htmlType="submit"
              loading={confirmLoading}
              disabled={isSubmitting}
            >
              完成注册
            </Button>
          </form>
        )}
      </Formik>
    </a.div>
  )
}

export default observer(AuthCompletePage)
