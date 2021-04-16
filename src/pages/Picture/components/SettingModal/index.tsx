import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import {
  Button,
  FieldInput,
  FieldSwitch,
  FieldTag,
  FieldTextarea,
  IconButton,
  Modal,
} from '@app/components';
import { useDeletePicture, useSearchParamModal } from '@app/utils/hooks';
import { getPictureUrl } from '@app/utils/image';
import { Form, Formik } from 'formik';
import { omit, pick } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Trash2 } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Content } from '../../elements';
import { Footer } from './elements';

import { EditPictureSchema } from './dto';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { UpdatePicture } from '@app/graphql/mutations';
import toast from 'react-hot-toast';

interface IProps {
  picture: PictureEntity;
}
interface IValues {
  title: string;
  bio: string;
  isPrivate: boolean;
  tags: string[];
}
const SettingModal: React.FC<IProps> = ({ picture }) => {
  const client = useApolloClient();
  const { colors } = useTheme();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const { key, id } = picture;
  const [visible, close] = useSearchParamModal('setting');
  const { t } = useTranslation();
  const [del, loading] = useDeletePicture();
  const [update, updateProp] = useMutation(UpdatePicture);
  const handleOk = useCallback(
    async (values: IValues) => {
      const { data } = await update({
        variables: {
          id,
          data: values,
        },
      });
      client.writeFragment({
        id: `Picture:${id}`,
        fragment: gql`
          fragment PictureBaseFragment on Picture {
            title
            bio
            isPrivate
          }
        `,
        data: {
          ...omit(data.updatePicture, 'tags'),
        },
      });
      client.writeFragment({
        id: `Picture:${id}`,
        fragment: gql`
          fragment PictureDetailFragment on Picture {
            tags
          }
        `,
        data: {
          tags: data.updatePicture.tags,
        },
      });
      toast.success(t('picture.edit.success'));
    },
    [client, id, t, update],
  );
  const deletePicture = useCallback(() => del(id), [del, id]);
  return (
    <Modal maxWidth={560} centered visible={visible} onClose={() => close()}>
      <Modal.Background background={getPictureUrl(key, 'blur')} />
      <Modal.Content>
        <Modal.Title>{t('picture.edit.title')}</Modal.Title>
        <Content>
          <Formik<IValues>
            initialValues={{
              ...pick(picture, ['title', 'bio', 'isPrivate']),
              tags: picture.tags.map(tag => tag.name),
            }}
            onSubmit={handleOk}
            validationSchema={EditPictureSchema(t)}
          >
            <Form>
              <FieldInput
                required
                name="title"
                label={t('label.picture_title') as string}
              />
              <FieldTextarea
                name="bio"
                label={t('label.picture_bio') as string}
              />
              <FieldTag name="tags" />
              <FieldSwitch
                name="isPrivate"
                label={t('label.private')}
                bio={t('picture.label.privateBio')}
              />
              <div style={{ height: '12px' }} />
              <Footer>
                <div>
                  <IconButton onClick={() => setConfirmVisible(true)}>
                    <Trash2 color={colors.error} />
                  </IconButton>
                </div>
                <div>
                  <Button htmlType="submit">{t('picture.edit.confirm')}</Button>
                </div>
              </Footer>
            </Form>
          </Formik>
        </Content>
        <Modal.Confirm
          visible={confirmVisible}
          onClose={() => setConfirmVisible(false)}
          onConfirm={deletePicture}
          confirmText={t('picture.label.delete')}
          confirmButtonProps={{
            danger: true,
            icon: <Trash2 size={16} />,
            loading: loading,
          }}
          title={t('picture.label.deleteTitle')}
        />
      </Modal.Content>
    </Modal>
  );
};

export default SettingModal;
