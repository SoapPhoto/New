import React from 'react';
import isFunction from 'lodash/isFunction';

import { useTapButton } from '@app/utils/hooks';
import {
  ItemBio, ItemBox, ItemContent, ItemLabel,
} from './elements';

export interface IFieldItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  bio?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const FieldItem: React.FC<IFieldItemProps> = ({
  label,
  bio,
  children,
  onClick,
  style,
  ...props
}) => {
  const isClicked = isFunction(onClick);
  const [spring, bind] = useTapButton(1, 0.96);
  return (
    <ItemContent
      style={{ ...style, ...spring }}
      {...bind()}
      isclicked={isClicked ? 1 : 0}
      onClick={onClick}
    >
      <ItemBox>
        <ItemLabel>{label}</ItemLabel>
        {bio && <ItemBio>{bio}</ItemBio>}
      </ItemBox>
      {children}
    </ItemContent>
  );
};

export default FieldItem;
