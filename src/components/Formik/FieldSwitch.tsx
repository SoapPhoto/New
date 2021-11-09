import { Field, FieldProps } from 'formik';
import React, { CSSProperties, memo } from 'react';
import { Switch, SwitchProps } from '@arco-design/web-react';

import { FieldItem } from '.';

import '@arco-design/web-react/es/Switch/style/index.js';

interface IProps extends Omit<SwitchProps, 'checked' | 'onChange'> {
  label: string;
  name: string;
  bio?: string;
  style?: CSSProperties;
  className?: string;
}

const Component = memo<FieldProps<boolean> & IProps>(
  ({
    bio,
    field,
    label,
    className,
    form: { touched, errors, setFieldValue },
    style,
    ...restFieldProps
  }) => (
    <FieldItem
      onClick={() => {
        setFieldValue(field.name, !field.value);
      }}
      label={label}
      bio={bio}
      style={style}
      className={className}
    >
      <Switch checked={field.value} onChange={() => {}} />
    </FieldItem>
  ),
);

const FieldSwitch: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
);
export default FieldSwitch;
