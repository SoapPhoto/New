import React, { useMemo } from 'react';
import { useMeasure } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';

import { useMedia } from '@app/utils/hooks';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import PictureItem from './Item';
import { ListWrapper } from './elements';

interface IProps {
  list: PictureEntity[]
}

const PictureList: React.FC<IProps> = ({ list }) => {
  const columns = useMedia(
    [
      '(min-width: 1170px)',
      '(min-width: 868px)',
      '(min-width: 604px)',
      '(max-width: 604px)',
    ],
    [4, 3, 2, 1],
    2,
  );
  const [ref, { width }] = useMeasure();
  const [heights, gridItems] = useMemo(() => {
    const baseWidth = width === 0 ? document.body.clientWidth - 56 : width;
    const padding = 24;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const heights = new Array(columns).fill(0);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const gridItems = list.map((child) => {
      const colPadding = padding * (columns - 1);
      const column = heights.indexOf(Math.min(...heights));
      const itemWidth = (baseWidth - colPadding) / columns;
      const itemC = child.width / itemWidth;
      const itemHeight = child.height / itemC;
      const xy = [
        (itemWidth + padding) * column,
        (heights[column]
          += itemHeight + (heights[column] === 0 ? 0 : padding)) - itemHeight,
      ];
      return {
        ...child,
        xy,
        width: itemWidth,
        height: itemHeight,
      };
    });
    return [heights, gridItems];
  }, [columns, list, width]);
  // const transitions = useTransition<any, any>(gridItems, item => item.id, {
  //   from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
  //   enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
  //   update: ({ xy, width, height }) => ({ xy, width, height }),
  //   leave: { height: 0, opacity: 0 },
  //   config: { mass: 5, tension: 300, friction: 100 },
  //   trail: 25,
  // });
  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
  const thumbnailVariants = {
    // initial: { scale: 0.9, opacity: 0 },
    hover: { scale: 0.98 },
    // enter: (i) => {
    //   const delay = 0;
    //   return {
    //     scale: 1,
    //     opacity: 1,
    //     transition: {
    //       scale: { ...transition, delay, duration: 1 },
    //       opacity: { ...transition, delay },
    //     },
    //   };
    // },
  };

  return (
    <ListWrapper ref={ref as any} style={{ height: Math.max(...heights) }}>
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
      >
        {gridItems.map(({
          // eslint-disable-next-line @typescript-eslint/no-shadow
          xy, width, height, ...picture
        }, index) => (
          <div
            key={picture.id}
            style={{
              position: 'absolute',
              transform: `translate3d(${xy[0]}px,${xy[1]}px,0)`,
              width,
              height,
            }}
          >
            <motion.div
              variants={thumbnailVariants}
              custom={index}
              whileHover="hover"
              style={{ width: '100%', height: '100%' }}
            // animate={{
            //   duration: 1.5, scale: 1, opacity: 1, transition,
            // }}
            // enter={{ scale: 1, opacity: 1, transition }}
            // variants={thumbnailVariants}
              transition={transition}
            >
              <PictureItem
                picture={picture as PictureEntity}
              />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </ListWrapper>
  );
};

export default PictureList;
