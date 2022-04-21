import { store } from '@/store'
import { defineStore } from '_pinia@2.0.13@pinia'
import { listCourse } from '@/apis/course'
import { MessagePlugin } from 'tdesign-vue-next'
export const useCourseStore = defineStore('course', {
  state: () => ({
    createCourseList: [],
    inCourseList: [],
    tutorCourseList: [],
  }),
  getters: {
    getStudentList: (state) => {
      return state.createCourseList
    },
    getTeacherList: (state) => {
      return state.inCourseList
    },
  },
  actions: {
    async flashRoles() {
      await listCourse()
        .then((resp) => {
          // @ts-ignore
          this.createCourseList = resp.data.data.course_t
          // @ts-ignore
          this.inCourseList = resp.data.data.choose_class_t
          MessagePlugin.success('刷新课程列表成功！')
        })
        .catch((err) => {
          MessagePlugin.error('刷新课程列表失败！')
          console.log(err)
        })
    },
  },
})

export function getCourseStore() {
  return useCourseStore(store)
}
