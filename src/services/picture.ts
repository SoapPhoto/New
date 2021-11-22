import { CreatePictureAddDot } from '@app/common/types/modules/picture/dto/picture.dto';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { BaiduClassify } from '@app/common/types/shared/baidu/interface/baidu.interface';
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
      Authorization,
    },
  });
};

export const imageClassify = async (base64: string) => {
  let Authorization = '';
  const token = localStorage.getItem('token');
  if (token && JSON.parse(token)) {
    const { accessToken } = JSON.parse(token);
    Authorization = `Bearer ${accessToken || ''}`;
  }
  const params = new URLSearchParams();
  params.append('image', base64);
  return request.post<BaiduClassify[]>('/api/picture/imageClassify', {
    image: base64,
  }, {
    headers: {
      Authorization,
    },
  });
};
