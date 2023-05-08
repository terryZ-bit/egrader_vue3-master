import { request } from '@/utils/request'

export function login(email, password) {
  return request({
    url: 'login.LATEST/login/',
    method: 'post',
    data: {
      email: email,
      password: password,
    },
  })
}
