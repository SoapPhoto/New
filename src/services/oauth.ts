import { request } from '@app/utils/request';
import { OauthType } from '@app/common/enum/router';

export const oauth = (params: URLSearchParams) => request.post('oauth/token', params, {
  headers: {
    Authorization: `Basic ${process.env.REACT_APP_BASIC_TOKEN}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const oauthToken = (type: OauthType, params: URLSearchParams) => request.post(`oauth/${type}/token`, params, {
  headers: {
    Authorization: `Basic ${process.env.REACT_APP_BASIC_TOKEN}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const activeUser = async (data: URLSearchParams) => request.post('oauth/active', data, {
  headers: {
    Authorization: `Basic ${process.env.REACT_APP_BASIC_TOKEN}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
