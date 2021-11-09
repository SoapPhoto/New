import React from 'react';
import styled from 'styled-components/macro';

import { rem } from 'polished';
import { Link } from 'react-router-dom';
import { To } from 'history';

type IProps = React.HTMLAttributes<HTMLDivElement>;
// interface IProps extends React.HTMLAttributes<HTMLDivElement> {

// }

interface ILinkProps extends React.InputHTMLAttributes<HTMLInputElement> {
  to?: To;
}

const Wrapper = styled.div`
  width: 200px;
  font-size: 14px;
`;

const ItemWrapper = styled.div`
  padding: ${rem('8px')} ${rem('20px')};
  &:first-child {
    padding-top: ${rem('16px')};
    padding-bottom: ${rem('16px')};
  }
  &:not(:first-child) {
    border-top: 1px solid ${p => p.theme.colors.gray4};
    padding-top: ${rem('16px')};
    padding-bottom: ${rem('16px')};
  }
`;

const MenuLink = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  color: ${p => p.theme.colors.secondary};
  text-decoration: none;
  transition: color 0.2s ease 0s;
  margin: ${rem('-8px')} ${rem('-20px')};
  padding: ${rem('8px')} ${rem('20px')};
  transition: 0.2s color ease, 0.2s background ease;
  &:hover {
    color: ${p => p.theme.colors.text};
    background: ${p => p.theme.colors.gray2};
    & svg {
      stroke: ${p => p.theme.colors.text};
    }
  }
  & svg {
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 20px;
    height: 37px;
    stroke: ${p => p.theme.colors.secondary};
    transition: 0.2s stroke ease, 0.2s background ease;
  }
`;

export const MenuArrow = styled.span`
  position: absolute;
  z-index: 1;
  margin-left: ${rem('1px')};
  width: ${rem('10px')};
  height: ${rem('10px')};
  transform: rotate(45deg);
  background-color: ${p => p.theme.background};
  border: 1px solid ${p => p.theme.colors.gray1};
  margin-top: ${rem('-5px')};
  border-right-color: transparent;
  border-bottom-color: transparent;
`;

export const Menu: React.FC<IProps> = ({ children, ...restProps }) => (
  <Wrapper {...restProps}>{children}</Wrapper>
);

export const MenuItem: React.FC = ({ children }) => (
  <ItemWrapper>{children}</ItemWrapper>
);

export const MenuItemLink: React.FC<ILinkProps> = ({ to, onClick, children }) =>
  to ? (
    <Link to={to}>
      <MenuLink onClick={onClick}>{children}</MenuLink>
    </Link>
  ) : (
    <MenuLink onClick={onClick}>{children}</MenuLink>
  );
