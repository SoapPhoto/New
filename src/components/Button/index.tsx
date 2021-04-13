import React from 'react';
import { config, Transition, useSpring } from 'react-spring';

import { Loading } from '..';
import { Content, LoadingBox, StyleButton } from './elements';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  htmlType?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'large';
}

const Button: React.FC<IButtonProps> = ({
  loading,
  children,
  onClick,
  size,
  htmlType,
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
      loading={loading ? 1 : 0}
      {...props}
      type={htmlType}
    >
      <Content>{children}</Content>
      <LoadingBox style={loadingSpringProps}>
        <Loading size={24} color="#fff" />
      </LoadingBox>
    </StyleButton>
  );
};

export default Button;
