import React, { memo } from 'react';
import { Field, FieldProps } from 'formik';
import Animate from 'rc-animate';

import Input, { IInputProps } from '../Input';
import styled from 'styled-components';

interface IProps extends IInputProps {
  name: string;
  label?: string;
}

const LabelBox = styled.label`
  position: relative;
  text-align: left;
  display: block;
`;
const Label = styled.span`
  display: inline-block;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.61px;
  font-size: 14px;
`;

const ErrorBox = styled.div`
  margin-top: 2px;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
`;
const Error = styled.div`
  font-size: 12px;
  color: ${p => p.theme.colors.error};
`;

const Component: React.FC<FieldProps & IProps> = memo(
  ({
    field,
    label,
    className,
    style,
    form: { touched, errors },
    ...restFieldProps
  }) => {
    const error = touched[field.name]
      ? (errors[field.name] as string)
      : undefined;
    return (
      <LabelBox className={className} style={style}>
        {label && (
          <Label>
            {/* {
              required && (
                <span css={css`margin-right: ${rem(4)};color: ${theme('colors.danger')}`}>*</span>
              )
            } */}
            <span>{label}</span>
          </Label>
        )}
        <Input {...restFieldProps} {...field} />
        <ErrorBox>
          <Animate transitionName="labelError">
            {error && <Error>{error}</Error>}
          </Animate>
        </ErrorBox>
      </LabelBox>
    );
  },
);

const FieldInput: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
);
export default FieldInput;
