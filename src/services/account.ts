import type { CredentialsEntity } from '@app/common/types/modules/credentials/credentials.entity'

import type { AuthorizeDto } from '@app/common/types/modules/credentials/dto/credentials.dto'
import type { CreateUserDto } from '@app/common/types/modules/user/dto/user.dto'
import { request } from '@app/utils/request'

export function register(value: CreateUserDto) {
  return request.post('/api/auth/signup', value, {
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_BASIC_TOKEN}`,
    },
  })
}

export async function getUserCredentialList() {
  return request.get<CredentialsEntity[]>('/api/credentials')
}

export async function accountRevoke(id: string) {
  return request.delete<null>(`/api/credentials/${id}`)
}

export async function accountAuthorize(data: AuthorizeDto) {
  return request.post<null>('/api/credentials/authorize', data)
}
