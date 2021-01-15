import React, { memo } from 'react';
import { Field, FieldProps } from 'formik';

import Textarea, { ITextareaAutosizeProps } from '../Input/Textarea';
import { Label, LabelBox } from './elements';
import ErrorMessage from './ErrorMessage';
import { css } from 'styled-components';
import { Tag } from '..';

interface IProps extends ITextareaAutosizeProps {
  name: string;
  required?: boolean;
}

const Component: React.FC<FieldProps<string[]> & IProps> = memo(
  ({
    field,
    className,
    style,
    required,
    form: { touched, errors, setFieldValue },
    ...restFieldProps
  }) => {
    return (
      <LabelBox className={className} style={style}>
        <Tag value={field.value} onChange={v => setFieldValue(field.name, v)} />
        <ErrorMessage field={field} touched={touched} errors={errors} />
      </LabelBox>
    );
  },
);

const FieldTag: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
);
export default FieldTag;
