import { request } from '@/utils/request'

export function enroll(email, password, username, authCode) {
  return request({
    url: 'login.LATEST/register/',
    method: 'POST',
    data: {
      email: email,
      password: password,
      username: username,
      auth_code: authCode,
    },
  })
}

export function getVerificationCode(email) {
  return request({
    url: 'login.LATEST/send-email/',
    method: 'POST',
    data: {
      email: email,
    },
  })
}
