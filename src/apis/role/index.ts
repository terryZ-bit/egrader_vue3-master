import { request } from '@/utils/request'

export function listRole() {
  return request({
    url: 'manageral_roles.LATEST/role_list/',
    method: 'POST',
  })
}
