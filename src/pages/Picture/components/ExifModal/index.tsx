import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import bytes from 'bytes';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { getPictureUrl } from '@app/utils/image';
import { useSearchParamModal } from '@app/utils/hooks';
import Modal from '@app/components/Modal';
import { GpsImage } from '@app/components/GpsImage';
import {
  EXIFBox, EXIFInfo, EXIFTitle, Info,
} from './elements';

interface IProps {
  picture: PictureEntity;
}

const ExifModal: React.FC<IProps> = memo(({ picture }) => {
  const { t } = useTranslation();
  const [visible, close] = useSearchParamModal('exif');
  const {
    make, model, exif, width, height, size, key, location,
  } = picture;
  const {
    focalLength, aperture, exposureTime, ISO,
  } = exif ?? {};
  const maybe = (value: any) => {
    if (value === null || value === undefined) {
      return true;
    }
    return false;
  };
  return (
    <Modal
      autoMobile={false}
      maxWidth={500}
      centered
      visible={visible}
      onClose={() => close()}
    >
      <Modal.Background background={getPictureUrl(key, 'blur')} />
      <Modal.Content>
        <Modal.Title>信息</Modal.Title>
        <Info>
          <EXIFBox>
            <div>
              <EXIFTitle>{t('picture.info.make')}</EXIFTitle>
              <EXIFInfo>{maybe(make) ? '--' : make}</EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.model')}</EXIFTitle>
              <EXIFInfo>{maybe(model) ? '--' : model}</EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.focalLength')}</EXIFTitle>
              <EXIFInfo>
                {maybe(focalLength) ? '--' : `${focalLength}mm`}
              </EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.aperture')}</EXIFTitle>
              <EXIFInfo>{maybe(aperture) ? '--' : `f/${aperture}`}</EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.exposureTime')}</EXIFTitle>
              <EXIFInfo>
                {maybe(exposureTime) ? '--' : `${exposureTime}s`}
              </EXIFInfo>
            </div>
            <div>
              <EXIFTitle>{t('picture.info.ISO')}</EXIFTitle>
              <EXIFInfo>{maybe(ISO) ? '--' : ISO}</EXIFInfo>
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
          {
            (location && location.location) && (
              <div style={{ borderRadius: '4px', marginTop: 32 }}>
                <GpsImage zoom={14} size="500x300" gps={[location.location.lat, location.location.lng]} />
              </div>
            )
          }
        </Info>
      </Modal.Content>
    </Modal>
  );
});

export default ExifModal;
