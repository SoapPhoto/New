import React from 'react';
import { Search, UploadCloud } from 'react-feather';
import styled from 'styled-components';

import { A } from '@app/components';
import { space } from '@app/utils/theme';
import { observer } from 'mobx-react';
import { useAccount } from '@app/stores/hooks';
import Avatar from '../Avatar';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: ${space(8)}px;
`;
export const Right = observer(() => {
  const { init, userInfo } = useAccount();
  if (!init) {
    return <div />;
  }
  return (
    <Wrapper>
      {userInfo ? (
        <Avatar size={36} src={userInfo.avatar} />
      ) : (
        <>
          <A to="/search">
            <Search />
          </A>
          <A to="/upload">
            <UploadCloud />
          </A>
        </>
      )}
    </Wrapper>
  );
});
