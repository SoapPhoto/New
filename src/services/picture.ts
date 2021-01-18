import { CreatePictureAddDot } from '@app/common/types/modules/picture/dto/picture.dto';
import { request } from '@app/utils/request';

export const addPicture = (value: Partial<CreatePictureAddDot>) => {
  let Authorization = '';
  const token = localStorage.getItem('token');
  if (token && JSON.parse(token)) {
    const { accessToken } = JSON.parse(token);
    Authorization = `Bearer ${accessToken || ''}`;
  }
  return request.post('/api/picture', value, {
    headers: {
      Authorization: Authorization,
    },
  });
};
