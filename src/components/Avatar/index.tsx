import React from 'react';
import { css, useTheme } from 'styled-components/macro';

import light from '@app/styles/theme/themes/light';
import { getPictureUrl } from '@app/utils/image';
import { Wrapper, Text, Img } from './elements';

type ColorType = keyof typeof light.colors;

interface IAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  src?: string;
  size?: number;
  color?: ColorType;
  alt?: string;
  rainbow?: boolean;
  online?: boolean;
  borderSize?:number;
}

const Avatar: React.FC<IAvatarProps> = ({
  size = 42,
  color = 'gray2',
  rainbow,
  src,
  text,
  online,
  borderSize = 2,
  children,
  alt,
  ...restProps
}) => {
  const theme = useTheme();
  let content: React.ReactNode = children;
  if (text) {
    content = <Text total={text.length}>{text}</Text>;
  }
  if (src) {
    content = <Img src={getPictureUrl(src, 'thumb')} />;
  }
  const isBorder = !!(rainbow || online);
  return (
    <Wrapper
      {...restProps}
      // eslint-disable-next-line no-nested-ternary
      border={isBorder ? 1 : 0}
      rainbow={rainbow ? 1 : 0}
      online={online ? 1 : 0}
      size={size}
      color={theme.colors[color]}
    >
      {
        isBorder ? (
          <div
            css={css`
              border-radius: 100%;
              position: relative;
              padding: 2px;
              background: ${(p) => p.theme.background};
            `}
            style={{
              width: `calc(100% - ${borderSize}px)`,
              height: `calc(100% - ${borderSize}px)`,
            }}
          >
            {content}
          </div>
        ) : content
      }
    </Wrapper>
  );
};

export default Avatar;
