import { defineStore } from '_pinia@2.0.13@pinia'
import { listNotice } from '@/apis/notice'

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    noticeList: [],
  }),
  actions: {
    flushNoticeByClass(classIdList) {
      this.clearNoticeList()
      for (const classId of classIdList) {
        listNotice(classId.id)
          .then(async (resp) => {
            // @ts-ignore
            resp.data.data.forEach((item) => {
              this.noticeList.push(item)
            })
            // @ts-ignore
            console.log(resp.data.data)
          })
          .catch(async (err) => {
            console.log(err)
          })
      }
      console.log(this.noticeList)
    },
    clearNoticeList() {
      this.noticeList.length = 0
    },
  },
})
