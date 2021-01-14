import { isNull } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import bytes from 'bytes';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { Modal } from '@app/components';
import { EXIFBox, EXIFInfo, EXIFTitle, Info } from './elements';
import { getPictureUrl } from '@app/utils/image';
import { useSearchParamModal } from '@app/utils/hooks';

interface IProps {
  picture: PictureEntity;
}

const ExifModal: React.FC<IProps> = ({ picture }) => {
  const { t } = useTranslation();
  const [visible, close] = useSearchParamModal('exif');
  const { make, model, exif, width, height, size, key } = picture;
  const { focalLength, aperture, exposureTime, ISO } = exif!;
  return (
    <Modal maxWidth={500} centered visible={visible} onClose={close}>
      <Modal.Background background={getPictureUrl(key, 'blur')} />
      <Modal.Content>
        <Modal.Title>信息</Modal.Title>
        <Info>
          <EXIFBox>
            <div>
              <EXIFTitle>{t('picture.info.make')}</EXIFTitle>
              <EXIFInfo>{isNull(make) ? '--' : make}</EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.model')}</EXIFTitle>
              <EXIFInfo>{isNull(model) ? '--' : model}</EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.focalLength')}</EXIFTitle>
              <EXIFInfo>
                {isNull(focalLength) ? '--' : `${focalLength}mm`}
              </EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.aperture')}</EXIFTitle>
              <EXIFInfo>{isNull(aperture) ? '--' : `f/${aperture}`}</EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.exposureTime')}</EXIFTitle>
              <EXIFInfo>
                {isNull(exposureTime) ? '--' : `${exposureTime}s`}
              </EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.ISO')}</EXIFTitle>
              <EXIFInfo>{isNull(ISO) ? '--' : ISO}</EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.dimensions')}</EXIFTitle>
              <EXIFInfo>{`${width} x ${height}`}</EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.size')}</EXIFTitle>
              <EXIFInfo>{bytes(size)}</EXIFInfo>
            </div>
          </EXIFBox>
        </Info>
      </Modal.Content>
    </Modal>
  );
};

export default ExifModal;
