import React from 'react';
import { SvgProps, Twemoji } from 'react-emoji-render';
import styled from 'styled-components/macro';

type RequireProperty<T, Prop extends keyof T> = T & { [key in Prop]-?:T[key] };
type PropsRequireTextOrChildren<T extends SvgProps> = RequireProperty<T, 'text'> | RequireProperty<T, 'children'>;

const StyledEmoji = styled(Twemoji)`
  word-wrap: break-word;
  word-break: break-all;
  img {
    width: 1.3em !important;
    height: 1.3em !important;
    vertical-align: -0.15em !important;
  }
`;

const EmojiText: React.FC<PropsRequireTextOrChildren<SvgProps>> = ({ svg = true, ...props }) => (
  <StyledEmoji svg={svg} onlyEmojiClassName="emoji-text" {...props} />
);
export default EmojiText;
