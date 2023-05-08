import { defineStore } from 'pinia'

export const useTeacherHomeworkStore = defineStore('teacherHomework', {
  state: () => ({
    teacherHomeworkList: [],
    teacherHomeworkChooseDetail: {},
  }),
  actions: {
    setTeacherHomeworkList(teacherHomeworkList) {
      this.teacherHomeworkList = teacherHomeworkList
    },
    setTeacherHomeworkChooseDetail(rowInfo) {
      this.teacherHomeworkChooseDetail = rowInfo
    },
  },
})
