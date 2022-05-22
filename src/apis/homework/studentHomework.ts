import { request } from '@/utils/request'

export function listAllHomeworks(studentId, classId) {
  return request({
    url: 'stu_homework.LATEST/get_homeworks/',
    method: 'POST',
    data: {
      student_id: studentId,
      class_id: classId,
    },
  })
}

export function getHomeworkInfo(studentId, classId, teacherHomeworkId) {
  return request({
    url: 'stu_homework.LATEST/get_homework/',
    method: 'POST',
    data: {
      student_id: studentId,
      class_id: classId,
      teacher_homework_id: teacherHomeworkId,
    },
  })
}

export function stuPushHomework(studentId, homeworkId, homeworkMessage) {
  return request({
    url: 'stu_homework.LATEST/upload_homework/',
    method: 'POST',
    data: {
      student_id: studentId,
      homework_id: homeworkId,
      homework_message: homeworkMessage,
    },
  })
}

export function stuGetHomeworkOssPath(homeworkId, studentId, fileName) {
  return request({
    url: 'stu_homework.LATEST/get_homework_path/',
    method: 'POST',
    data: {
      homework_id: homeworkId,
      student_id: studentId,
      file_name: fileName,
    },
  })
}

export function stuGetHomeworkFileUrl(homeworkId) {
  request({
    url: 'homework.LATEST/download_homework/',
    method: 'POST',
    data: {
      id: homeworkId,
      homework_type: 'Stu',
    },
  }).then((resp) => {
    // @ts-ignore
    window.open(resp.data.data.url)
  })
}

export function stuDeleteHomeworkFile(Id) {
  return request({
    url: 'stu_homework.LATEST/delete_oss/',
    method: 'POST',
    data: {
      homework_oss_id: Id,
    },
  })
}

// export function getRateEachObj(classId, rateStudentId) {
//   return request({
//     url: ''
//   })
// }
