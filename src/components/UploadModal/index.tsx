import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import * as Yup from 'yup';

import {
  useImageInfo,
  useNewPictureCacheWrite,
  useSearchParamModal,
  useTapButton,
} from '@app/utils/hooks';
import { Form, Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import pick from 'lodash/pick';
import { animated } from 'react-spring';
import { uploadOSS } from '@app/services/file';
import { observer } from 'mobx-react';
import { useAccount } from '@app/stores/hooks';
import { UploadType } from '@app/common/enum/upload';
import { addPicture } from '@app/services/picture';
import { useApolloClient } from '@apollo/client';
import { Picture } from '@app/graphql/query';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { toast } from 'react-hot-toast';
import Modal from '@app/components/Modal';
import Button from '@app/components/Button';
import { LocationEntity } from '@app/common/types/modules/location/location.entity';
import EditExifModal from '../EditExifModal.tsx';
import {
  DeleteBtn,
  DeleteImageBtnBox,
  Thumbnail,
  ThumbnailHover,
  UploadBox,
  UploadHeader,
  UploadImageHeader,
  UploadTips,
} from './elements';
import { Edit, Image, Trash2 } from '../Icons';
import {
  FieldInput,
  FieldSwitch,
  FieldTag,
  FieldTextarea,
} from '..';
import FieldLocation from '../Formik/FieldLocation';
import LocationModal from '../LocationModal';

export interface IValues {
  isLocation: boolean;
  isPrivate: boolean;
  title: string;
  bio: string;
  location?: LocationEntity;
  tags: string[];
}

const a = animated as any;

const DeleteImageBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ style, onClick, ...props }) => {
  const { t } = useTranslation();
  const [spring, bind] = useTapButton(1.03, 0.95);
  return (
    <DeleteBtn
      {...props}
      {...bind()}
      style={{ ...style, ...spring }}
      onClick={onClick}
    >
      <Trash2 size={18} style={{ marginRight: 4 }} />
      {t('picture.upload.deleteImage')}
    </DeleteBtn>
  );
};

const UploadModal = observer(() => {
  const client = useApolloClient();
  const { t } = useTranslation();
  const { userInfo } = useAccount();
  const [writePictures] = useNewPictureCacheWrite();
  const [, setPercentComplete] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [location, setLocation] = useState<LocationEntity>();
  const [visible, close] = useSearchParamModal('upload');
  const [editExifVisible, closeEditExif, openEditExif] = useSearchParamModal(
    'editExif',
    'modal-child',
  );
  const [editLocationVisible, closeEditLocation, openEditLocation] = useSearchParamModal(
    'editLocation',
    'modal-child',
  );
  const imageRef = useRef<File>();
  const formikRef = useRef<FormikProps<IValues>>(null);
  const [info, thumbnail, setFile, clearImage] = useImageInfo(imageRef);
  const handleChange = async (files: Maybe<FileList>) => {
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  useEffect(() => {
    if (visible && editLocationVisible && !thumbnail) {
      closeEditLocation(true);
    }
  }, [closeEditExif, closeEditLocation, editExifVisible, editLocationVisible, thumbnail, visible]);
  useEffect(() => {
    if (visible && editExifVisible && !thumbnail) {
      closeEditExif(true);
    }
  }, [closeEditExif, editExifVisible, thumbnail, visible]);
  const onUploadProgress = useCallback((percent: number) => {
    setPercentComplete(percent);
  }, []);

  const onSetLocation = (poi: LocationEntity) => {
    setLocation(poi);
    formikRef.current?.setFieldValue('location', poi);
    closeEditLocation();
  };

  const onSubmit = useCallback(
    async (values: IValues) => {
      if (info && imageRef.current) {
        setUploadLoading(true);
        let key;
        try {
          key = await uploadOSS(
            imageRef.current,
            userInfo!.id,
            UploadType.PICTURE,
            onUploadProgress,
          );
        } catch (err) {
          if (err instanceof Error) {
            toast.error(t(err.message as any) as string || t('picture.upload.uploadError'));
          } else {
            toast.error(t('picture.upload.uploadError'));
          }
          setUploadLoading(false);
        }
        if (key) {
          const { data } = await addPicture({
            info,
            key,
            ...values,
            tags: values.tags.map((v) => ({ name: v })),
          });
          if (data && !data.isPrivate) {
            const { data: picture } = await client.query<{
              picture: PictureEntity;
            }>({
              query: Picture,
              variables: {
                id: data.id,
              },
            });
            writePictures(picture.picture);
          }
          toast.success(t('picture.upload.uploadSuccess'));
          close();
        }
      } else {
        toast.error(t('picture.upload.noImgWarn'));
      }
    },
    [client, close, info, onUploadProgress, t, userInfo, writePictures],
  );
  const afterClose = useCallback(() => {
    clearImage();
    setUploadLoading(false);
  }, [clearImage]);
  return (
    <Modal
      afterClose={afterClose}
      centered
      destroyOnClose
      closable
      fullscreen
      maxWidth={600}
      visible={visible}
      onClose={() => close()}
      maskClosable={false}
    >
      {thumbnail && <Modal.Background height={140} background={thumbnail!} />}
      <Modal.Content>
        {!thumbnail ? (
          <UploadHeader onFileChange={handleChange}>
            <Image size={32} />
            <UploadTips>{t('picture.upload.selectImg')}</UploadTips>
          </UploadHeader>
        ) : (
          <UploadImageHeader>
            <Thumbnail onClick={() => openEditExif()}>
              <img alt="" src={thumbnail} />
              <ThumbnailHover color={info?.color}>
                <Edit />
              </ThumbnailHover>
            </Thumbnail>
            <DeleteImageBtnBox>
              <DeleteImageBtn onClick={() => clearImage()} />
            </DeleteImageBtnBox>
          </UploadImageHeader>
        )}
        <UploadBox>
          <Formik<IValues>
            innerRef={formikRef}
            initialValues={{
              title: '',
              isLocation: false,
              bio: '',
              isPrivate: false,
              location: undefined,
              tags: [],
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required(
                t('picture.upload.yup_title_required'),
              ),
            })}
            onSubmit={onSubmit}
          >
            {({ isValid }) => (
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
                {/* <div style={{ height: '24px' }} /> */}
                <FieldLocation label="地点" bio="添加地点" name="location" />
                <div style={{ height: '24px' }} />
                <FieldSwitch
                  name="isPrivate"
                  label={t('label.private')}
                  bio={t('picture.label.privateBio')}
                />
                <div style={{ height: '24px' }} />
                <div style={{ height: '12px' }} />
                <div>
                  <Button
                    loading={uploadLoading}
                    htmlType="submit"
                    disabled={!(isValid && thumbnail)}
                  >
                    {t('picture.upload.uploadBtn')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </UploadBox>
      </Modal.Content>
      {thumbnail && (
        <EditExifModal
          initialValues={{
            make: info!.make,
            model: info!.model,
            ...pick(info!.exif, [
              'focalLength',
              'aperture',
              'exposureTime',
              'ISO',
            ]),
          }}
        />
      )}
      {thumbnail && (
      <LocationModal onOk={onSetLocation} />
      )}
    </Modal>
  );
});

export default UploadModal;
