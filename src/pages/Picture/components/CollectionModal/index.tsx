import React, { useEffect, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { useSearchParamModal } from '@app/utils/hooks';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import {
  EmojiText, Loading, Popover,
} from '@app/components';
import { getPictureUrl } from '@app/utils/image';
import { Lock, PlusCircle } from '@app/components/Icons';
import { useLazyQuery } from '@apollo/client';
import { UserCollectionsByName } from '@app/graphql/query';
import { IPaginationListData } from '@app/graphql/interface';
import { CollectionEntity } from '@app/common/types/modules/collection/collection.entity';
import { observer } from 'mobx-react';
import { useAccount } from '@app/stores/hooks';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import divide from 'lodash/divide';
import Modal from '@app/components/Modal';
import {
  CheckIcon,
  CollectionBox,
  CollectionItemBox,
  CollectionItemCover,
  ItemHandleIcon,
  ItemInfoBox,
  ItemInfoCount,
  ItemInfoTitle,
  MinusIcon,
} from './elements';

interface IProps {
  picture: PictureEntity;
}

const Content = styled(OverlayScrollbarsComponent)`
  flex: 1;
  /* max-height: 80vh;
  height: 100px; */
`;

const CollectionModal: React.FC<IProps> = observer(({ picture }) => {
  const { t } = useTranslation();
  const [visible, close] = useSearchParamModal('collection');
  const { isLogin, userInfo } = useAccount();
  const [current, setCurrent] = useState<Map<number, CollectionEntity>>(
    new Map(),
  );
  const [collectionsQuery, { loading, data }] = useLazyQuery<{
    userCollectionsByName: IPaginationListData<CollectionEntity>;
  }>(UserCollectionsByName);
  const { key, currentCollections } = picture;
  useEffect(() => {
    if (visible && isLogin) {
      setCurrent(
        new Map(
          currentCollections.map((collection) => [collection.id, collection]),
        ),
      );
      collectionsQuery({
        variables: {
          username: userInfo!.username,
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, isLogin]);
  useEffect(() => {
    setCurrent(
      new Map(
        currentCollections.map((collection) => [collection.id, collection]),
      ),
    );
  }, [currentCollections]);
  let content: JSX.Element[] = [];
  if (data?.userCollectionsByName) {
    content = data.userCollectionsByName.data.map((collection) => {
      const isCollected = current.has(collection.id) ? 1 : 0;
      // const isLoading = loadingObj[collection.id] ? 1 : 0;
      const preview = collection.preview.slice();
      return (
        <CollectionItemBox key={collection.id}>
          {preview[0] && (
            <CollectionItemCover
              src={getPictureUrl(preview[0].key, 'thumbSmall')}
            />
          )}
          <ItemInfoBox isCollected={isCollected} isPreview={preview[0] ? 1 : 0}>
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
    });
  }
  return (
    <Modal
      autoMobile={false}
      maxWidth={500}
      centered
      visible={visible}
      onClose={() => close()}
      css={`
        max-height: 400px;
        height: 80vh;
        display: flex;
        flex-direction: column;
      `}
    >
      <Modal.Background background={getPictureUrl(key, 'blur')} />
      <Modal.Content
        css={`
          height: 80vh;
          display: flex;
          flex-direction: column;
        `}
      >
        <Modal.Title>信息</Modal.Title>
        <Content
          options={{
            scrollbars: { autoHide: 'move' },
            sizeAutoCapable: false,
          }}
        >
          <CollectionBox>
            <CollectionItemBox>
              <ItemInfoBox isCollected={0} isPreview={0}>
                <div>
                  <ItemInfoTitle style={{ marginBottom: 0 }}>
                    <PlusCircle style={{ marginRight: '12px' }} />
                    <span>添加</span>
                  </ItemInfoTitle>
                </div>
              </ItemInfoBox>
            </CollectionItemBox>
            {content}
          </CollectionBox>
        </Content>
      </Modal.Content>
    </Modal>
  );
});

export default CollectionModal;
