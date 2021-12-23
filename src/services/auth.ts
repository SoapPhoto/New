import { NewPasswordDto, ResetPasswordDto } from '@app/common/types/modules/auth/dto/auth.dto';
import { request } from '@app/utils/request';

export const resetPassword = async (data: ResetPasswordDto) => (
  request.put('/api/auth/resetPassword', data)
);

export const newPassword = async (data: NewPasswordDto) => (
  request.put('/api/auth/newPassword', data)
);
