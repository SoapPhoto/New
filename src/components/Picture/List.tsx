import React, { useMemo } from 'react';
import { useMeasure } from 'react-use';

import { useMedia } from '@app/utils/hooks';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import PictureItem from './Item';
import { ListWrapper } from './elements';

function App({ list }) {
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
    const baseWidth = width === 0 ? document.body.clientWidth - 48 : width;
    const padding = 20;
    let heights = new Array(columns).fill(0);
    let gridItems = list.map((child, i) => {
      const colPadding = padding * (columns - 1);
      const column = heights.indexOf(Math.min(...heights));
      const itemWidth = (baseWidth - colPadding) / columns;
      const itemC = child.width / itemWidth;
      const itemHeight = child.height / itemC;
      const xy = [
        (itemWidth + padding) * column,
        (heights[column] +=
          itemHeight + (heights[column] === 0 ? 0 : padding)) - itemHeight,
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
  return (
    <ListWrapper ref={ref as any} style={{ height: Math.max(...heights) }}>
      {gridItems.map(({ xy, width, height, ...picture }) => {
        return (
          <PictureItem
            key={picture.id}
            style={{
              transform: `translate3d(${xy[0]}px,${xy[1]}px,0)`,
              width,
              height,
            }}
            picture={picture as PictureEntity}
          />
        );
      })}
    </ListWrapper>
  );
}

export default App;
