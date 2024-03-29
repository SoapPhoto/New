import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus(status: number) {
    return status < 500 && status !== 404;
  },
});

// 请求前预先判断token是否失效
instance.interceptors.request.use(async (config) => {
  let Authorization = '';
  const token = localStorage.getItem('token');
  if (token && JSON.parse(token) && !config.headers!.Authorization) {
    const { accessToken } = JSON.parse(token);
    Authorization = `Bearer ${accessToken || ''}`;
    // eslint-disable-next-line no-param-reassign
    config.headers!.Authorization = Authorization;
  }
  return config;
});

instance.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    // const { refreshToken, isRefreshTokenOk } = store.accountStore;
    // const { config } = response;
    if (response.status >= 400) {
      // if (!server) {
      //   // const message = t(response.data.message);
      //   switch (response.status) {
      //     case 401:
      //       if (isRefreshTokenOk && response.data.message === 'Unauthorized') {
      //         if (!isRefreshing) {
      //           isRefreshing = true;
      //           try {
      //             await refreshToken();
      //             Promise.all(requests.map(r => r()));
      //             requests = [];
      //             return instance(config);
      //           } catch (err) {
      //             console.error('refreshToken error =>', err);
      //           }
      //         } else {
      //           requests.push(() => instance(config));
      //         }
      //       }
      //       // if (message) Toast.error(message);
      //       break;
      //     case 400:
      //       // if (message) Toast.error(message);
      //       break;
      //     default:
      //       break;
      //   }
      // }
      return Promise.reject(response.data);
    }
    return Promise.resolve(response);
  },
  (error: any) => Promise.reject(error.response.data),
);

export const request = instance;
