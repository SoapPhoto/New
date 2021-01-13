import React from 'react';
import styled, { css } from 'styled-components';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const inputCss = css`
  width: 100%;
  line-height: 28px;
  margin: 0;
  padding: 5px 10px;
  transition: border 0.25s ease;
  text-align: left;
  border: 1px solid;
  border-radius: 5px;
  outline: 0;
  transition: border 0.2s, background-color 0.2s, color 0.2s ease-out,
    box-shadow 0.2s ease;
  font-size: 14px;
  background-color: ${p => p.theme.widget.input.bg};
  color: ${p => p.theme.colors.text};
  border-color: ${p => p.theme.widget.input.bg};
  &:focus,
  &:hover {
    border-color: ${p => p.theme.colors.primary};
    box-shadow: 0 1px 4px -1px ${p => p.theme.colors.primary};
  }
  &:focus {
    background-color: ${p => p.theme.widget.input.hoverBg};
  }
`;

const StyleInput = styled.input`
  ${inputCss}
`;

const Input: React.FC<IInputProps> = ({ ...restProps }) => {
  return <StyleInput {...restProps} />;
};

export default Input;
