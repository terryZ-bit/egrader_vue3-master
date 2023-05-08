import { request } from '@/utils/request'

export function getCourseFileUrl(teacherId, courseId, fileName) {
  return request({
    url: 'STS.LATEST/course_file_url/',
    method: 'POST',
    data: {
      teacher_id: teacherId,
      course_id: courseId,
      file_name: fileName,
    },
  })
}

export function courseFileUploadSuccess(teacherId, fileName, fileRemark, fileVisitType, CourseId) {
  return request({
    url: 'STS.LATEST/course_file_upload_success/',
    method: 'POST',
    data: {
      teacher_id: teacherId,
      file_name: fileName,
      file_remark: fileRemark,
      file_visit_type: fileVisitType,
      course_id: CourseId,
    },
  })
}

export function teacherGetCourseFiles(courseId) {
  return request({
    url: 'STS.LATEST/teacher_get_file/',
    method: 'POST',
    data: {
      course_id: courseId,
    },
  })
}

export function studentGetCourseFiles(classId) {
  return request({
    url: 'STS.LATEST/student_get_file/',
    method: 'POST',
    data: {
      class_id: classId,
    },
  })
}

export function teacherDeleteCourseFile(fileId) {
  return request({
    url: 'STS.LATEST/teacher_delete_file/',
    method: 'POST',
    data: {
      file_id: fileId,
    },
  })
}

export function courseFileDownLoad(fileId, fileName) {
  request({
    url: 'STS.LATEST/download_file/',
    method: 'POST',
    data: {
      file_id: fileId,
    },
  }).then((resp) => {
    // @ts-ignore
    window.open(resp.data.data.url, '_blank')
  })
}

export function modelFileDownLoad() {
  request({
    url: 'STS.LATEST/download_model_file/',
    method: 'POST',
    data: {
      model_name: 'bulkImportModel',
    },
  }).then((resp) => {
    // @ts-ignore
    window.open(resp.data.data.url, '_blank')
  })
}
