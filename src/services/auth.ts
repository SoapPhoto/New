import type { NewPasswordDto, ResetPasswordDto, ValidatorEmailDto } from '@app/common/types/modules/auth/dto/auth.dto'
import { request } from '@app/utils/request'

export async function validatorEmail(data: ValidatorEmailDto) {
  return request.post('/api/auth/validatoremail', data)
}

export async function resetPassword(data: ResetPasswordDto) {
  return request.put('/api/auth/resetPassword', data)
}

export async function newPassword(data: NewPasswordDto) {
  return request.put('/api/auth/newPassword', data)
}

export async function resetVerifyMail() {
  return request.post('/api/auth/resetMail')
}
