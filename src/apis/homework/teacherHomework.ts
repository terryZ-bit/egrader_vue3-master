import { request } from '@/utils/request'

/**
 * 创建作业主体
 * @param teacherId
 * @param name
 * @param homeworkIntroduction
 * @param scoreMax
 * @param scoreDetailFlag
 * @param rateEachFlag
 * @param endTime
 * @param classList
 */
export function createHomeworkBody(teacherId, name, homeworkIntroduction, scoreMax, classList) {
  return request({
    url: 'egraderBackend.LATEST/homeworkService/createHomeworkBody',
    method: 'POST',
    data: {
      teacher_id: teacherId,
      name,
      homework_introduction: homeworkIntroduction,
      score_max: scoreMax,
      class_list: classList,
    },
  })
}

/**
 * 创建作业详情
 * @param id
 * @param scoreList
 */
export function createHomeworkDetail(id, scoreList) {
  return request({
    url: 'homework.LATEST/create_homework_detail/',
    method: 'POST',
    data: {
      id,
      score_detail_list: scoreList,
    },
  })
}

/**
 * 获取教师发布的作业的附件概览
 * @param teacherId
 * @param homeworkId
 * @param fileNameList
 */
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

/**
 * 获取教师发布作业概览
 * @param courseId
 * @param teacherId
 */
export function listTeacherHomework(courseId, teacherId) {
  return request({
    url: 'egraderBackend.LATEST/homeworkService/listTeacherHomework',
    method: 'POST',
    data: {
      course_id: courseId,
      teacher_id: teacherId,
    },
  })
}

/**
 * 获取教师发布作业的详情
 * @param teacherHomeworkId
 */
export function getTeacherHomeworkDetail(teacherHomeworkId) {
  return request({
    url: 'homework.LATEST/get_homework/',
    method: 'POST',
    data: {
      homework_id: teacherHomeworkId,
    },
  })
}

/**
 * 获取教师作业附件
 * @param fileId
 */
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

/**
 * 获取学生作业文件
 * @param fileId
 */
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

/**
 * 获取某次作业的学生完成情况概览
 * @param teacherHomeworkId
 */
export function teacherGetAllHomework(teacherHomeworkId) {
  return request({
    url: 'egraderBackend.LATEST/homeworkService/teacherGetAllHomework',
    method: 'POST',
    data: {
      teacher_homework_id: teacherHomeworkId,
    },
  })
}

/**
 * 教师获取某次作业的详情
 * @param homeworkId
 */
export function teacherGetHomeworkDetail(homeworkId) {
  return request({
    url: 'egraderBackend.LATEST/homeworkService/teacherGetHomeworkDetail',
    method: 'POST',
    data: {
      homework_id: homeworkId,
    },
  })
}

/**
 * 教师更新学生成绩接口
 * @param homeworkId
 * @param grade
 */
export function teacherUpdateStudentGrade(homeworkId, grade) {
  return request({
    url: 'egraderBackend.LATEST/homeworkService/teacherUpdateStudentGrade',
    method: 'POST',
    data: {
      homework_id: homeworkId,
      grade,
    },
  })
}

export function confirmTeacherHomework(teacherHomeworkId, endTime, rateEndTime, classList, rateEachFlag) {
  return rateEachFlag
    ? request({
        url: 'egraderBackend.LATEST/homeworkService/confirmTeacherHomework',
        method: 'POST',
        data: {
          teacher_homework_id: teacherHomeworkId,
          end_time: endTime,
          class_list: classList,
          rate_each_end_time: rateEndTime,
        },
      })
    : request({
        url: 'egraderBackend.LATEST/homeworkService/confirmTeacherHomework',
        method: 'POST',
        data: {
          teacher_homework_id: teacherHomeworkId,
          end_time: endTime,
          class_list: classList,
        },
      })
}
