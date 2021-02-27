import React from 'react';

import { Wrapper } from './elements';
import TabItem from './Item';

type TabType = typeof InternalTab;

interface TabInterface extends TabType {
  Item: typeof TabItem;
}

interface ITabProps {}

const InternalTab: React.FC<ITabProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Tab = InternalTab as TabInterface;

Tab.Item = TabItem;

export default Tab;
