import { customMedia } from '@app/styles/mediaQuery';
import { skeletonCss } from '@app/styles/mixins';
import { cover, darken, rgba } from 'polished';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const ListWrapper = styled.div`
  /* max-width: 1440px; */
  margin: 0 auto;
`;

export const ItemWrapper = styled.div<{ color: string }>`
  position: absolute;
  will-change: transform, width, height, opacity;
  border-radius: 3px;
  box-shadow: 0px 0px 30px 0px ${p => darken(0.3, rgba(p.color, 0.3))};
  background-color: ${p => p.color};
`;

const handleHover = css`
  opacity: 0;
  transition: 0.2s opacity ease-in-out;
  ${customMedia.lessThan('mobile')`
    opacity: 1;
  `}
  ${ItemWrapper}:hover & {
    opacity: 1;
  }
`;

export const ItemBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 3px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: block;
  pointer-events: none;
  width: 100%;
  height: 100%;
  transition: 0.2s filter ease-in-out;
  border-radius: inherit;
  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const LazyImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

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
`;

export const A = styled(Link)`
  ${cover()}
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    overflow: hidden;
    bottom: 0;
    left: 0;
    right: 0;
    height: 220px;
    pointer-events: none;
    border-radius: 4px;
    background: linear-gradient(
      180deg,
      transparent 62%,
      rgba(0, 0, 0, 0.00345888) 63.94%,
      rgba(0, 0, 0, 0.014204) 65.89%,
      rgba(0, 0, 0, 0.0326639) 67.83%,
      rgba(0, 0, 0, 0.0589645) 69.78%,
      rgba(0, 0, 0, 0.0927099) 71.72%,
      rgba(0, 0, 0, 0.132754) 73.67%,
      rgba(0, 0, 0, 0.177076) 75.61%,
      rgba(0, 0, 0, 0.222924) 77.56%,
      rgba(0, 0, 0, 0.267246) 79.5%,
      rgba(0, 0, 0, 0.30729) 81.44%,
      rgba(0, 0, 0, 0.341035) 83.39%,
      rgba(0, 0, 0, 0.367336) 85.33%,
      rgba(0, 0, 0, 0.385796) 87.28%,
      rgba(0, 0, 0, 0.396541) 89.22%,
      rgba(0, 0, 0, 0.4) 91.17%
    );
    ${handleHover}
  }
  z-index: 2;
`;

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
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  pointer-events: all;
`;

export const HandleBox = styled.div`
  display: flex;
  align-items: center;
  & svg {
    filter: drop-shadow(0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.3));
  }
`;

export const UserName = styled(Link)`
  text-decoration: none;
  margin-left: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  text-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.3);
`;

export const SkeletonContent = styled.div`
  display: grid;
  grid-gap: 24px;
  ${customMedia.lessThan('mobile')`
    grid-template-columns: repeat(1, 1fr);
  `}

  ${customMedia.between('mobile', 'medium')`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${customMedia.between('medium', 'large')`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${customMedia.greaterThan('large')`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

export const SkeletonItem = styled.picture`
  position: relative;
  height: 210px;
  border-radius: 4px;
  background: ${p => p.theme.widget.skeleton.background};
  box-shadow: 0 5px 10px ${p => p.theme.widget.skeleton.shadow};
`;

export const SkeletonAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  bottom: 12px;
  left: 12px;
  ${skeletonCss}
`;

export const SkeletonName = styled.div`
  width: 80px;
  height: 12px;
  border-radius: 4px;
  position: absolute;
  bottom: 21px;
  left: 50px;
  ${skeletonCss}
`;
