import { FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import { config, Transition } from 'react-spring/renderprops';
import { ErrorBox, Error } from './elements';

interface IProps {
  field: FieldInputProps<any>;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
}

const ErrorMessage: React.FC<IProps> = ({ field, touched, errors }) => {
  const [err, setErr] = useState<string>('');
  useEffect(() => {
    if (touched[field.name] && errors[field.name]) {
      setErr(errors[field.name] as string);
    }
  }, [errors, field.name, touched]);
  const error = useMemo(
    () => (touched[field.name] ? (errors[field.name] as string) : undefined),
    [errors, field.name, touched],
  );
  const props = useSpring({
    opacity: error ? 1 : 0,
    transform: error ? 'translateY(0%)' : 'translateY(-100%)',
    config: { ...config.stiff, friction: 18, mass: 0.8 },
  });
  return (
    <ErrorBox>
      <div>
        <Error style={props}>{err}</Error>
      </div>
    </ErrorBox>
  );
};

export default ErrorMessage;
