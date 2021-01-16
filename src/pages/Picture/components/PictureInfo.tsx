import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { useAccount } from '@app/stores/hooks';
import { useSearchParamModal, useTapButton } from '@app/utils/hooks';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { Info, Settings } from 'react-feather';
import {
  HeartIcon,
  IconButton,
  LikeContent,
  PictureBaseInfo,
} from '../elements';

interface IProps {
  picture: PictureEntity;
}

const PictureInfo: React.FC<IProps> = observer(({ picture }) => {
  const [, , exifOpen] = useSearchParamModal('exif');
  const [, , settingOpen] = useSearchParamModal('setting');
  const { userInfo } = useAccount();
  const [spring, bind] = useTapButton();
  const isOwner = useMemo(
    () =>
      (userInfo && userInfo.id.toString() === picture.user.id.toString()) ||
      false,
    [picture.user.id, userInfo],
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
      <div
        css={`
          display: grid;
          gap: 8px;
          grid-auto-flow: column;
        `}
      >
        <IconButton onClick={() => exifOpen()} popover={'详情'}>
          <Info />
        </IconButton>
        {isOwner && (
          <IconButton onClick={() => settingOpen()} popover={'设置'}>
            <Settings />
          </IconButton>
        )}
      </div>
    </PictureBaseInfo>
  );
});

export default PictureInfo;
