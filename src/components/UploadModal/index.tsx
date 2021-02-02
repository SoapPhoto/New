import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import {
  useImageInfo,
  useNewPictureCacheWrite,
  useSearchParamModal,
  useTapButton,
} from '@app/utils/hooks';
import {
  Button,
  FieldInput,
  FieldSwitch,
  FieldTag,
  FieldTextarea,
  Modal,
  Toast,
} from '..';
import { Edit, Image, Trash2 } from '../Icons';
import {
  Thumbnail,
  ThumbnailHover,
  UploadHeader,
  UploadImageHeader,
  UploadTips,
} from './elements';
import { css } from 'styled-components';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import EditExifModal from '../EditExifModal.tsx';
import { pick } from 'lodash';
import { animated } from 'react-spring';
import { uploadOSS } from '@app/services/file';
import { observer } from 'mobx-react';
import { useAccount } from '@app/stores/hooks';
import { UploadType } from '@app/common/enum/upload';
import { addPicture } from '@app/services/picture';
import { useApolloClient } from '@apollo/client';
import { Picture } from '@app/graphql/query';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';

export interface IValues {
  isLocation: boolean;
  isPrivate: boolean;
  title: string;
  bio: string;
  tags: string[];
}

const DeleteImageBtn: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ style, onClick, ...props }) => {
  const [spring, bind] = useTapButton(1.03, 0.95);
  return (
    <animated.button
      {...props}
      {...bind()}
      style={{ ...style, ...spring }}
      onClick={onClick}
      css={css`
        color: ${p => p.theme.colors.error};
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
      `}
    >
      <Trash2
        size={18}
        css={css`
          margin-right: 4px;
        `}
      />
      删除图片
    </animated.button>
  );
};

const UploadModal = observer(() => {
  const client = useApolloClient();
  const { t } = useTranslation();
  const { userInfo } = useAccount();
  const [writePictures] = useNewPictureCacheWrite();
  const [, setPercentComplete] = useState(0);
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [visible, close] = useSearchParamModal('upload');
  const [editExifVisible, closeEditExif, openEditExif] = useSearchParamModal(
    'editExif',
    'modal-child',
  );
  const imageRef = useRef<File>();
  const [info, thumbnail, setFile, clearImage] = useImageInfo(imageRef);
  const handleChange = async (files: Maybe<FileList>) => {
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  useEffect(() => {
    if (editExifVisible && !thumbnail) {
      closeEditExif(true);
    }
  }, [closeEditExif, editExifVisible, thumbnail]);
  const onUploadProgress = useCallback((percent: number) => {
    setPercentComplete(percent);
  }, []);

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
          Toast.error(err.message || '图片上传失败！');
        }
        if (key) {
          const { data } = await addPicture({
            info,
            key,
            ...values,
            tags: values.tags.map(v => ({ name: v })),
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
          Toast.success('图片上传成功！');
          close();
        }
      } else {
        Toast.warning('请选择图片');
      }
    },
    [client, close, info, onUploadProgress, userInfo, writePictures],
  );
  const afterClose = useCallback(() => {
    clearImage();
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
            <UploadTips>请选择图片</UploadTips>
          </UploadHeader>
        ) : (
          <UploadImageHeader>
            <Thumbnail onClick={() => openEditExif()}>
              <img alt="" src={thumbnail} />
              <ThumbnailHover color={info?.color}>
                <Edit />
              </ThumbnailHover>
            </Thumbnail>
            <div
              css={css`
                margin-left: 24px;
              `}
            >
              <DeleteImageBtn onClick={() => clearImage()} />
            </div>
          </UploadImageHeader>
        )}
        <div
          css={css`
            padding: 24px;
            padding-top: 12px;
          `}
        >
          <Formik<IValues>
            initialValues={{
              title: '',
              isLocation: false,
              bio: '',
              isPrivate: false,
              tags: [],
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required('请输入标题'),
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
                <FieldSwitch
                  name="isPrivate"
                  label="私人"
                  bio="这个图片仅自己可见"
                />
                <div style={{ height: '24px' }} />
                <div style={{ height: '12px' }} />
                <div>
                  <Button
                    loading={uploadLoading}
                    htmlType="submit"
                    disabled={!(isValid && thumbnail)}
                  >
                    上传
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
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
    </Modal>
  );
});

export default UploadModal;
