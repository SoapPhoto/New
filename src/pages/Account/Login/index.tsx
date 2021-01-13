import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useSpring, animated } from 'react-spring';

import FieldInput from '@app/components/Formik/FieldInput';
import { LoginSchema } from './dto';
import { GitHubLogo } from '@app/components/Icons';
import { Weibo } from '@app/components/Icons/Weibo';
import {
  Des,
  GithubOauthBtn,
  OauthBox,
  Tips,
  Title,
  WeiboOauthBtn,
} from '../elements';
import { useAccount } from '@app/stores/hooks';
import { Button, Toast } from '@app/components';

interface IValues {
  username: string;
  password: string;
}

const Login = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = useCallback(
    async (values: IValues) => {
      setConfirmLoading(true);
      try {
        await login(values.username, values.password);
      } catch (error) {
        if (error.message === 'Invalid grant: user credentials are invalid') {
          Toast.error(t('error.oauth.user_credentials_invalid') as string);
        } else {
          Toast.error(error.message);
        }
        setConfirmLoading(false);
      }
    },
    [login, t],
  );
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
        onSubmit={onSubmit}
      >
        <Form>
          <FieldInput label={t('label.username') as string} name="username" />
          <FieldInput
            label={t('label.password') as string}
            name="password"
            type="password"
            style={{ marginTop: '6px' }}
          />
          <Button loading={confirmLoading} type="submit">
            登录
          </Button>
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
