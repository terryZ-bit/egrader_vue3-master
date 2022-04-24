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

export function createClass(courseId, className, classIntroduction) {
  return request({
    url: 'course.LATEST/create_class/',
    method: 'POST',
    data: {
      course_id: courseId,
      class_name: className,
      class_introduction: classIntroduction,
    },
  })
}

export function deleteClassByID(classId) {
  return request({
    url: 'course.LATEST/delete_class/',
    method: 'POST',
    data: {
      class_t_id: classId,
    },
  })
}
