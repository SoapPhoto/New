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
        <PictureImage blurhashSrc={picture.blurhashSrc} imgkey={picture.key} />
        <Shadow style={{ backgroundImage: `url(${picture.blurhashSrc})` }} />
      </ItemBox>
    </ItemWrapper>
  );
};

export default PictureItem;
