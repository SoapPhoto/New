import { useSearchParamModal } from '@app/utils/hooks';
import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';
import * as Yup from 'yup';

import { Button, FieldInput, Modal } from '..';
import { FormBox } from './elements';

type ValueType = string | number | undefined;

export interface IEXIFEditValues {
  make: ValueType;
  model: ValueType;
  focalLength: ValueType;
  aperture: ValueType;
  exposureTime: ValueType;
  ISO: ValueType;
}

interface IProps {
  initialValues: Partial<IEXIFEditValues>;
}

const initValue = {
  make: '',
  model: '',
  focalLength: undefined,
  aperture: undefined,
  exposureTime: '',
  ISO: undefined,
};
const EditExifModal: React.FC<IProps> = ({ initialValues }) => {
  const [visible, close] = useSearchParamModal('editExif', 'modal-child');
  const { t } = useTranslation();
  return (
    <Modal
      destroyOnClose
      maxWidth={560}
      centered
      visible={visible}
      onClose={() => close()}
    >
      <Modal.Title>图片信息修改</Modal.Title>
      <Modal.Content>
        <Formik<IEXIFEditValues>
          validationSchema={Yup.object().shape({
            ISO: Yup.number().typeError('请输入数字'),
            aperture: Yup.number().typeError('请输入数字'),
            focalLength: Yup.number().typeError('请输入数字'),
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
                  label={t(`picture.info.${value}`) as string}
                />
              ))}
            </FormBox>
            <div
              css={css`
                width: 100%;
                padding: 24px;
                padding-top: 0;
              `}
            >
              <Button
                css={css`
                  width: 100%;
                `}
                htmlType="submit"
              >
                修改
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default EditExifModal;
