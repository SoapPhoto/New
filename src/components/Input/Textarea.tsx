import React from 'react';
import styled from 'styled-components';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

import { inputCss } from '.';

export interface ITextareaAutosizeProps extends TextareaAutosizeProps {}

const StyleInput = styled(TextareaAutosize)`
  ${inputCss}
`;

const Textarea: React.FC<ITextareaAutosizeProps> = ({
  minRows = 3,
  ...restProps
}) => {
  return <StyleInput minRows={minRows} {...restProps} />;
};

export default Textarea;
