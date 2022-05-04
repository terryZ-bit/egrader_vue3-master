import { request } from '@/utils/request'
import axios from 'axios'

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
    axios
      // @ts-ignore
      .get(resp.data.data.url, {
        responseType: 'blob',
      })
      .then((res) => {
        // @ts-ignore
        const blob = new Blob([resp.data])
        const down = document.createElement('a')
        down.download = fileName
        down.style.display = 'none'
        down.href = URL.createObjectURL(blob)
        document.body.appendChild(down)
        down.click()
        URL.revokeObjectURL(down.href)
        document.body.removeChild(down)
      })
  })
}
