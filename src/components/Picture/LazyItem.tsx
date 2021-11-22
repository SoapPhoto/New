import React, { memo } from 'react';
import LazyLoad from 'react-lazyload';
import { animated } from 'react-spring';

import PictureItem, { IPictureItemProps } from './Item';

const PictureLayzItem: React.FC<IPictureItemProps> = (props) => {
  const transition = { duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] };
  const thumbnailVariants = {
    hover: { scale: 1.04 },
  };
  return (
    <LazyLoad unmountIfInvisible offset={900}>
      <animated.div
        style={{
          width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'perspective(1px)',
        }}
      >
        <PictureItem {...props} />
      </animated.div>
    </LazyLoad>
  );
};

export default memo(PictureLayzItem);
