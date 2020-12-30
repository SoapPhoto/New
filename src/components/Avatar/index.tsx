import React from 'react';
import { useTheme } from 'styled-components';
import { Wrapper, Text, Img } from './elements';

import light from '@app/styles/theme/themes/light';
import { getPictureUrl } from '@app/utils/image';

type ColorType = keyof typeof light.colors;

interface IAvatarProps {
  text?: string;
  src?: string;
  size?: number;
  color?: ColorType;
  alt?: string;
}

const Avatar: React.FC<IAvatarProps> = ({
  size = 42,
  color = 'gray2',
  src,
  text,
  children,
  alt,
}) => {
  const theme = useTheme();
  let content: React.ReactNode = children;
  if (text) {
    content = <Text total={text.length}>{text}</Text>;
  }
  if (src) {
    content = <Img alt={alt} src={getPictureUrl(src)} />;
  }
  return (
    <Wrapper size={size} color={theme.colors[color]}>
      {content}
    </Wrapper>
  );
};

export default Avatar;