import { customMedia } from '@app/styles/mediaQuery'
import { initButton, skeletonCss, skeletonCss2 } from '@app/styles/mixins'
import * as m from 'motion/react-client'
import { cover, darken, rgba } from 'polished'
import { Link } from 'react-router'
import { animated } from 'react-spring'
import styled, { css } from 'styled-components'
import { Heart } from '../Icons'

export const ListWrapper = styled.div`
  margin: 0 auto;
`

export const ImageWrapper = styled.div`
  position: relative;
  display: block;
  pointer-events: none;
  width: 100%;
  height: 100%;
  transition: 0.2s filter ease-in-out;
  border-radius: inherit;
  overflow: hidden;
`
export const ItemWrapper = styled(m.div)<{ color: string, isPrivate: number }>`
  position: absolute;
  will-change: transform, width, height, opacity;
  border-radius: 0px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 30px 0px ${p => darken(0.3, rgba(p.color, 0.3))};
  background-color: ${p => p.color};
  overflow: hidden;
`

export const handleHover = css`
  opacity: 0;
  transition: 0.2s opacity ease-in-out;
  ${customMedia.lessThan('mobile')`
    opacity: 1;
  `}
  ${ItemWrapper}:hover & {
    opacity: 1;
  }
`

export const ItemBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0px;
  transition: 0.2s transform ease-in-out;
  ${ItemWrapper}:hover & {
    transform: scale(1.05);
  }
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`

export const LazyImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`

export const Shadow = styled.img`
  position: absolute;
  height: 10%;
  width: 90%;
  left: 5%;
  bottom: -2px;
  background-position: bottom;
  background-size: 100%;
  filter: blur(10px);
  z-index: -1;
  opacity: 1;
`

export const A = styled(Link)`
  z-index: 2;
`

export const InfoBox = styled.div`
  z-index: 3;
  pointer-events: none;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  width: 100%;
  color: #fff;
  ${handleHover}
`

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  pointer-events: all;
`

export const HandleBox = styled.div`
  display: flex;
  align-items: center;
  & svg {
    filter: drop-shadow(0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.3));
  }
`

export const UserName = styled(Link)`
  text-decoration: none;
  margin-left: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  text-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  -webkit-font-smoothing: subpixel-antialiased;
`

export const SkeletonContent = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 4px;
  ${customMedia.lessThan('mobile')`
    grid-template-columns: repeat(1, 1fr);
  `}

  ${customMedia.between('mobile', 'medium')`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${customMedia.between('medium', 'large')`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${customMedia.between('large', 'huge')`
    grid-template-columns: repeat(4, 1fr);
  `}

  ${customMedia.greaterThan('huge')`
    grid-template-columns: repeat(5, 1fr);
  `}
`

export const SkeletonItem = styled.picture`
  position: relative;
  height: 410px;
  border-radius: 0px;
  /* opacity: 0.4; */
  ${skeletonCss2}/* background: ${p => p.theme.widget.skeleton.background};
  box-shadow: 0 5px 10px ${p => p.theme.widget.skeleton.shadow}; */
`

export const SkeletonAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  bottom: 12px;
  left: 12px;
  ${skeletonCss}
`

export const SkeletonName = styled.div`
  width: 80px;
  height: 12px;
  border-radius: 4px;
  position: absolute;
  bottom: 21px;
  left: 50px;
  ${skeletonCss}
`

export const ChoiceBox = styled.div`
  position: absolute;
  z-index: 2;
  margin-left: 12px;
  margin-top: 12px;
  width: 32px;
  height: 32px;
  /* background-image: linear-gradient(0deg, #FF9500, #F5C164); */
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LikeContent = styled(animated.button as any)`
  ${initButton}
  z-index: 3;
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${_ => rgba(_.theme.colors.pure, 0.8)};
  padding: 4px 14px;
  font-family: Rubik;
  font-size: 12px;
  border: none;
  border-radius: 20px;
  line-height: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  backdrop-filter: saturate(180%) blur(20px);
  ${handleHover}
`

export const HeartIcon = styled(Heart)<{ islike: number }>`
  stroke-width: 3px;
  stroke: ${({ theme }) => theme.colors.error};
  fill: ${_ => (_.islike ? _.theme.colors.error : 'none')};
  stroke: ${_ => (_.islike ? _.theme.colors.error : _.color || '#fff')};
  margin-right: 4px;
`
