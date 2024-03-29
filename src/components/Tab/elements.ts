import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

import { btnMixin } from '@app/styles/mixins';

export const ItemLink = styled(NavLink)`
  ${btnMixin}
  padding-left: 24px;
  padding-right: 24px;
  font-size: 14px;
  line-height: 38px;
  margin-right: 8px;
  border-radius: 22px;
  &.active {
    color: ${(_) => _.theme.colors.text};
    background-color: ${(_) => _.theme.colors.gray4};
    font-weight: 700;
  }
  color: ${(_) => _.theme.colors.secondary};
  font-weight: 400;
  transition: 0.2s all ease;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  ${ItemLink}:last-child {
    margin-right: 0px;
  }
`;
