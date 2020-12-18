import React from 'react';
import { config, Transition } from 'react-spring/renderprops';

import { Loading } from '..';
import { Content, LoadingBox, StyleButton } from './elements';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  loading,
  children,
  onClick,
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
  return (
    <StyleButton onClick={handleClick} loading={loading ? 1 : 0} {...props}>
      <Content>{children}</Content>
      <Transition
        config={{ ...config.stiff, friction: 18, mass: 0.8 }}
        items={!!loading}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {loading =>
          loading &&
          (props => (
            <LoadingBox style={props}>
              <Loading size={24} color="#fff" />
            </LoadingBox>
          ))
        }
      </Transition>
    </StyleButton>
  );
};

export default Button;
