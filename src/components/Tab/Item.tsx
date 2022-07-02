import React from 'react';
import { animated } from 'react-spring';

import { useTapButton } from '@app/utils/hooks';
import { ItemLink } from './elements';

interface ITabItemProps {
  name: string;
  to: string;
}
const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
const { div: Div } = animated as any;
const TabItem: React.FC<ITabItemProps> = ({ name, to }) => {
  const [spring, bind] = useTapButton(1.1, 0.90);
  return (
    <Div
      key={name}
      {...bind()}
      style={{
        transform: spring.transform,
      }}
      // transition={transition}
    >
      <ItemLink
        caseSensitive={false}
        end
        to={to}
      >
        {name}
      </ItemLink>
    </Div>
  );
};

export default TabItem;
