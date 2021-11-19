import isFunction from 'lodash/isFunction';
import { rgba } from 'polished';
import React, { memo, useCallback, useState } from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import styled from 'styled-components';
import { inputCss } from '.';

export interface ITextareaProps extends TextareaAutosizeProps {
  /**
   * 显示的标题
   *
   * @type {string}
   * @memberof IInputProps
   */
  label?: string;
  /**
   * 错误
   *
   * @type {string}
   * @memberof IInputProps
   */
  error?: string;
  textareaStyle?: Omit<NonNullable<React.TextareaHTMLAttributes<HTMLTextAreaElement>['style']>, 'maxHeight' | 'minHeight'> & {
    height?: number;
  };
  inputRef?: React.Ref<HTMLTextAreaElement>;
  boxStyle?: React.CSSProperties;
  focus?: boolean;
}

const TextareaBox = styled.div<{ error?: boolean; focus?: boolean }>`
  ${inputCss}
  line-height: 24px;
  & textarea {
    width: 100%;
    resize:none;
    background: none;
    border: none;
    outline: 0;
    overflow: hidden;
    transition: .1s height ease;
    display: block;
    color: ${(props) => rgba(props.theme.colors.text, 0.9)};
    &::placeholder {
      color: ${(_) => rgba(_.theme.colors.text, 0.7)};
    }
  }
`;

const Textarea: React.FC<ITextareaProps> = memo(({
  label,
  style,
  className,
  textareaStyle,
  boxStyle,
  error,
  focus: inputFocus,
  onFocus,
  onBlur,
  inputRef,
  minRows = 2,
  ...restProps
}) => {
  const [focus, setFocus] = useState(false);
  const onBaseFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocus(true);
    if (isFunction(onFocus)) {
      onFocus(e);
    }
  }, [onFocus]);
  const onBaseBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocus(false);
    if (isFunction(onBlur)) {
      onBlur(e);
    }
  }, [onBlur]);
  return (
    <TextareaBox
      className={className}
      error={!!error}
      focus={inputFocus !== undefined ? inputFocus : focus}
      style={boxStyle}
    >
      <TextareaAutosize
        minRows={minRows}
        style={textareaStyle}
        onFocus={onBaseFocus}
        onBlur={onBaseBlur}
        ref={inputRef}
        {...restProps}
      />
    </TextareaBox>
  );
});

export default Textarea;
