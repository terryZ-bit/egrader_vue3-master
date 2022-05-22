import { defineStore } from 'pinia'
import { sessionStorage } from '@/utils/storage'

export const useRateEachStore = defineStore('rateEachStore', {
  state: () => ({
    rateEachList: [
      {
        id: '1',
        name: '第一次作业',
        sum: '5',
        left: '0',
        teacherHomeworkId: '96',
      },
      {
        id: '1',
        name: '第二次作业',
        sum: '5',
        left: '5',
        teacherHomeworkId: '97',
      },
    ],
    rateDetailJson: {
      96: [
        {
          id: '1',
          homework_message: '20190516xxxxx zcr',
          status: '1',
        },
        {
          id: '2',
          homework_message: '20190156xxxxx zlw',
          status: '1',
        },
        {
          id: '3',
          homework_message: '20190516xxxxx hc',
          status: '1',
        },
        {
          id: '4',
          homework_message: '20190516xxxxx sl',
          status: '1',
        },
        {
          id: '5',
          homework_message: '20190516xxxxx dx',
          status: '1',
        },
      ],
      97: [
        {
          id: '46',
          homework_message: 'zcr',
          status: '0',
          fileName: '完成的作业1.docx',
        },
        {
          id: '47',
          homework_message: 'zlw',
          status: '0',
          fileName: '完成的作业5 - 副本 (2).docx',
        },
        {
          id: '48',
          homework_message: 'hc',
          status: '0',
          fileName: '完成的作业2 - 副本.docx',
        },
        {
          id: '49',
          homework_message: 'sl',
          status: '0',
          fileName: '完成的作业3 - 副本 (4).docx',
        },
        {
          id: '49',
          homework_message: 'dx',
          status: '0',
          fileName: '完成的作业3 - 副本 (4).docx',
        },
      ],
    },
    sixDetail: [],
    senDetail: [],
  }),
  actions: {
    setDetail(id, list_) {
      if (id === '96') {
        this.sixDetail = list_
      } else {
        this.senDetail = list_
      }
    },
    setDetailStatus(id) {
      console.log(id)
      this.rateDetailJson['97'].forEach((item, index, array) => {
        console.log(item)
        if (item.id === id) {
          array[index].status = '1'
        }
      })
    },
    toSession() {
      sessionStorage.set('rateEachList', this.rateEachList)
      sessionStorage.set('rateDetailJson', this.rateDetailJson)
      sessionStorage.set('sixDetail', this.sixDetail)
      sessionStorage.set('senDetail', this.senDetail)
    },
    fromSession() {
      this.rateEachList = sessionStorage.get('rateEachList')
      this.rateDetailJson = sessionStorage.get('rateDetailJson')
      this.sixDetail = sessionStorage.get('sixDetail')
      this.senDetail = sessionStorage.get('senDetail')
      sessionStorage.remove('rateEachList')
      sessionStorage.remove('rateDetailJson')
      sessionStorage.remove('sixDetail')
      sessionStorage.remove('senDetail')
    },
  },
})
