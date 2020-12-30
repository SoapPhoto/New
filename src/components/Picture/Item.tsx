import React, { CSSProperties } from 'react';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import PictureImage from './Image';
import { ItemBox, ItemWrapper, Shadow } from './elements';

interface IPictureItemProps {
  picture: PictureEntity;
  style: CSSProperties;
}

const PictureItem: React.FC<IPictureItemProps> = ({ style, picture }) => {
  return (
    <ItemWrapper style={style} color={picture.color}>
      <ItemBox>
        <PictureImage blurhash={picture.blurhash} imgkey={picture.key} />
      </ItemBox>
    </ItemWrapper>
  );
};

export default PictureItem;
