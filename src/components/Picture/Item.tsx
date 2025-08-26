import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import type { CSSProperties } from 'react'

import { Spring } from '@app/utils/spring'
import React, { memo } from 'react'
import { useLocation } from 'react-router'
import { Blurhash } from '..'
import {
  A,
  ItemBox,
  ItemWrapper,
} from './elements'
import PictureImage from './Image'
import { Info } from './info'

export interface IPictureItemProps {
  index: number
  picture: PictureEntity
  style?: CSSProperties
}

const PictureItem: React.FC<IPictureItemProps> = ({ style, picture, index }) => {
  const location = useLocation()

  // Framer Motion 动画变体
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        ...Spring.presets.smooth,
        delay: Math.min(index * 0.05, 0.3),
      },
    },
  }

  return (
    <ItemWrapper variants={itemVariants} animate="visible" initial="hidden" style={style} color={picture.color} isPrivate={picture.isPrivate ? 1 : 0}>
      <A
        to={`/picture/${picture.id}`}
        state={{ backgroundLocation: location }}
      >

        <ItemBox>
          {
            picture.isPrivate
              ? (
                  <Blurhash
                    hash={picture.blurhash!}
                    width="100%"
                    height="100%"
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                  />
                )
              : (
                  <PictureImage
                    blurhash={picture.blurhash}
                    imgkey={picture.key}
                  />
                )
          }
        </ItemBox>
        <Info picture={picture} />

      </A>
    </ItemWrapper>
  )
}
export default memo(PictureItem)
