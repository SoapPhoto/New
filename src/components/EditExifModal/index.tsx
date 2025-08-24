import { useSearchParamModal } from '@app/utils/hooks'
import { Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { FieldInput } from '..'
import Button from '../Button'
import Modal from '../Modal'
import { EditBtnBox, FormBox } from './elements'

type ValueType = string | number | undefined

export interface IEXIFEditValues {
  make: ValueType
  model: ValueType
  FocalLength: ValueType
  FNumber: ValueType
  ExposureTime: ValueType
  ISO: ValueType
}

interface IProps {
  initialValues: Partial<IEXIFEditValues>
}

const initValue = {
  make: '',
  model: '',
  FocalLength: undefined,
  FNumber: undefined,
  ExposureTime: '',
  ISO: undefined,
}
const EditExifModal: React.FC<IProps> = ({ initialValues }) => {
  const [visible, close] = useSearchParamModal('editExif', 'modal-child')
  const { t } = useTranslation()
  return (
    <Modal
      destroyOnClose
      maxWidth={560}
      closable
      centered
      visible={visible}
      onClose={() => close()}
    >
      <Modal.Title>{t('picture.editExif.title')}</Modal.Title>
      <Modal.Content>
        <Formik<IEXIFEditValues>
          validationSchema={Yup.object().shape({
            ISO: Yup.number().typeError(t('validation.yup_number')),
            Aperture: Yup.number().typeError(t('validation.yup_number')),
            FNumber: Yup.number().typeError(t('validation.yup_number')),
          })}
          initialValues={{
            ...initValue,
            ...initialValues,
          }}
          onSubmit={value => console.log(value)}
        >
          <Form>
            <FormBox>
              {Object.keys(initValue).map((value: string) => (
                <FieldInput
                  key={value}
                  name={value}
                  disabled
                  label={t(`picture.info.${value}` as any) as string}
                />
              ))}
            </FormBox>
            <EditBtnBox>
              <Button style={{ width: '100%' }} htmlType="submit">
                {t('picture.editExif.confirmBtn')}
              </Button>
            </EditBtnBox>
          </Form>
        </Formik>
      </Modal.Content>
    </Modal>
  )
}

export default EditExifModal
