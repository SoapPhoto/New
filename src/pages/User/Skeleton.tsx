import { customBreakpoints, customMedia } from '@app/styles/mediaQuery';
import { skeletonCss } from '@app/styles/mixins';
import React from 'react';
import styled from 'styled-components/macro';
import UserCover from './components/UserCover';

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: -58px auto 0px;
  padding: 0px 24px;
`;

const SkeletonCover = styled.div`
  height: 240px;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 36px;
  border-radius: 16px;
  opacity: 0.4;
  ${skeletonCss}
  z-index: -1;
  ${customMedia.lessThan('mobile')`
    border-radius: 0px;
    margin-top: 0px;
  `}
  ${customMedia.lessThan('medium')`
    max-width: ${customBreakpoints.mobile};
  `}
`;

const Box = styled.div`
  display: grid;
  height: auto;
  grid-auto-flow: row;
  grid-auto-rows: minmax(20px, auto);
  grid-template-columns: 140px auto;
  gap: 32px;
  ${customMedia.lessThan('mobile')`
    grid-template-columns: 110px auto;
  `}
`;

const InfoContent = styled.div``;

export const SkeletonAvatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  opacity: 1;
  z-index: 1;
  ${customMedia.lessThan('mobile')`
    width: 110px;
    height: 110px;
  `}
  ${skeletonCss}
`;

export const SkeletonUserName = styled.div`
  width: 120px;
  height: 28px;
  border-radius: 4px;
  margin-top: 12px;
  margin-bottom: 6px;
  ${skeletonCss}
`;

const UserSkeleton = () => {
  return (
    <div>
      <SkeletonCover />
      <Wrapper>
        <Box>
          <SkeletonAvatar />
          <InfoContent>
            <SkeletonUserName />
          </InfoContent>
        </Box>
      </Wrapper>
    </div>
  );
};

export default UserSkeleton;
