import React from 'react';
import { ItemLink } from './elements';

interface ITabItemProps {
  name: string;
  to: string;
}

const TabItem: React.FC<ITabItemProps> = ({ name, to }) => (
  <ItemLink
    caseSensitive={false}
    end
    to={to}
  >
    {name}
  </ItemLink>
);

export default TabItem;
