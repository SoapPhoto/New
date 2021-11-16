import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  FastField,
  Field,
  Form, Formik, FormikProps, setIn, useFormikContext,
} from 'formik';
import { omit, pick } from 'lodash';
import { Trash2 } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import {
  FieldInput,
  FieldSwitch,
  FieldTag,
  FieldTextarea,
} from '@app/components';
import { useDeletePicture, useSearchParamModal } from '@app/utils/hooks';
import { getPictureUrl } from '@app/utils/image';
import { UpdatePicture } from '@app/graphql/mutations';
import Modal from '@app/components/Modal';
import IconButton from '@app/components/Button/IconButton';
import Button from '@app/components/Button';
import FieldLocation from '@app/components/Formik/FieldLocation';
import LocationModal from '@app/components/LocationModal';
import { LocationEntity } from '@app/common/types/modules/location/location.entity';
import { Content } from '../../elements';
import { Footer } from './elements';

import { EditPictureSchema } from './dto';

interface IProps {
  picture: PictureEntity;
}
interface IValues {
  title: string;
  bio: string;
  isPrivate: boolean;
  location?: LocationEntity;
  tags: string[];
}
const Location = ({ onOk }) => {
  const { values, submitForm } = useFormikContext<IValues>();
  return (
    <LocationModal city={values.location?.city} onOk={onOk} />
  );
};

const SettingModal: React.FC<IProps> = ({ picture }) => {
  const [init, setInit] = useState(false);
  const formikRef = useRef<FormikProps<IValues>>(null);
  const client = useApolloClient();
  const { colors } = useTheme();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const { key, id } = picture;
  const [visible, close] = useSearchParamModal('setting');
  const [editLocationVisible, closeEditLocation, openEditLocation] = useSearchParamModal(
    'editLocation',
    'modal-child',
  );
  const [location, setLocation] = useState<LocationEntity>();
  const { t } = useTranslation();
  const [del, loading] = useDeletePicture();
  const [update, updateProp] = useMutation(UpdatePicture);
  const handleOk = useCallback(
    async (values: IValues) => {
      const updateData: any = { ...values };
      updateData.locationUid = values.location?.uid;
      delete updateData.location;
      const { data } = await update({
        variables: {
          id,
          data: updateData,
        },
      });
      client.writeFragment({
        id: `Picture:${id}`,
        fragment: gql`
          fragment PictureBaseFragment on Picture {
            title
            bio
            isPrivate
            location
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
      close();
    },
    [client, close, id, t, update],
  );
  const deletePicture = useCallback(() => del(id), [del, id]);

  const onSetLocation = (poi: LocationEntity) => {
    setLocation(poi);
    formikRef.current?.setFieldValue('location', poi);
    closeEditLocation();
  };
  useEffect(() => {
    if (visible) {
      setTimeout(() => setInit(true), 300);
    }
  }, [visible]);
  return (
    <Modal afterClose={() => setInit(false)} maxWidth={560} centered visible={visible} onClose={() => close()}>
      <Modal.Background background={getPictureUrl(key, 'blur')} />
      <Modal.Content>
        <Modal.Title>{t('picture.edit.title')}</Modal.Title>
        <Content>
          <Formik<IValues>
            innerRef={formikRef}
            initialValues={{
              ...pick(picture, ['title', 'bio', 'isPrivate', 'location']),
              tags: picture.tags.map((tag) => tag.name),
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
              <FieldLocation label="地点" bio="添加地点" name="location" />
              <div style={{ height: '24px' }} />
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
                  <Button
                    htmlType="submit"
                    loading={updateProp.loading}
                  >
                    {t('picture.edit.confirm')}
                  </Button>
                </div>
              </Footer>
              <Location onOk={onSetLocation} />
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
            loading,
          }}
          title={t('picture.label.deleteTitle')}
        />
        {/* <FastField name="t" shouldUpdate={(nextProps, currentProps) => nextProps.location !== currentProps.location}>
          {
            ({ field, form, meta }) => (
            )
          }
        </FastField> */}
      </Modal.Content>
    </Modal>
  );
};

export default SettingModal;
