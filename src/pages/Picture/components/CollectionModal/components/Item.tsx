import React from 'react';
import { t } from 'i18next';

import { CollectionEntity } from '@app/common/types/modules/collection/collection.entity';
import { Popover, EmojiText, Loading } from '@app/components';
import { Lock } from '@app/components/Icons';
import { getPictureUrl } from '@app/utils/image';
import { useTapButton } from '@app/utils/hooks';
import {
  CollectionItemBox, CollectionItemCover, ItemInfoBox, ItemInfoTitle, ItemInfoCount, ItemHandleIcon, CheckIcon, MinusIcon,
} from '../elements';

interface IProps {
  collection: CollectionEntity
  isCollected: boolean
  onCollected: (collection: CollectionEntity, isCollected: boolean) => Promise<void>
}

const CollectionModalItem: React.FC<IProps> = ({ collection, isCollected, onCollected }) => {
  const [spring, bind] = useTapButton(1, 0.96);
  const preview = collection.preview.slice();
  return (
    <CollectionItemBox
      key={collection.id}
      {...bind()}
      style={{
        transform: spring.transform,
      }}
      onClick={() => {
        onCollected(collection, isCollected);
      }}
    >
      {preview[0] && (
        <CollectionItemCover
          src={getPictureUrl(preview[0].key, 'small')}
        />
      )}
      <ItemInfoBox isCollected={isCollected ? 1 : 0} isPreview={preview[0] ? 1 : 0}>
        <div>
          <ItemInfoTitle>
            {collection.isPrivate && (
              <Popover
                trigger="hover"
                placement="top"
                theme="dark"
                openDelay={100}
                content={<span>{t('label.private')}</span>}
              >
                <Lock
                  style={{ marginRight: '6px', strokeWidth: '3px' }}
                  size={16}
                />
              </Popover>
            )}
            <EmojiText text={collection.name} />
          </ItemInfoTitle>
          <ItemInfoCount>
            <span>
              {t('label.img_count', {
                total: collection.pictureCount.toString(),
              })}
            </span>
          </ItemInfoCount>
        </div>
        <ItemHandleIcon>
          {false ? (
            <Loading size={6} color="#fff" />
          ) : (
            <>
              <CheckIcon />
              <MinusIcon />
            </>
          )}
        </ItemHandleIcon>
      </ItemInfoBox>
    </CollectionItemBox>
  );
};

export default CollectionModalItem;
