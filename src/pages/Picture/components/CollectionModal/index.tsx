import React, { useCallback, useEffect, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { useSearchParamModal } from '@app/utils/hooks';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { getPictureUrl } from '@app/utils/image';
import { PlusCircle } from '@app/components/Icons';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { UserCollectionsByName } from '@app/graphql/query';
import { IPaginationListData } from '@app/graphql/interface';
import { CollectionEntity } from '@app/common/types/modules/collection/collection.entity';
import { observer } from 'mobx-react';
import { useAccount } from '@app/stores/hooks';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import Modal from '@app/components/Modal';
import Empty from '@app/components/Empty';
import { AddPictureCollection, RemovePictureCollection } from '@app/graphql/mutations';
import Fragments from '@app/graphql/fragments';
import AddCollectionModal from '@app/components/AddCollectionModal';
import {
  CollectionBox,
  CollectionItemBox,
  ItemInfoBox,
  ItemInfoTitle,
} from './elements';
import CollectionModalItem from './components/Item';
import CollectionModalAdd from './components/Add';

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
  const [addCollectionInit, setAddCollectionInit] = useState(false);
  const [addCollectionVisible, closeAddCollection] = useSearchParamModal(
    'addCollection',
    'modal-child',
  );
  const [collectionsQuery, { loading, data, refetch }] = useLazyQuery<{
    userCollectionsByName: IPaginationListData<CollectionEntity>;
  }>(UserCollectionsByName);
  const [removePictureCollection] = useMutation(RemovePictureCollection, {
    update(cache, data, options) {
      const { variables } = options;
      const cacheData = cache.readFragment<PictureEntity>({
        id: `Picture:${variables!.pictureId}`,
        fragment: Fragments,
        fragmentName: 'PictureDetailFragment',
      });
      cache.writeFragment({
        id: `Picture:${variables!.pictureId}`,
        fragment: gql`
          fragment PictureDetailFragment on Picture {
            currentCollections
          }
        `,
        data: {
          currentCollections: cacheData?.currentCollections.filter((collection) => collection.id !== variables!.id),
        },
      });
      refetch();
    },
  });
  const [addPictureCollection] = useMutation<{ addPictureCollection: CollectionEntity }>(AddPictureCollection, {
    update(cache, data, options) {
      const { variables } = options;
      const cacheData = cache.readFragment<PictureEntity>({
        id: `Picture:${variables!.pictureId}`,
        fragment: Fragments,
        fragmentName: 'PictureDetailFragment',
      });
      cache.writeFragment({
        id: `Picture:${variables!.pictureId}`,
        fragment: gql`
          fragment PictureDetailFragment on Picture {
            currentCollections
          }
        `,
        data: {
          currentCollections: [...(cacheData?.currentCollections ?? []), data.data?.addPictureCollection],
        },
      });
      refetch();
    },
  });
  const [current, setCurrent] = useState<Map<number, CollectionEntity>>(
    new Map(),
  );
  const [loadingObj, setLoading] = useState<Record<string, boolean>>({});
  const { key, currentCollections } = picture;
  useEffect(() => {
    if (addCollectionVisible) {
      closeAddCollection();
    }
    setTimeout(() => {
      setAddCollectionInit(true);
    }, [100]);
  }, []);
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
  const onCollected = useCallback(async (collection: CollectionEntity, isCollected: boolean) => {
    if (loadingObj[collection.id]) {
      return;
    }
    setLoading((ld) => ({
      ...ld,
      [collection.id]: true,
    }));
    try {
      if (isCollected) {
        removePictureCollection({
          variables: {
            id: collection.id,
            pictureId: picture.id,
          },
        });
        current.delete(collection.id);
        setCurrent(current);
      } else {
        const addData = await addPictureCollection({
          variables: {
            id: collection.id,
            pictureId: picture.id,
          },
        });
        console.log(addData);
      }
    } finally {
      setLoading((ld) => ({
        ...ld,
        [collection.id]: false,
      }));
    }
  }, [addPictureCollection, current, loadingObj, picture.id, removePictureCollection]);
  const onAddCollectionOk = (collection: CollectionEntity) => {
    refetch();
  };
  let content: JSX.Element[] = [<Empty key="loading" loading />];
  if (data?.userCollectionsByName) {
    content = data.userCollectionsByName.data.map((collection) => (
      <CollectionModalItem
        key={collection.id}
        collection={collection}
        onCollected={onCollected}
        isCollected={current.has(collection.id)}
      />
    ));
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
      contentStyle={{
        width: 'calc(100vw - 24px)',
        // marginRight: '24px',
      }}
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
            <CollectionModalAdd />
            {content}
          </CollectionBox>
        </Content>
        {
          addCollectionInit && (
            <AddCollectionModal onOk={onAddCollectionOk} />
          )
        }
      </Modal.Content>
    </Modal>
  );
});

export default CollectionModal;
