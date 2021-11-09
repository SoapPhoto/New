import React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { rem } from 'polished';

import { A } from '@app/components';
import { space } from '@app/utils/theme';
import { Icon } from './Icon';
import { Right } from './Right';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${() => rem(84)};
  transition: 0.2s all ease;
`;

export const Logo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: ${space(8)}px;
`;

const Header = () => {
  const theme = useTheme();
  return (
    <Wrapper>
      <Logo>
        <A to="/">
          <Icon size={36} color={theme.colors.text} />
        </A>
      </Logo>
      <Right />
    </Wrapper>
  );
};

export default Header;
