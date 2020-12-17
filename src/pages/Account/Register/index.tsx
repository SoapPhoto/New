import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import FieldInput from 'components/Formik/FieldInput';
import { Button, Des, Title } from '../styles';
import { useSpring, animated } from 'react-spring';

interface IValues {
  username: string;
  password: string;
}
const Register = () => {
  const { t } = useTranslation();
  const timer = useRef<number>();
  const [props, set] = useSpring(() => ({
    opacity: 0,
    transform: 'translateX(-5%)',
  }));
  useEffect(() => {
    timer.current = setTimeout(() => {
      set({
        opacity: 1,
        transform: 'translateX(0%)',
      });
    }, 100);
    return () => clearTimeout(timer.current);
  }, []);
  return (
    <animated.div style={props}>
      <Title>注册</Title>
      <Des>
        已有账户？<Link to="/login">登录</Link>
      </Des>
      <Formik<IValues>
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
        }}
      >
        <Form>
          <FieldInput label={t('label.username')} name="username" />
          <FieldInput
            label={t('label.password')}
            name="password"
            style={{ marginTop: '6px' }}
          />
          <FieldInput
            label={t('label.password')}
            name="password"
            style={{ marginTop: '6px' }}
          />
          <Button type="submit">注册</Button>
        </Form>
      </Formik>
    </animated.div>
  );
};

export default Register;
