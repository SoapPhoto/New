import React, {
  useCallback, useEffect, useMemo, useState, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/macro';

import { OauthType, OauthTypeValues } from '@app/common/enum/router';
import { IGithubUserInfo, IGoogleUserInfo, IOauthUserInfo } from '@app/common/types/modules/user/user.interface';
import { useAccount } from '@app/stores/hooks';
import Button from '@app/components/Button';
import { Unlock, X } from '@app/components/Icons';
import { SignupType } from '@app/common/enum/signupType';
import { CredentialsEntity } from '@app/common/types/modules/credentials/credentials.entity';
import { observer } from 'mobx-react';
import { accountAuthorize, accountRevoke } from '@app/services/account';
import toast from 'react-hot-toast';
import {
  getOauthUrl, IOauthSuccessData, oauthOpen, oauthSuccess,
} from '@app/utils/oauth';
import { OauthStateType } from '@app/common/enum/oauthState';
import { Confirm } from '@app/components/Modal/Confirm';

interface IInfo {
  title: string;
}

const Title = styled.h2`
  font-weight: 600;
  margin-bottom: 24px;
`;

const List = styled.div`
  display: grid;
  grid-gap: 12px;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 6px 0;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

const InfoTitle = styled.h3`
  font-size: 16px;
`;

const InfoTip = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const CrInfo = styled.div`
  display: flex;
  align-items: center;
`;

const InfoName = styled.h4`
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
`;

const CredentialInfo: Record<OauthType, IInfo> = {
  [OauthType.GITHUB]: {
    title: 'Github',
  },
  [OauthType.GOOGLE]: {
    title: 'Google',
  },
  [OauthType.WEIBO]: {
    title: '微博',
  },
};

function oauthInfoName(type: OauthType, info: IOauthUserInfo) {
  if (type === OauthType.GITHUB) {
    return (info as IGithubUserInfo).login;
  }
  if (type === OauthType.GOOGLE) {
    return (info as IGoogleUserInfo).email;
  }
  if (type === OauthType.WEIBO) {
    return (info as IGoogleUserInfo).name;
  }
  return '';
}

const SettingAccountPage = () => {
  const { t } = useTranslation();
  const timer = useRef<number>();
  const { userInfo, getCredentialList, userCredentials } = useAccount();
  const [currentId, setCurrentId] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const crData = useMemo(
    () => {
      const newData: RecordPartial<OauthType, CredentialsEntity> = {};
      // eslint-disable-next-line no-return-assign
      userCredentials.forEach((v) => newData[v.type] = v);
      return newData;
    },
    [userCredentials],
  );
  useEffect(() => {
    getCredentialList();
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const revokeConfirm = useCallback((id: string) => {
    setCurrentId(id);
    setConfirmVisible(true);
  }, []);
  const revoke = useCallback(async () => {
    setConfirmLoading(true);
    setConfirmDisabled(true);
    try {
      await accountRevoke(currentId);
      toast.success(t('setting.account.message.revoke_success'));
      setConfirmVisible(false);
      getCredentialList();
    } catch (err: any) {
      if (err?.response?.data?.message === 'reserved login type') {
        toast.error(t('setting.account.message.require_one_login_type'));
      } else {
        toast.error(t('setting.account.message.revoke_error'));
      }
      getCredentialList();
    } finally {
      setConfirmLoading(false);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => {
        setConfirmDisabled(false);
      }, 1000);
    }
  }, [currentId, getCredentialList, t]);
  const accountService = useCallback(async (data: IOauthSuccessData) => {
    await accountAuthorize({
      code: data.code!,
    });
    getCredentialList();
    toast.success(t('setting.account.message.authorize_success'));
  }, [getCredentialList, t]);
  const messageCb = useCallback(async (e: MessageEvent) => {
    oauthSuccess(e, accountService, () => window.removeEventListener('message', messageCb), (data) => {
      // window.postMessage({ fromParent: true }, window.location.href);
      toast.error(t(`backend_error.authorize.${data.message}` as any) as string, {
        duration: 1000,
      });
    });
  }, [accountService, t]);
  const authorize = useCallback((type: OauthType) => {
    // if (type === OauthType.GOOGLE) {
    //   Toast.warning(t('setting.account.message.google_disabled'));
    //   return;
    // }
    oauthOpen(getOauthUrl(type, OauthStateType.authorize));
    window.addEventListener('message', messageCb);
  }, [messageCb]);
  return (
    <div>
      <Title>{t('setting.menu.account')}</Title>
      <List>
        {
          OauthTypeValues.map((type: OauthType) => {
            const data = CredentialInfo[type];
            const currentInfo = crData[type];
            return (
              <Item key={type}>
                <ItemInfo>
                  <InfoTitle>
                    {data.title}
                    {
                      userInfo!.signupType === type as any && (
                        <InfoTip>
                          {`(${t('setting.account.label.signup_type')})`}
                        </InfoTip>
                      )
                    }
                  </InfoTitle>
                </ItemInfo>
                <div>
                  {
                    currentInfo ? (
                      <CrInfo>
                        <InfoName style={{ marginRight: 12 }}>
                          {type !== OauthType.GOOGLE && '@'}
                          {oauthInfoName(type, currentInfo.info!)}
                        </InfoName>
                        <Button
                          icon={<X css={css`margin: 0 !important;`} size={14} />}
                          danger
                          type="primary"
                          // shape="circle"
                          size="small"
                          css={css`
                            width: 32px;
                            border-radius: 32px;
                            height: 32px;
                            padding: 0;
                            min-width: 32px;
                          `}
                          onClick={() => revokeConfirm(currentInfo.id)}
                        />
                      </CrInfo>
                    ) : (
                      <Button
                        type="primary"
                        // disabled={type === OauthType.GOOGLE}
                        // shape="round"
                        size="small"
                        onClick={() => authorize(type)}
                      >
                        {t('setting.account.btn.authorize')}
                      </Button>
                    )
                  }
                </div>
              </Item>
            );
          })
        }
        <Item>
          <ItemInfo>
            <InfoTitle>
              {t('label.email')}
              {
                userInfo!.signupType === SignupType.EMAIL && (
                  <InfoTip>
                    {` (${t('setting.account.label.signup_type')})`}
                  </InfoTip>
                )
              }
            </InfoTitle>
          </ItemInfo>
          <div>
            {
              userInfo!.email ? (
                <CrInfo>
                  <InfoName style={{ marginRight: 12 }}>
                    {userInfo!.email}
                    {
                      !userInfo!.isEmailVerified && (
                        <span css={css`
                          font-size: 12px;
                          margin-left: 4px;
                          color: ${({ theme }) => theme.colors.error};
                        `}
                        >
                          {`(${t('setting.account.label.no_verify')})`}
                        </span>
                      )
                    }
                  </InfoName>
                  <Button
                    type="primary"
                    disabled
                    // shape="round"
                    danger
                    size="small"
                    style={{ width: 'auto' }}
                  >
                    {`${t('setting.account.btn.modify')}`}
                  </Button>
                </CrInfo>
              ) : (
                <Button
                  type="primary"
                  disabled
                  // shape="round"
                  size="small"
                >
                  {`${t('setting.account.btn.authorize')}`}
                </Button>
              )
            }
          </div>
        </Item>
      </List>
      <Confirm
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={revoke}
        confirmText={t('setting.account.label.revoke') as string}
        confirmButtonProps={{
          danger: true,
          disabled: confirmDisabled,
          loading: confirmLoading,
          icon: <Unlock size={14} />,
        }}
        title={t('setting.account.revoke_confirm.title') as string}
      />
    </div>
  );
};

export default observer(SettingAccountPage);
