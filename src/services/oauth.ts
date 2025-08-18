import type { OauthType } from '@app/common/enum/router'
import { request } from '@app/utils/request'

export function oauth(params: URLSearchParams) {
  return request.post('oauth/token', params, {
    headers: {
      'Authorization': `Basic ${import.meta.env.VITE_BASIC_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

export function oauthToken(type: OauthType, params: URLSearchParams) {
  return request.post(`oauth/${type}/token`, params, {
    headers: {
      'Authorization': `Basic ${import.meta.env.VITE_BASIC_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

export async function activeUser(data: URLSearchParams) {
  return request.post('oauth/active', data, {
    headers: {
      'Authorization': `Basic ${import.meta.env.VITE_BASIC_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}
