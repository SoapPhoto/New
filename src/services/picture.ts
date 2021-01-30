import { CreatePictureAddDot } from '@app/common/types/modules/picture/dto/picture.dto';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { request } from '@app/utils/request';

export const addPicture = (value: Partial<CreatePictureAddDot>) => {
  let Authorization = '';
  const token = localStorage.getItem('token');
  if (token && JSON.parse(token)) {
    const { accessToken } = JSON.parse(token);
    Authorization = `Bearer ${accessToken || ''}`;
  }
  return request.post<PictureEntity>('/api/picture', value, {
    headers: {
      Authorization: Authorization,
    },
  });
};
