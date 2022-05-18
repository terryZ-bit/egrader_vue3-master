import { request } from '@/utils/request'

export function createHomeworkBody(
  teacherId,
  name,
  homeworkIntroduction,
  scoreMax,
  scoreDetailFlag,
  rateEachFlag,
  endTime,
  classList,
) {
  return request({
    url: 'homework.LATEST/create_homework/',
    method: 'POST',
    data: {
      teacher_id: teacherId,
      name: name,
      homework_introduction: homeworkIntroduction,
      score_max: scoreMax,
      rate_each_flag: rateEachFlag,
      score_detail_flag: scoreDetailFlag,
      end_time: endTime,
      class_id_list: classList,
    },
  })
}
export function createHomeworkDetail(id, scoreList) {
  return request({
    url: 'homework.LATEST/create_homework_detail/',
    method: 'POST',
    data: {
      id: id,
      score_detail_list: scoreList,
    },
  })
}

export function getTeacherHomeworkOssPaths(teacherId, homeworkId, fileNameList) {
  return request({
    url: 'homework.LATEST/get_homework_path/',
    method: 'POST',
    data: {
      teacher_id: teacherId,
      homework_id: homeworkId,
      file_name_list: fileNameList,
    },
  })
}

export function listTeacherHomework(courseId, teacherId) {
  return request({
    url: 'homework.LATEST/get_homeworks/',
    method: 'POST',
    data: {
      course_id: courseId,
      teacher_id: teacherId,
    },
  })
}

export function getTeacherHomeworkDetail(teacherHomeworkId) {
  return request({
    url: 'homework.LATEST/get_homework/',
    method: 'POST',
    data: {
      homework_id: teacherHomeworkId,
    },
  })
}

export function getTeacherHomeworkFile(fileId) {
  request({
    url: 'homework.LATEST/download_homework/',
    method: 'POST',
    data: {
      id: fileId,
      homework_type: 'Tch',
    },
  }).then((r) => {
    // @ts-ignore
    window.open(r.data.data.url, '_blank')
  })
}

export function getStuHomeworkFile(fileId) {
  request({
    url: 'homework.LATEST/download_homework/',
    method: 'POST',
    data: {
      id: fileId,
      homework_type: 'Stu',
    },
  }).then((r) => {
    // @ts-ignore
    window.open(r.data.data.url, '_blank')
  })
}
