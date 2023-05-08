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

// eslint-disable-next-line camelcase
export function newStudent(name, student_number) {
  return request({
    url: 'manageral_roles.LATEST/create_student/',
    method: 'POST',
    data: {
      name: name,
      // eslint-disable-next-line camelcase
      student_number: student_number,
    },
  })
}
