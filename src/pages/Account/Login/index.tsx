import React, { useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useSpring, animated } from 'react-spring';

import FieldInput from '@app/components/Formik/FieldInput';
import { LoginSchema } from './dto';
import { GitHubLogo } from '@app/components/Icons';
import { Weibo } from '@app/components/Icons/Weibo';
import {
  Button,
  Des,
  GithubOauthBtn,
  OauthBox,
  Tips,
  Title,
  WeiboOauthBtn,
} from '../styles';
import { useAccount } from '@app/stores/hooks';

interface IValues {
  username: string;
  password: string;
}

const Login = () => {
  const { login } = useAccount();
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
      <Title>{t('accountFeature.loginTitle')}</Title>
      <Des>
        <Trans i18nKey="accountFeature.loginMessage">
          新用户？<Link to="/register">创建账户</Link>
        </Trans>
      </Des>
      <Formik<IValues>
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema(t)}
        onSubmit={(values, actions) => {
          login(values.username, values.password);
        }}
      >
        <Form>
          <FieldInput label={t('label.username') as string} name="username" />
          <FieldInput
            label={t('label.password') as string}
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
    </animated.div>
  );
};

export default Login;
