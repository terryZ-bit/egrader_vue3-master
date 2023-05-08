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

export function uploadEach(rateEachList, finalScore, rateEachId, scoreDetailFlag) {
  return scoreDetailFlag
    ? request({
        url: '/mutual_operation/upload_each/',
        method: 'POST',
        data: {
          rate_each_list: rateEachList,
        },
      })
    : request({
        url: '/mutual_operation/upload_each/',
        method: 'POST',
        data: {
          final_score: finalScore,
          rate_each_id: rateEachId,
        },
      })
}
