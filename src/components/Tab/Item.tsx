import React from 'react';
import { ItemLink } from './elements';

interface ITabItemProps {
  name: string;
  to: string;
}

const TabItem: React.FC<ITabItemProps> = ({ name, to }) => (
  <ItemLink
    className={({ isActive }) => [
      isActive ? 'active' : null,
    ]
      .filter(Boolean)
      .join(' ')}
    caseSensitive={false}
    end
    to={to}
  >
    {name}
  </ItemLink>
);

export default TabItem;
