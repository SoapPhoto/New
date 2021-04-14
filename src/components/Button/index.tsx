import React from 'react';
import { config, Transition, useSpring } from 'react-spring';

import { Loading } from '..';
import { StrutAlign } from '../Icons';
import { Content, LoadingBox, StyleButton } from './elements';

export interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  loading?: boolean;
  type?: 'primary' | 'text';
  htmlType?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'large';
  danger?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({
  loading,
  children,
  onClick,
  size,
  htmlType,
  icon,
  type = 'primary',
  danger,
  ...props
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    if (loading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >)(e);
    }
  };
  const loadingSpringProps = useSpring({
    opacity: loading ? 1 : 0,
    // config: { ...config.stiff, friction: 18, mass: 0.8 },
  });
  return (
    <StyleButton
      size={size}
      onClick={handleClick}
      loading={loading}
      danger={danger}
      {...props}
      btnType={type}
      type={htmlType}
    >
      <Content>
        <StrutAlign>{icon}</StrutAlign>
        {children}
      </Content>
      <LoadingBox style={loadingSpringProps}>
        <Loading size={24} color="#fff" />
      </LoadingBox>
    </StyleButton>
  );
};

export default Button;
