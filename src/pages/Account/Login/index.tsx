import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, FormikErrors } from 'formik';

import { boxMixin, btnMixin } from 'styles/mixins';
import FieldInput from 'components/Formik/FieldInput';
import { LoginSchema } from './dto';
import { rgba } from 'polished';
import { motion } from 'framer-motion';

interface IValues {
  username: string;
  password: string;
}

const Wrapper = styled.section`
  display: flex;
  /* ${boxMixin}
  margin: 0 auto;
  border: 1px solid rgb(234, 234, 234);
  width: 500px;
  margin-top: ${p => p.theme.space16x}px;
  margin-bottom: ${p => p.theme.space16x}px;
  padding: ${p => p.theme.space8x}px ${p => p.theme.space24x}px; */
`;

const BG = styled.div`
  flex: 1;
  height: 100vh;
  background-image: url('https://cdn-oss.soapphoto.com/photo/1a895f1b-a749-4eb0-86ac-3df4d0260559@!regular_webp');
  background-position: center center;
  background-size: cover;
`;
const RightBox = styled.div`
  max-width: 680px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 120px;
`;

const Content = styled.section`
  width: 100%;
  max-width: 380px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 700;
`;

const Button = styled.button`
  ${btnMixin}
  margin-top: 6px;
  width: 100%;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  box-shadow: 0 3px 11px -2px ${p => rgba(p.theme.primary, 0.6)};
  background-color: ${p => p.theme.primary};
  color: #fff;
`;

const Login = () => {
  const { t } = useTranslation();
  let location = useLocation();
  return (
    <Wrapper>
      <BG />
      <RightBox>
        <Content>
          <Title>{t('accountFeature.loginTitle')}</Title>

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
        </Content>
      </RightBox>
    </Wrapper>
  );
};

export default Login;
