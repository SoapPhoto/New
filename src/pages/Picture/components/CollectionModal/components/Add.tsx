import AddCollectionModal from '@app/components/AddCollectionModal';
import { PlusCircle } from '@app/components/Icons';
import { useSearchParamModal, useTapButton } from '@app/utils/hooks';
import React from 'react';
import { CollectionItemBox, ItemInfoBox, ItemInfoTitle } from '../elements';

const CollectionModalAdd = () => {
  const [spring, bind] = useTapButton(1, 0.96);
  const [addCollectionVisibiel, closeAddCollection, openAddCollection] = useSearchParamModal(
    'addCollection',
    'modal-child',
  );
  return (
    <CollectionItemBox
      {...bind()}
      style={{
        transform: spring.transform,
      }}
      onClick={(e) => {
        // e.defaultPrevented();
        e.stopPropagation();
        openAddCollection();
      }}
    >
      <ItemInfoBox isCollected={0} isPreview={0}>
        <div>
          <ItemInfoTitle style={{ marginBottom: 0 }}>
            <PlusCircle style={{ marginRight: '12px' }} />
            <span>添加</span>
          </ItemInfoTitle>
        </div>
      </ItemInfoBox>
    </CollectionItemBox>
  );
};

export default CollectionModalAdd;
