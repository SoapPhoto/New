import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import FieldInput from 'components/Formik/FieldInput';
import { LoginSchema } from './dto';
import { motion } from 'framer-motion';
import { GitHubLogo } from 'components/Icons';
import { Weibo } from 'components/Icons/Weibo';
import {
  Button,
  Des,
  GithubOauthBtn,
  OauthBox,
  Tips,
  Title,
  WeiboOauthBtn,
} from '../styles';

interface IValues {
  username: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const transition = { duration: 0.5 };
  const variants = {
    initial: { transform: 'translateX(-5%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1, transition },
    exit: {
      transform: 'translateX(5%)',
      opacity: 0,
      transition: { ...transition },
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      <Title>{t('accountFeature.loginTitle')}</Title>
      <Des>
        新用户？<Link to="/register">创建账户</Link>
      </Des>
      <Formik<IValues>
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema(t)}
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
          <Button type="submit">登录</Button>
        </Form>
      </Formik>
      <Tips>使用其他账号登录</Tips>
      <OauthBox>
        <GithubOauthBtn>
          <GitHubLogo color="#fff" />
        </GithubOauthBtn>
        <WeiboOauthBtn>
          <Weibo color="#fff" />
        </WeiboOauthBtn>
      </OauthBox>
    </motion.div>
  );
};

export default Login;
