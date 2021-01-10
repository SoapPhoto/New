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
  rainbow?: boolean;
}

const Avatar: React.FC<IAvatarProps> = ({
  size = 42,
  color = 'gray2',
  rainbow = false,
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
    content = <Img src={getPictureUrl(src, 'thumb')} />;
  }
  return (
    <Wrapper rainbow={rainbow ? 1 : 0} size={size} color={theme.colors[color]}>
      {content}
    </Wrapper>
  );
};

export default Avatar;
