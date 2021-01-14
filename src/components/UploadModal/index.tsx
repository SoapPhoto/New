import React, { useRef } from 'react';

import { useImageInfo, useSearchParamModal } from '@app/utils/hooks';
import { Modal } from '..';
import { Image } from '../Icons';
import { UploadHeader, UploadTips } from './elements';

const UploadModal = () => {
  const [visible, close] = useSearchParamModal('upload');
  const imageRef = useRef<File>();
  const [setFile] = useImageInfo(imageRef);
  const handleChange = async (files: Maybe<FileList>) => {
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  return (
    <Modal centered maxWidth={600} visible={visible} onClose={close}>
      <Modal.Content>
        <UploadHeader onFileChange={handleChange}>
          <Image size={32} />
          <UploadTips>请选择图片</UploadTips>
        </UploadHeader>
        <div
          css={`
            padding: 24px;
          `}
        >
          123123123132
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default UploadModal;
