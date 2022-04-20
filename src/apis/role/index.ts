import { request } from '@/utils/request'

export function listRole() {
  return request({
    url: 'manageral_roles.LATEST/role_list/',
    method: 'POST',
  })
}

export function newTeacher(name, email, phone, qq, introduction) {
  return request({
    url: 'manageral_roles.LATEST/create_teacher/',
    method: 'POST',
    data: {
      name: name,
      email: email,
      phone: phone,
      qq: qq,
      teacher_introduction: introduction,
    },
  })
}
