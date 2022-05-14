import { defineStore } from '_pinia@2.0.13@pinia'

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
