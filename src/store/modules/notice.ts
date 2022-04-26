import { defineStore } from '_pinia@2.0.13@pinia'
import { listNotice } from '@/apis/notice'

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    noticeList: Array,
  }),
  actions: {
    flushNoticeByClass(classIdList: Array<any>) {
      classIdList.forEach((classId) => {
        listNotice(classId)
          .then((resp) => {
            // @ts-ignore
            this.noticeList.push(resp.data.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
  },
})
