import { client } from '@app/apollo/client';
import { Whoami } from '@app/graphql/query';
import { activeUser, oauth, oauthToken } from '@app/services/oauth';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { OauthType } from '@app/common/enum/router';
import { request } from '@app/utils/request';
import { ActiveUserDto } from '@app/common/types/modules/oauth/dto/oauth.dto';
import { getUserCredentialList } from '@app/services/account';
import { CredentialsEntity } from '@app/common/types/modules/credentials/credentials.entity';
import dayjs, { Dayjs } from 'dayjs';
import { resetVerifyMail } from '@app/services/auth';
import toast from 'react-hot-toast';

let resetDate: undefined | Dayjs;

class AccountStore {
  public init = false;

  public userInfo?: UserEntity;

  public userCredentials: CredentialsEntity[] = [];

  get isLogin() {
    return !!this.userInfo;
  }

  constructor() {
    makeObservable(this, {
      userCredentials: observable,
      init: observable,
      userInfo: observable,
      isLogin: computed,
      setUserInfo: action,
      setCredentials: action,
    });
  }

  /**
   * 初始化用户数据
   *
   * @memberof AccountStore
   */
  public initHandle = () => {
    if (localStorage.getItem('token')) {
      this.getUserInfo();
    } else {
      runInAction(() => {
        this.init = true;
      });
    }
  };

  public setUserInfo = (userInfo?: UserEntity) => {
    if (!this.init) this.init = true;
    this.userInfo = userInfo;
  };

  public getUserInfo = async () => {
    client
      .watchQuery<{ whoami: UserEntity }>({
      query: Whoami,
    })
      .subscribe({
        next: (data) => {
          if (data) {
            this.setUserInfo(data.data.whoami);
          } else {
            // sink(observable.box(data));
          }
        },
        error: () => {
          this.init = true;
        },
      });
  };

  public login = async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');
    const data = await oauth(params);
    localStorage.setItem('token', JSON.stringify(data.data));
    await client.clearStore();
    this.setUserInfo(data.data.user);
  };

  public registerLogin = (data: any) => {
    localStorage.setItem('token', JSON.stringify(data));
    this.setUserInfo(data.user);
  };

  /**
   * OAuth 登录
   *
   * @param {string} code
   * @param {OauthType} type
   * @memberof AccountStore
   */
  public codeLogin = async (code: string, type: OauthType) => {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    const data = await oauthToken(type, params);
    localStorage.setItem('token', JSON.stringify(data.data));
    await client.clearStore();
    this.setUserInfo(data.data.user);
  };

  // eslint-disable-next-line class-methods-use-this
  public activeUser = async ({ code, username, name }: ActiveUserDto) => {
    const params = new URLSearchParams();
    params.append('code', code as string);
    params.append('username', username);
    params.append('name', name);
    params.append('grant_type', 'authorization_code');
    const data = await activeUser(params);
    localStorage.setItem('token', JSON.stringify(data.data));
    this.setUserInfo(data.data.user);
  };

  // eslint-disable-next-line class-methods-use-this
  public logout = async () => {
    localStorage.removeItem('token');
    await request.post('/api/auth/logout');
    window.location.href = '/';
  };

  public getCredentialList = async () => {
    const { data } = await getUserCredentialList();
    this.setCredentials(data);
  };

  // eslint-disable-next-line no-return-assign
  public setCredentials = (data: CredentialsEntity[]) => this.userCredentials = data;

  public resetVerifyEmail = async () => {
    if (resetDate && dayjs().isBefore(resetDate)) {
      toast.error('操作太频繁，请1分钟后重试！');
      return null;
    }
    resetDate = dayjs().add(1, 'M');
    return resetVerifyMail();
  };
}

export default new AccountStore();
