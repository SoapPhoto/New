import React, { memo } from 'react';
import { Field, FieldProps } from 'formik';

import Textarea, { ITextareaAutosizeProps } from '../Input/Textarea';
import { Label, LabelBox } from './elements';
import ErrorMessage from './ErrorMessage';
import { css } from 'styled-components';

interface IProps extends ITextareaAutosizeProps {
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
            {required && (
              <span
                css={css`
                  margin-right: 4px;
                  color: ${p => p.theme.colors.error};
                `}
              >
                *
              </span>
            )}
            <span>{label}</span>
          </Label>
        )}
        <Textarea {...restFieldProps} {...field} />
        <ErrorMessage field={field} touched={touched} errors={errors} />
      </LabelBox>
    );
  },
);

const FieldTextarea: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
);
export default FieldTextarea;
