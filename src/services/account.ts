import { request } from '@app/utils/request';

import { CreateUserDto } from '@app/common/types/modules/user/dto/user.dto';
import { CredentialsEntity } from '@app/common/types/modules/credentials/credentials.entity';
import { AuthorizeDto } from '@app/common/types/modules/credentials/dto/credentials.dto';

export const register = (value: CreateUserDto) => request.post('/api/auth/signup', value, {
  headers: {
    Authorization: `Basic ${import.meta.env.VITE_BASIC_TOKEN}`,
  },
});

export const getUserCredentialList = async () => (
  request.get<CredentialsEntity[]>('/api/credentials')
);

export const accountRevoke = async (id: string) => (
  request.delete<null>(`/api/credentials/${id}`)
);

export const accountAuthorize = async (data: AuthorizeDto) => (
  request.post<null>('/api/credentials/authorize', data)
);
