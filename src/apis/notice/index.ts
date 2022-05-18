import { request } from '@/utils/request'

export function listNotice(courseId) {
  return request({
    url: 'notice.LATEST/selectNotice/',
    method: 'POST',
    data: {
      course_id: courseId,
    },
  })
}

export function createNotice(courseId, noticeType, noticeTopic, noticeContent, classIdList) {
  return request({
    url: 'notice.LATEST/createNotice/',
    method: 'POST',
    data: {
      class_id_list: classIdList,
      notice_type: noticeType,
      notice_content: noticeContent,
      notice_topic: noticeTopic,
      course_id: courseId,
    },
  })
}

export function deleteNotice(noticeId) {
  return request({
    url: 'notice.LATEST/deleteNotice',
    method: 'POST',
    data: {
      notice_id: noticeId,
    },
  })
}
