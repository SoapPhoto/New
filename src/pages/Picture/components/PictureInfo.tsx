import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { Star1, Info, Settings } from '@app/components/Icons';
import { useAccount } from '@app/stores/hooks';
import { useSearchParamModal, useTapButton } from '@app/utils/hooks';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import {
  HeartIcon,
  IconButton,
  LikeContent,
  PictureBaseInfo,
  PictureInfoBtnsBox,
} from '../elements';

interface IProps {
  picture: PictureEntity;
}

const PictureInfo: React.FC<IProps> = observer(({ picture }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { isLogin } = useAccount();
  const [, , collectionOpen] = useSearchParamModal('collection');
  const [, , exifOpen] = useSearchParamModal('exif');
  const [, , settingOpen] = useSearchParamModal('setting');
  const { userInfo } = useAccount();
  const [spring, bind] = useTapButton(1.05, 0.92);
  const isOwner = useMemo(
    () =>
      (userInfo && userInfo.id.toString() === picture.user.id.toString()) ||
      false,
    [picture.user.id, userInfo],
  );
  const isCollected = useMemo(
    () => !!(picture && picture.currentCollections.length > 0),
    [],
  );
  return (
    <PictureBaseInfo>
      <div>
        <LikeContent
          {...bind()}
          style={{
            transform: spring.transform,
          }}
          // onClick={onLike}
        >
          <HeartIcon size={20} islike={picture.isLike ? 1 : 0} />
          <p>{picture.likedCount}</p>
        </LikeContent>
      </div>
      <PictureInfoBtnsBox>
        <IconButton
          onClick={() => {
            if (!isLogin) {
              return toast.error(t('error.login'));
            }
            collectionOpen();
          }}
          popover={t('picture.label.collection')}
        >
          <Star1
            style={{
              stroke: isCollected ? colors.green : colors.secondary,
              fill: isCollected ? colors.green : 'transparent',
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => exifOpen()}
          popover={t('picture.label.detail')}
        >
          <Info />
        </IconButton>
        {isOwner && (
          <IconButton
            onClick={() => settingOpen()}
            popover={t('picture.label.setting')}
          >
            <Settings />
          </IconButton>
        )}
      </PictureInfoBtnsBox>
    </PictureBaseInfo>
  );
});

export default PictureInfo;
