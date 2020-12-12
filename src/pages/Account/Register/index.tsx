import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';

import FieldInput from 'components/Formik/FieldInput';
import { Button, Des, Title } from '../styles';

interface IValues {
  username: string;
  password: string;
}
const Register = () => {
  const { t } = useTranslation();
  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
  const variants = {
    initial: { transform: 'translateX(5%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1, transition },
    exit: {
      transform: 'translateX(-5%)',
      opacity: 0,
      transition: { ...transition },
    },
  };
  return (
    <motion.div
      exit="exit"
      initial="initial"
      animate="enter"
      variants={variants}
    >
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
    </motion.div>
  );
};

export default Register;
