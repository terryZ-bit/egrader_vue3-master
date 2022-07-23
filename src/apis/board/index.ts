import { request } from '@/utils/request'

/**
 * 获取班级分析数据
 * @param courseId
 */
export function getHomeworkAnalyse(courseId) {
  return request({
    url: 'egraderBackend.LATEST/baseBoardService/getHomeworkAnalyse',
    method: 'POST',
    data: {
      course_id: courseId,
    },
  })
}

export function getStudentManifestation(courseId) {
  return request({
    url: 'egraderBackend.LATEST/baseBoardService/getStudentManifestation',
    method: 'POST',
    data: {
      course_id: courseId,
    },
  })
}
