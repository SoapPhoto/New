import { request } from '@app/utils/request';

import { CreateUserDto } from '@app/common/types/modules/user/dto/user.dto';

export const register = (value: CreateUserDto) => request.post('/api/auth/signup', value, {
  headers: {
    Authorization: `Basic ${process.env.REACT_APP_BASIC_TOKEN}`,
  },
});
