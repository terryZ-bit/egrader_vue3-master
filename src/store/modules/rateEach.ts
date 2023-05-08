import { defineStore } from 'pinia'
import { sessionStorage } from '@/utils/storage'

export const useRateEachStore = defineStore('rateEachStore', {
  state: () => ({
    rateDetailJson: {},
  }),
  actions: {
    setDetailStatus(id) {
      console.log('互评成功，互评id为：', id)
      // this.rateDetailJson['97'].forEach((item, index, array) => {
      //   console.log(item)
      //   if (item.id === id) {
      //     array[index].status = '1'
      //   }
      // })
    },
    toSession() {
      sessionStorage.set('rateDetailJson', this.rateDetailJson)
    },
    fromSession() {
      this.rateDetailJson = sessionStorage.get('rateDetailJson')
      sessionStorage.remove('rateDetailJson')
    },
  },
})
