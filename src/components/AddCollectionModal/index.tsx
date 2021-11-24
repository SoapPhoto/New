import { useMutation } from '@apollo/client';
import { CreateCollectionDot } from '@app/common/types/modules/collection/dto/collection.dto';
import { AddCollection } from '@app/graphql/mutations';
import { useSearchParamModal } from '@app/utils/hooks';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { css } from 'styled-components/macro';
import { CollectionEntity } from '@app/common/types/modules/collection/collection.entity';
import { FieldInput, FieldSwitch, FieldTextarea } from '..';
import Button from '../Button';
import Modal from '../Modal';

type IValues = CreateCollectionDot;

interface IProps {
  onOk?: (collection: CollectionEntity) => void
}

const AddCollectionModal: React.FC<IProps> = ({ onOk }) => {
  const [addCollection] = useMutation<{ addCollection: CollectionEntity }>(AddCollection);
  const [okLoading, setOkLoading] = useState(false);
  const [visible, close] = useSearchParamModal('addCollection', 'modal-child');
  useEffect(() => {
    setOkLoading(false);
  }, []);
  const onSubmit = async (values: IValues, { setSubmitting }: FormikHelpers<IValues>) => {
    setOkLoading(true);
    setSubmitting(true);
    const { data } = await addCollection({
      variables: {
        data: values,
      },
    });
    close();
    if (onOk) {
      onOk(data!.addCollection);
    }
  };
  return (
    <Modal
      maxWidth={400}
      visible={visible}
      centered
      onClose={() => {
        close();
      }}
    >
      <Modal.Title>新增收藏夹</Modal.Title>
      <Modal.Content>
        <div css={css`padding: 24px;padding-top: 0;`}>
          <Formik<IValues>
            initialValues={{
              name: '',
              bio: '',
              isPrivate: false,
            }}
            onSubmit={onSubmit}
            validationSchema={
              Yup.object().shape({
                name: Yup.string()
                  .min(1, '收藏夹名称不能小于1个字符')
                  .max(26, '收藏夹名称不能大于26个字符')
                  .required('请输入收藏夹名称'),
              })
            }
          >
            {({
              isSubmitting,
            }) => (
              <Form>
                <FieldInput
                  label="收藏夹名称"
                  name="name"
                />
                <FieldTextarea
                  label="收藏夹简介"
                  minRows={3}
                  name="bio"
                />
                <FieldSwitch
                  label="私人"
                  bio="仅自己可见"
                  name="isPrivate"
                />
                <Button
                  style={{
                    width: '100%',
                    marginTop: 24,
                  }}
                  htmlType="submit"
                  type="primary"
                  loading={okLoading}
                  disabled={isSubmitting}
                >
                  新增收藏夹
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default AddCollectionModal;
