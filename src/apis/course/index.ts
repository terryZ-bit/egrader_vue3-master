import { request } from '@/utils/request'

export function listCourse() {
  return request({
    url: 'login.LATEST/register/',
    method: 'POST',
  })
}
