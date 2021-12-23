import { NewPasswordDto, ResetPasswordDto, ValidatorEmailDto } from '@app/common/types/modules/auth/dto/auth.dto';
import { request } from '@app/utils/request';

export const validatorEmail = async (data: ValidatorEmailDto) => (
  request.post('/api/auth/validatoremail', data)
);

export const resetPassword = async (data: ResetPasswordDto) => (
  request.put('/api/auth/resetPassword', data)
);

export const newPassword = async (data: NewPasswordDto) => (
  request.put('/api/auth/newPassword', data)
);

export const resetVerifyMail = async () => (
  request.post('/api/auth/resetMail')
);
