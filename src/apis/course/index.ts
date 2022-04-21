import { request } from '@/utils/request'

export function listCourse() {
  return request({
    url: 'course.LATEST/refresh_course/',
    method: 'POST',
  })
}

// eslint-disable-next-line camelcase
export function createCourse(teacher_id, course_name, course_introduction) {
  return request({
    url: 'course.LATEST/createCourse/',
    method: 'POST',
    data: {
      // eslint-disable-next-line camelcase
      teacher_id: teacher_id,
      // eslint-disable-next-line camelcase
      course_name: course_name,
      // eslint-disable-next-line camelcase
      course_introduction: course_introduction,
    },
  })
}
