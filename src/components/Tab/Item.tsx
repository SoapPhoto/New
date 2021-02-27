import React from 'react';
import { ItemLink } from './elements';

interface ITabItemProps {
  name: string;
  to: string;
}

const TabItem: React.FC<ITabItemProps> = ({ name, to }) => {
  return (
    <ItemLink activeClassName="active" caseSensitive={false} end={true} to={to}>
      {name}
    </ItemLink>
  );
};

export default TabItem;
