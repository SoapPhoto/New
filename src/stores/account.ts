import { client } from '@app/apollo/client';
import { Whoami } from '@app/graphql/query';
import { oauth, oauthToken } from '@app/services/oauth';
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

class AccountStore {
  public init = false;

  public userInfo?: UserEntity;

  get isLogin() {
    return !!this.userInfo;
  }

  constructor() {
    makeObservable(this, {
      init: observable,
      isLogin: computed,
      userInfo: observable,
      setUserInfo: action,
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
          localStorage.removeItem('token');
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
    this.setUserInfo(data.data.user);
  };

  // eslint-disable-next-line class-methods-use-this
  public logout = async () => {
    localStorage.removeItem('token');
    await request.post('/api/auth/logout');
    window.location.href = '/';
  };
}

export default new AccountStore();
