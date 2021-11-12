import { customBreakpoints, customMedia } from '@app/styles/mediaQuery';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { animated } from 'react-spring';
import { darken, lighten, rgba } from 'polished';
import { Heart } from 'react-feather';

import IconButtonComponent from '@app/components/Button/IconButton';
import { initButton, skeletonCss } from '@app/styles/mixins';

export const Wrapper = styled.div``;

export const UserHeaderWrapper = styled.div`
  border-top: 1px solid ${(p) => p.theme.colors.border};
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
`;
export const UserHeader = styled.div`
  margin: 0 auto;
  max-width: calc(${customBreakpoints.medium} + 42px);
  padding: 12px 24px;
`;
export const UserLink = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  color: ${(p) => p.theme.colors.text};
`;
export const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
export const UserInfo = styled.div`
  display: flex;
`;
export const UserInfoRight = styled.div`
  margin-left: 12px;
`;
export const UserHeaderInfo = styled.div``;
export const BaseInfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${(p) => p.theme.colors.secondary};
  & svg {
    margin-right: 6px;
    margin-top: -2px;
  }
`;
export const TimeSpan = styled.span`
  font-size: 13px;
  font-weight: 400;
`;

export const PictureWrapper = styled.article`
  /* background-color: ${(p) => p.theme.colors.gray1}; */
  padding: 24px;
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
`;

export const PictureContent = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;

export const PictureBox = styled.div<{ num: number }>`
  cursor: zoom-in;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  ${customMedia.greaterThan('mobile')`
    max-width: calc(calc(100vh - ${84 + 71 + 2 + 48}px) * ${(_) => (_ as any).num});
    min-width: 500px;
  `}
  ${customMedia.lessThan('mobile')`
    border-radius: 0;
  `}
`;

export const PictureImageBox = styled.div<{
  height: number;
  background: string;
}>`
  position: relative;
  display: block;
  pointer-events: none;
  padding-bottom: ${(props) => props.height}%;
  background-color: ${(props) => props.background};
  width: 100%;
  transition: 0.2s filter ease-in-out;
  border-radius: 4px;
  overflow: hidden;
`;

export const PictureImage = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const SkeletonAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  ${skeletonCss}
`;

export const SkeletonUserName = styled.div`
  width: 80px;
  height: 12px;
  border-radius: 4px;
  ${skeletonCss}
`;

export const SkeletonPicture = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  ${skeletonCss}
`;

export const Content = styled.div`
  max-width: calc(${customBreakpoints.medium} + 42px);
  margin: 34px auto 12px auto;
  padding: 0 24px;
  margin-top: 0;
`;
export const PictureBaseInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(p) => p.theme.colors.secondary};
  padding: 18px 0;
  margin-bottom: 18px;
  box-shadow: inset 0px -1px 0px ${(p) => p.theme.colors.border};
`;

export const LikeContent = styled(animated.button as any)`
  ${initButton}
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: ${(_) => rgba(_.theme.colors.gray4, 0.8)}; */
  border: 1px solid ${(p) => p.theme.colors.border};
  padding: 6px 16px;
  font-size: 12px;
  border-radius: 20px;
  line-height: 20px;
  font-weight: 600;
  color: ${(p) => p.theme.colors.secondary};
`;

export const HeartIcon = styled(Heart)<{ islike: number }>`
  stroke: ${(p) => p.theme.colors.error};
  fill: ${(_) => (_.islike ? _.theme.colors.error : 'none')};
  stroke: ${(_) => (_.islike ? _.theme.colors.error : _.theme.colors.secondary || '#fff')};
  margin-right: 6px;
`;

export const IconButton = styled(IconButtonComponent)`
  svg {
    stroke: ${(p) => p.theme.colors.secondary};
  }
`;

export const Title = styled.h2`
  font-size: 26px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

export const Bio = styled.div`
  font-size: 14px;
  margin-top: 16px;
  padding-bottom: 24px;
`;

export const NewContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-top: 1px solid ${(p) => p.theme.colors.border};
`;

export const LeftBox = styled.div`
  flex: 1;
  border-right: 1px solid ${(p) => p.theme.colors.border};
`;

export const RightBox = styled.div`
  width: 430px;
`;

export const TagBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -12px;
`;

export const Tag = styled.div`
  border: 1px solid ${(p) => p.theme.colors.border};
  line-height: 16px;
  height: 32px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  margin-left: 12px;
  font-size: 13px;
  transition: all 0.25s ease;
  color: ${(_) => _.theme.colors.text};
  &:hover {
    background: ${(_) => _.theme.colors.primary};
    color: #fff;
  }
`;

export const PictureInfoBtnsBox = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-flow: column;
`;

export const HeaderUserInfoFollowBtnBox = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
`;

export const LockIcon = styled.div`
  z-index: 2;
  top: 12px;
  left: 12px;
  width: 30px;
  height: 30px;
`;
