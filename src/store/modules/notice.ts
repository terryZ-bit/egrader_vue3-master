import { defineStore } from '_pinia@2.0.13@pinia'

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    noticeList: Array,
  }),
  actions: {},
})
