import React, { memo } from 'react';
import { motion } from 'framer-motion';
import LazyLoad from 'react-lazyload';
import PictureItem, { IPictureItemProps } from './Item';

const PictureLayzItem: React.FC<IPictureItemProps> = (props) => {
  const transition = { duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] };
  const thumbnailVariants = {
    hover: { scale: 1.04 },
  };
  return (
    <LazyLoad unmountIfInvisible offset={900}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        variants={thumbnailVariants}
        whileHover="hover"
        animate={{ opacity: 1, scale: 1, transition }}
        style={{
          width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'perspective(1px)',
        }}
        // variants={thumbnailVariants}
        transition={transition}
      >
        <PictureItem {...props} />
      </motion.div>
    </LazyLoad>
  );
};

export default memo(PictureLayzItem);
