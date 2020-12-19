import { render } from 'react-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { useTransition, animated } from 'react-spring';
import data from './data';
import './styles.css';
import { useMeasure, useMedia } from '@app/utils/hooks';
import { getPictureUrl } from '@app/utils/image';

function App({ list }) {
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2,
  );
  const [bind, { width }] = useMeasure();
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let gridItems = list.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights));
      const itemWidth = width / columns;
      const itemC = child.width / itemWidth;
      const itemHeight = child.height / itemC;
      const xy = [
        itemWidth * column,
        (heights[column] += itemHeight) - itemHeight,
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
    <div {...bind} className="list" style={{ height: Math.max(...heights) }}>
      {gridItems.map(({ xy, width, height, ...picture }) => {
        return (
          <div
            key={picture.id}
            style={{
              transform: `translate3d(${xy[0]}px,${xy[1]}px,0)`,
              width,
              height,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundImage: `url(${getPictureUrl(picture.key, 'thumb')})`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
