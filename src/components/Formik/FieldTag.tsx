import type { FieldProps } from 'formik'
import { Field } from 'formik'
import React, { memo } from 'react'

import Tag from '../Tag'
import { LabelBox } from './elements'
import ErrorMessage from './ErrorMessage'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  required?: boolean
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
      <Tag value={field.value} onChange={v => setFieldValue(field.name, v)} />
      <ErrorMessage field={field} touched={touched} errors={errors} />
    </LabelBox>
  ),
)

const FieldTag: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
)
export default FieldTag
