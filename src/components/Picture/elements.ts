import { darken, rgba } from 'polished';
import styled from 'styled-components';

export const ListWrapper = styled.div`
  /* max-width: 1440px; */
  margin: 0 auto;
`;

export const ItemWrapper = styled.div<{ color: string }>`
  position: absolute;
  will-change: transform, width, height, opacity;
  border-radius: 3px;
  box-shadow: 0px 0px 30px 0px ${p => darken(0.5, rgba(p.color, 0.5))};
  background-color: ${p => p.color};
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
