import { UserEntity } from '@app/common/types/modules/user/user.entity';
import { Image } from '@app/components';
import { getPictureUrl } from '@app/utils/image';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  user: UserEntity;
}

const Cover = styled.div`
  position: relative;
  height: 240px;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 36px;
  border-radius: 16px;
  overflow: hidden;
  z-index: 0;
  background-color: ${_ => _.theme.colors.gray3};
  &:hover {
    &::after {
      opacity: 0;
    }
  }
  ::before {
    content: '';
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: saturate(150%);
  }
  ::after {
    content: '';
    z-index: 0;
    opacity: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    backdrop-filter: blur(6px);
    transition: 0.3s all ease;
    /* background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 23.44%,
      rgba(0, 0, 0, 0) 53.9%,
      rgba(0, 0, 0, 0.06) 72.97%,
      rgba(0, 0, 0, 0.44) 100%
    ); */
  }
`;
const CoverImage = styled(Image)``;

const UserCover: React.FC<IProps> = ({ user }) => {
  return (
    <Cover>
      <CoverImage src={getPictureUrl(user.cover || user.avatar, 'regular')} />
    </Cover>
  );
};

export default UserCover;
