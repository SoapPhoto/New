import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';

import FieldInput from '@app/components/Formik/FieldInput';
import { useSpring, animated } from 'react-spring';
import Button from '@app/components/Button';
import { register } from '@app/services/account';
import isArray from 'lodash/isArray';
import { observer } from 'mobx-react';
import { useAccount } from '@app/stores/hooks';
import { toast } from 'react-hot-toast';
import { RegisterSchema } from '../dto';
import { Des, Title } from '../elements';

const a = animated as any;
interface IValues {
  email: string;
  username: string;
  password: string;
}
const Register = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { registerLogin } = useAccount();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const timer = useRef<number>();
  const [props, animate] = useSpring(() => ({
    opacity: 0,
    transform: 'translateX(-5%)',
  }));
  useEffect(() => {
    timer.current = window.setTimeout(() => {
      animate.start({
        opacity: 1,
        transform: 'translateX(0%)',
      });
    }, 100);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = useCallback(
    async (values: IValues, { setFieldError }: FormikHelpers<IValues>) => {
      setConfirmLoading(true);
      try {
        const data = await register(values);
        registerLogin(data);
        toast.success(t('auth.message.register_success') as string);
        navigate('/login', { replace: true });
      } catch (error) {
        const { message } = error as any;
        if (isArray(message)) {
          message.forEach((err) => {
            setFieldError(
              err.param,
              t(`error.${err.message[0]}` as any, {
                defaultValue: err.message[0],
              }) as string,
            );
          });
        } else {
          toast.error(message);
        }
        setConfirmLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <a.div style={props}>
      <Title>{t('accountFeature.registerTitle')}</Title>
      <Des>
        <Trans i18nKey="accountFeature.registerMessage">
          已有账户？
          <Link to="/login">登录</Link>
        </Trans>
      </Des>
      <Formik<IValues>
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={RegisterSchema(t)}
      >
        <Form>
          <FieldInput
            required
            name="email"
            label={t('label.email') as string}
          />
          <FieldInput
            required
            name="username"
            label={t('label.username') as string}
            style={{ marginTop: '6px' }}
          />
          <FieldInput
            required
            label={t('label.password') as string}
            name="password"
            type="password"
            style={{ marginTop: '6px' }}
          />
          <Button loading={confirmLoading} htmlType="submit">
            {t('accountFeature.registerBtn')}
          </Button>
        </Form>
      </Formik>
    </a.div>
  );
});

export default Register;
