import React from 'react';
import styled, { useTheme } from 'styled-components';
import { rem } from 'polished';

import { Icon } from './Icon';
import { A } from '@app/components';
import { Right } from './Right';
import { space } from '@app/utils/theme';
import { observer } from 'mobx-react';
import { useAccount } from '@app/stores/hooks';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${_ => rem(70)};
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
          <Icon color={theme.colors.text} />
        </A>
      </Logo>
      <Right />
    </Wrapper>
  );
};

export default Header;
