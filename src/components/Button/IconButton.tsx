import React from 'react';
import styled from 'styled-components/macro';
import { animated } from 'react-spring';
import { useTapButton } from '@app/utils/hooks';
import { Popover } from '..';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  popover?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const IconButtonStyled = styled(animated.button as any)`
  font-size: 0;
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
  pointer-events: all;
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// const template = ({ scale }: any) => `translate(0, 0) scale(${scale})`;

const IconButton: React.FC<IProps> = ({
  onClick,
  popover,
  children,
  ...props
}) => {
  const [spring, bind] = useTapButton();
  const content = (
    <IconButtonStyled
      {...bind()}
      style={{
        transform: spring.transform,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </IconButtonStyled>
  );
  if (popover) {
    return (
      <Popover
        trigger="hover"
        placement="top"
        theme="dark"
        openDelay={200}
        content={<span>{popover}</span>}
      >
        {content}
      </Popover>
    );
  }
  return content;
};

export default IconButton;
