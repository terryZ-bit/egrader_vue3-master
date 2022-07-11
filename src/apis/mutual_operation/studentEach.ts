import { request } from '@/utils/request'

export function getEvalTask(classId, rateStudentId) {
  return request({
    url: '/mutual_operation/get_eval_task/',
    method: 'POST',
    data: {
      class_id: classId,
      rate_student_id: rateStudentId,
    },
  })
}
export function getRaths(teacherHomeworkId, studentId) {
  return request({
    url: '/mutual_operation/get_raths/',
    method: 'POST',
    data: {
      teacher_homework_id: teacherHomeworkId,
      student_id: studentId,
    },
  })
}
export function uploadEach(rateEachList) {
  return request({
    url: '/mutual_operation/upload_each/',
    method: 'POST',
    data: {
      rate_each_list: rateEachList,
    },
  })
}
