import { A } from 'components/A';
import React, { memo } from 'react';
import { Search, UploadCloud } from 'react-feather';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: ${p => p.theme.space8x}px;
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
