import { request } from '@/utils/request'

export function getUploadSTS(type) {
  return request({
    url: 'STS.LATEST/sts_oss/',
    method: 'POST',
    data: {
      permission_type: type,
    },
  })
}
