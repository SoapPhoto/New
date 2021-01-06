import React from 'react';
import { Search, UploadCloud } from 'react-feather';
import styled from 'styled-components';

import { A, Button } from '@app/components';
import { space } from '@app/utils/theme';
import { observer } from 'mobx-react';
import { useAccount } from '@app/stores/hooks';
import Avatar from '../Avatar';
import { skeletonCss } from '@app/styles/mixins';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: ${space(8)}px;
`;

export const SkeletonItem = styled.div`
  width: 80px;
  height: 12px;
  border-radius: 4px;
  margin-right: 12px;
  ${skeletonCss}
`;

const SkeletonAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  ${skeletonCss}
`;

export const Right = observer(() => {
  const { init, userInfo } = useAccount();
  if (!init) {
    return (
      <Wrapper>
        <SkeletonItem />
        <SkeletonAvatar />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {userInfo ? (
        <>
          <A style={{ marginRight: 16 }} to="/upload">
            <UploadCloud />
          </A>
          <Avatar size={36} src={userInfo.avatar} />
        </>
      ) : (
        <>
          <A style={{ marginRight: 16 }} to="/search">
            <Search />
          </A>
          <A to="/login">登录</A>
        </>
      )}
    </Wrapper>
  );
});
