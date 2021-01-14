import React from 'react';
import {
  PictureBox,
  PictureContent,
  PictureImageBox,
  PictureWrapper,
  SkeletonAvatar,
  SkeletonPicture,
  SkeletonUserName,
  UserHeader,
  UserHeaderWrapper,
  UserInfo,
  UserInfoRight,
  Wrapper,
} from './elements';

const PictureSkeleton = () => (
  <Wrapper>
    <UserHeaderWrapper>
      <UserHeader>
        <UserInfo>
          <SkeletonAvatar />
          <UserInfoRight>
            <SkeletonUserName />
          </UserInfoRight>
        </UserInfo>
      </UserHeader>
    </UserHeaderWrapper>
    <PictureWrapper>
      <PictureContent>
        <PictureBox num={1}>
          <PictureImageBox height={100} background="transparent">
            <SkeletonPicture />
          </PictureImageBox>
        </PictureBox>
      </PictureContent>
    </PictureWrapper>
  </Wrapper>
);

export default PictureSkeleton;
