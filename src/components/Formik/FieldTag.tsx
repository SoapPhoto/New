import React, { memo } from 'react';
import { Field, FieldProps } from 'formik';

import { ITextareaAutosizeProps } from '../Input/Textarea';
import { LabelBox } from './elements';
import ErrorMessage from './ErrorMessage';
import Tag from '../Tag';

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
  }) => (
    <LabelBox className={className} style={style}>
      <Tag value={field.value} onChange={(v) => setFieldValue(field.name, v)} />
      <ErrorMessage field={field} touched={touched} errors={errors} />
    </LabelBox>
  ),
);

const FieldTag: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
);
export default FieldTag;
