import { v4 as uuid } from 'uuid';

import { UploadType } from '@app/common/enum/upload';
import { request } from '@app/utils/request';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import OSS from 'ali-oss';
// const OSS = require('ali-oss');

interface ICreds {
  AccessKeyId: string;
  AccessKeySecret: string;
  SecurityToken: string;
  Expiration: string;
}

export const getSts = async () => request.get<ICreds>('/api/file/sts');

export const uploadOSS = async (
  file: File,
  userId: number,
  type: UploadType = UploadType.PICTURE,
  progress?: (num: number) => void,
) => {
  const { data: creds } = await getSts();
  const key = uuid();
  const client = new OSS({
    region: import.meta.env.VITE_OSS_REGION,
    bucket: import.meta.env.VITE_OSS_BUCKET,
    accessKeyId: creds.AccessKeyId,
    accessKeySecret: creds.AccessKeySecret,
    stsToken: creds.SecurityToken,
  });
  const { data } = await client.multipartUpload(
    import.meta.env.VITE_OSS_PATH + key,
    file,
    {
      progress,
      callback: {
        url: 'https://soapphoto.com/api/file/upload/oss/callback',
        /* eslint no-template-curly-in-string: [0] */
        body:
          '{"userId":${x:userId},"originalname":${x:originalname},"type":${x:type},"object":${object},"bucket":${bucket},"etag":${etag},"size":${size},"mimetype":${mimeType}}',
        contentType: 'application/json',
        customValue: {
          userId: userId.toString(),
          originalname: file.name,
          type,
        },
      },
    },
  );
  return data.key as string;
};
