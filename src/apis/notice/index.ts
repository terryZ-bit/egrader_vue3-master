import { request } from '@/utils/request'

export function listNotice(classId) {
  return request({
    url: 'notice.LATEST/selectNotice/',
    method: 'POST',
    data: {
      class_id: classId,
    },
  })
}

export function createNotice(classId, noticeType, noticeTopic, noticeContent) {
  return request({
    url: 'notice.LATEST/createNotice/',
    method: 'POST',
    data: {
      class_id: classId,
      notice_type: noticeType,
      notice_content: noticeContent,
      notice_topic: noticeTopic,
    },
  })
}
