import { Icon } from '@app/components/Icons';
import { customMedia } from '@app/styles/mediaQuery';
import { boxMixin } from '@app/styles/mixins';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

interface IData {
  value: string;
  name: string;
  path: string;
  icon: Icon;
}

export interface IUserProps {
  data: IData[];
}

const Box = styled.div`
${(props) => boxMixin(props.theme, '800px', true)}
  display: flex;
  flex-direction: row;
  padding: 0;
  margin-top: 46px;
  margin-bottom: 46px;
  ${customMedia.lessThan('medium')`
    flex-direction: column;
  `}
`;

const MenuBox = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  width: 25%;
  border-right: 1px solid ${({ theme }) => theme.widget.box.borderColor};
  ${customMedia.lessThan('medium')`
    width: 100%;
    overflow-y: auto;
    flex-direction: row;
    background-color: ${({ theme }) => theme.background};
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.widget.box.borderColor};
  `}
`;

const Item = styled.ul`
  display: flex;
  padding: 16px 32px;
  min-width: max-content;
  & > svg {
    margin-right: 16px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 32px;
`;

export const ItemLink = styled(NavLink)`
  color: ${(p) => p.theme.colors.secondary};
  transition: .2s all ease-in;
  svg {
    transition: .2s color ease-in;
  }
  &.active {
    font-weight: 600;
    color: ${(p) => p.theme.colors.text};
    svg {
      color: ${(p) => p.theme.colors.primary};
    }
  }
`;

export const Menu: React.FC<IUserProps> = ({
  data,
  children,
}) => (
  <Box>
    <MenuBox>
      {
        data.map((menu) => (
          <ItemLink
            key={menu.name}
            caseSensitive={false}
            end
            to={menu.path}
          >
            <Item>
              <menu.icon size={18} />
              {menu.name}
            </Item>
          </ItemLink>
        ))
      }
    </MenuBox>
    <Content>
      {children}
    </Content>
  </Box>
);
