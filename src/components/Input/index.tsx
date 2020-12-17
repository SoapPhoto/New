import React from 'react';
import styled from 'styled-components';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyleInput = styled.input`
  width: 100%;
  line-height: 28px;
  margin: 0;
  padding: 5px 10px;
  transition: border 0.25s ease;
  text-align: left;
  border: none;
  border-radius: 5px;
  outline: 0;
  transition: border 0.2s, color 0.2s ease-out, box-shadow 0.2s ease;
  font-size: 14px;
  transition: all 0.25s ease;
  background-color: ${p => p.theme.widget.input.bg};
  color: ${p => p.theme.colors.text};
  &:focus {
    background-color: ${p => p.theme.widget.input.hoverBg};
  }
`;

const Input: React.FC<IInputProps> = ({ ...restProps }) => {
  return <StyleInput {...restProps} />;
};

export default Input;
