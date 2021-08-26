import React, { memo } from 'react';
import { Field, FieldProps } from 'formik';

import Input, { IInputProps } from '../Input';
import { Label, LabelBox, RequiredX } from './elements';
import ErrorMessage from './ErrorMessage';
import { css } from 'styled-components';

interface IProps extends IInputProps {
  name: string;
  label?: string;
  required?: boolean;
}
const Component: React.FC<FieldProps & IProps> = memo(
  ({
    field,
    label,
    className,
    style,
    required,
    form: { touched, errors },
    ...restFieldProps
  }) => {
    return (
      <LabelBox className={className} style={style}>
        {label && (
          <Label>
            {required && <RequiredX>*</RequiredX>}
            <span>{label}</span>
          </Label>
        )}
        <Input {...restFieldProps} {...field} />
        <ErrorMessage field={field} touched={touched} errors={errors} />
      </LabelBox>
    );
  },
);

const FieldInput: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
);
export default FieldInput;
