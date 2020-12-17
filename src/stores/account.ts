import { client } from '@app/apollo/client';
import { Whoami } from '@app/graphql/query';
import { oauth } from '@app/services/oauth';
import { UserEntity } from '@common/types/modules/user/user.entity';
import { action, computed, makeObservable, observable } from 'mobx';

class AccountStore {
  public userInfo?: UserEntity;

  get isLogin() {
    return !!this.userInfo;
  }

  constructor() {
    makeObservable(this, {
      isLogin: computed,
      userInfo: observable,
      setUserInfo: action,
    });
  }

  public setUserInfo = (userInfo?: UserEntity) => {
    console.log(userInfo);
    this.userInfo = userInfo;
  };

  public getUserInfo = async () => {
    const { data } = await client.query<{ whoami: UserEntity }>({
      query: Whoami,
    });
    this.setUserInfo(data.whoami);
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
}

export default new AccountStore();
