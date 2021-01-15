import React, { useRef } from 'react';

import { useImageInfo, useSearchParamModal } from '@app/utils/hooks';
import { FieldInput, FieldSwitch, FieldTag, FieldTextarea, Modal } from '..';
import { Edit, Image, Trash2 } from '../Icons';
import {
  Thumbnail,
  ThumbnailHover,
  UploadHeader,
  UploadImageHeader,
  UploadTips,
} from './elements';
import { css } from 'styled-components';
import Input from '../Input';
import Textarea from '../Input/Textarea';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

const UploadModal = () => {
  const { t } = useTranslation();
  const [visible, close] = useSearchParamModal('upload');
  const imageRef = useRef<File>();
  const [info, thumbnail, setFile] = useImageInfo(imageRef);
  const handleChange = async (files: Maybe<FileList>) => {
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  return (
    <Modal centered maxWidth={600} visible={visible} onClose={close}>
      {thumbnail && <Modal.Background height={140} background={thumbnail!} />}
      <Modal.Content>
        {!thumbnail ? (
          <UploadHeader onFileChange={handleChange}>
            <Image size={32} />
            <UploadTips>请选择图片</UploadTips>
          </UploadHeader>
        ) : (
          <UploadImageHeader>
            <Thumbnail>
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
              {/* <div onClick={() => openLocation()}>图片位置</div> */}
              <div
                css={css`
                  color: ${p => p.theme.colors.error};
                `}
              >
                <Trash2
                  size={18}
                  css={css`
                    margin-right: 4px;
                  `}
                />
                删除图片
              </div>
            </div>
          </UploadImageHeader>
        )}
        <div
          css={css`
            padding: 24px;
            padding-top: 12px;
          `}
        >
          <Formik
            initialValues={{
              title: '',
              bio: '',
              isPrivate: false,
              tags: [],
            }}
            onSubmit={() => {}}
          >
            {() => (
              <>
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
              </>
            )}
          </Formik>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default UploadModal;
