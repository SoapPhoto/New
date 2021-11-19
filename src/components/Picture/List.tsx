import React, {
  memo, useEffect, useMemo, useRef,
} from 'react';
import { useMeasure } from 'react-use';
import { observer } from 'mobx-react';
import debounce from 'lodash/debounce';

import { useMedia } from '@app/utils/hooks';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { getScrollHeight, getScrollTop, getWindowHeight } from '@app/utils/dom';
import { ListWrapper } from './elements';
import PictureLayzItem from './LazyItem';

const OFFSET = 1000;
interface IProps {
  list: PictureEntity[]

  onPage?: () => Promise<void>;

  noMore: boolean;
}

const PictureList: React.FC<IProps> = ({ list, onPage, noMore }) => {
  const pageLock = useRef<boolean>(false);
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

  const scrollEvent = debounce(async () => {
    const offset = getScrollHeight() - (getScrollTop() + getWindowHeight());

    if (offset <= OFFSET && !pageLock.current && !noMore) {
      if (onPage) {
        pageLock.current = true;
        await onPage();
        setTimeout(() => {
          pageLock.current = false;
        }, 800);
      }
    }
  }, 100);
  useEffect(() => {
    scrollEvent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 滚动事件绑定
  useEffect(() => {
    if (!noMore) {
      window.addEventListener('scroll', scrollEvent);
      return () => window.removeEventListener('scroll', scrollEvent);
    }
    return function () {
      return null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ListWrapper ref={ref as any} style={{ height: Math.max(...heights) }}>
      {gridItems.map(({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        xy, width, height, ...picture
      }) => (
        <div
          key={picture.id}
          style={{
            position: 'absolute',
            transform: `translate3d(${xy[0]}px,${xy[1]}px,0)`,
            width,
            height,
          }}
        >
          <PictureLayzItem
            picture={picture as PictureEntity}
          />
        </div>
      ))}
    </ListWrapper>
  );
};

export default memo(PictureList);
