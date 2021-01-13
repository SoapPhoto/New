import { isNull } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import bytes from 'bytes';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { Modal } from '@app/components';
import { EXIFBox, EXIFInfo, EXIFTitle, Info } from './elements';
import { getPictureUrl } from '@app/utils/image';
import { rgba } from 'polished';
import { useTheme } from 'styled-components';

interface IProps {
  picture: PictureEntity;
}

const ExifModal: React.FC<IProps> = ({ picture }) => {
  const theme = useTheme();
  const routerLocation = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    make,
    model,
    exif,
    width,
    height,
    size,
    key,
    location,
    info,
  } = picture;
  const { focalLength, aperture, exposureTime, ISO } = exif!;
  const background = useMemo(
    () =>
      `linear-gradient(${rgba(theme.background, 0.8)}, ${
        theme.background
      } 150px), url("${getPictureUrl(key, 'blur')}")`,
    [key, theme.background],
  );
  return (
    <Modal
      maxWidth={500}
      centered
      visible={searchParams.get('modal') === 'info'}
      onClose={() => {
        if (
          routerLocation.state &&
          (routerLocation.state as any).modal === 'info'
        ) {
          navigate(-1);
        } else {
          navigate('.');
        }
      }}
    >
      <Modal.Background background={background} />
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
