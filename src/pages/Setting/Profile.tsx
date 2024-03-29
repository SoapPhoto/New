import {
  FieldInput, FieldTextarea,
} from '@app/components';
import { useAccount } from '@app/stores/hooks';
import { Form, Formik } from 'formik';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// import '@arco-design/web-react/es/Radio/style/index.js';
import { css } from 'styled-components/macro';
import pick from 'lodash/pick';
import { useMutation } from '@apollo/client';
import { UpdateProfile } from '@app/graphql/mutations';
import toast from 'react-hot-toast';
import Button from '@app/components/Button';
import Head from '@app/components/Head';

interface IValues {
  name: string
  bio: string
  website: string
  key: string
  gender: number
  genderSecret: boolean
  birthday: Date
  birthdayShow: number
}

const SettingProfilePage = () => {
  const [updateProfile, { loading }] = useMutation(UpdateProfile);
  const { t } = useTranslation();
  const { init, userInfo } = useAccount();
  const onSubmit = useCallback(
    async (values: IValues) => {
      await updateProfile({
        variables: {
          data: {
            ...values,
          },
        },
      });
      toast.success(t('setting.profile.message.updateSuccess'));
    },
    [t, updateProfile],
  );
  return (
    <div>
      <Head title="用户设置" />
      <Formik<IValues>
        initialValues={pick(userInfo, [
          'name',
          'bio',
          'website',
          'key',
          'gender',
          'genderSecret',
          'birthday',
          'birthdayShow',
        ]) as IValues}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <FieldInput
              name="username"
              disabled
              label={t('setting.profile.label.username') as string}
              defaultValue={userInfo!.username}
            />
            <FieldInput
              name="name"
              label={t('setting.profile.label.name') as string}
            />
            <FieldInput
              name="website"
              label={t('setting.profile.label.website') as string}
            />
            <FieldTextarea
              name="bio"
              label={t('setting.profile.label.bio') as string}
              minRows={3}
            />
            <div css={css`display: flex;justify-content: flex-end;`}>
              <Button
                type="primary"
                style={{ width: 'auto' }}
                htmlType="submit"
                loading={loading}
              >
                更新设置
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SettingProfilePage;
