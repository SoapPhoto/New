import { FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import React, { memo, useMemo } from 'react';
import { config, Transition } from 'react-spring/renderprops';
import { ErrorBox, Error } from './elements';

interface IProps {
  field: FieldInputProps<any>;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
}

const ErrorMessage: React.FC<IProps> = memo(({ field, touched, errors }) => {
  const error = useMemo(
    () => (touched[field.name] ? (errors[field.name] as string) : undefined),
    [errors, field.name, touched],
  );
  return (
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
  );
});

export default ErrorMessage;
