import { Field, FieldProps } from 'formik';
import React, { CSSProperties, memo, useState } from 'react';
import { ReactSwitchProps } from 'react-switch';

import { FieldItem } from '.';
import { Switch } from '..';

interface IProps extends Omit<ReactSwitchProps, 'checked' | 'onChange'> {
  label: string;
  name: string;
  bio?: string;
  style?: CSSProperties;
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
  }) => {
    return (
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
    );
  },
);

const FieldSwitch: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
);
export default FieldSwitch;
