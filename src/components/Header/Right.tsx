import { A } from '@app/components/A';
import React, { memo } from 'react';
import { Search, UploadCloud } from 'react-feather';
import styled from 'styled-components';
import { space } from '@app/utils/theme';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: ${space(8)}px;
`;
export const Right = memo(() => {
  return (
    <Wrapper>
      <A to="/search">
        <Search />
      </A>
      <A to="/upload">
        <UploadCloud />
      </A>
    </Wrapper>
  );
});
