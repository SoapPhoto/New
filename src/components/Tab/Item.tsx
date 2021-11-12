import { motion } from 'framer-motion';
import React from 'react';
import { ItemLink } from './elements';

interface ITabItemProps {
  name: string;
  to: string;
}
const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const TabItem: React.FC<ITabItemProps> = ({ name, to }) => (
  <motion.span
    key={name}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    style={{ display: 'inline-block' }}
    transition={transition}
  >
    <ItemLink
      caseSensitive={false}
      end
      to={to}
    >
      {name}
    </ItemLink>
  </motion.span>
);

export default TabItem;
