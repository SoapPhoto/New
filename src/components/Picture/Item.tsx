import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import type { CSSProperties } from 'react'

import { useTapButton } from '@app/utils/hooks'
import useLikePicture from '@app/utils/hooks/useLikePicture'
import { Spring } from '@app/utils/spring'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Blurhash, EmojiText, Popover } from '..'
import Avatar from '../Avatar'
import { Ordinary } from '../Icons'
import UserPopover from '../UserPopover'
import {
  A,
  ChoiceBox,
  HandleBox,
  HeartIcon,
  InfoBox,
  ItemBox,
  ItemWrapper,
  LikeContent,
  UserBox,
  UserName,
} from './elements'
import PictureImage from './Image'

export interface IPictureItemProps {
  index: number
  picture: PictureEntity
  style?: CSSProperties
}

const PictureItem: React.FC<IPictureItemProps> = ({ style, picture, index }) => {
  const [spring, bind] = useTapButton(1.05, 0.92)
  const { t } = useTranslation()
  const { colors } = useTheme()
  const location = useLocation()
  const [like] = useLikePicture(picture.id)

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
      {
        picture.badge?.findIndex(v => v.name === 'choice') >= 0 && (
          <Popover
            openDelay={100}
            trigger="hover"
            placement="top"
            theme="dark"
            content={<span>{t('label.choice')}</span>}
          >
            <ChoiceBox
              style={{
                position: 'absolute',
                zIndex: 3,
              }}
            >
              <Ordinary size={28} />
            </ChoiceBox>
          </Popover>
        )
      }
      <A
        to={`/picture/${picture.id}`}
        state={{ backgroundLocation: location }}
      />
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
      <LikeContent
        // transformTemplate={({ scale }: any) => `translate(0, 0) scale(${scale})`}
        // whileHover={{ scale: 1 }}
        // whileTap={{ scale: 0.94 }}
        {...bind()}
        style={{
          transform: spring.transform,
        }}
        onClick={() => like(picture.isLike)}
      >
        <HeartIcon
          size={16}
          color={colors.error}
          islike={picture.isLike ? 1 : 0}
        />
        <p>{picture.likedCount}</p>
      </LikeContent>
      <InfoBox>
        <UserBox>
          <UserPopover username={picture.user.username}>
            <Link
              to={`/user/${picture.user.username}`}
              state={{
                picture: '222',
              }}
            >
              <Avatar
                // badge={detail.user.badge}
                src={picture.user.avatar}
                size={32}
              />
            </Link>
          </UserPopover>
          <UserName to={`/user/${picture.user.username}`}>
            <EmojiText text={picture.user.fullName} />
          </UserName>
        </UserBox>
        <HandleBox />
      </InfoBox>
    </ItemWrapper>
  )
}
export default memo(PictureItem)
