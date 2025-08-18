import type { IPictureItemProps } from './Item'
import React, { memo } from 'react'
import LazyLoad from 'react-lazyload'

import { animated } from 'react-spring'
import PictureItem from './Item'

const { div: Div } = animated as any

const PictureLayzItem: React.FC<IPictureItemProps> = (props) => {
  return (
    <LazyLoad unmountIfInvisible once offset={900}>
      <Div
        style={{
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'perspective(1px)',
        }}
      >
        <PictureItem {...props} />
      </Div>
    </LazyLoad>
  )
}

export default memo(PictureLayzItem)
