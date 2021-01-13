import { client } from '@app/apollo/client';
import { Whoami } from '@app/graphql/query';
import { oauth } from '@app/services/oauth';
import { UserEntity } from '@app/common/types/modules/user/user.entity';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

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
        next: data => {
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
}

export default new AccountStore();
