import React, { memo } from 'react';
import { Field, FieldProps } from 'formik';
import { config, Transition } from 'react-spring/renderprops';

import styled from 'styled-components';
import Textarea, { ITextareaAutosizeProps } from '../Input/Textarea';

interface IProps extends ITextareaAutosizeProps {
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
        <Textarea {...restFieldProps} {...field} />
        <ErrorBox>
          <Transition
            config={{ ...config.stiff, friction: 18, mass: 0.8 }}
            items={!!error}
            from={{ opacity: 0, transform: 'translateY(-100%)' }}
            enter={{ opacity: 1, transform: 'translateY(0%)' }}
            leave={{ opacity: 0 }}
          >
            {show => show && (props => <Error style={props}>{error}</Error>)}
          </Transition>
        </ErrorBox>
      </LabelBox>
    );
  },
);

const FieldTextarea: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
);
export default FieldTextarea;
