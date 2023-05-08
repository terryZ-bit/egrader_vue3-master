import { store } from '@/store'
import { listCourse } from '@/apis/course'
import { MessagePlugin } from 'tdesign-vue-next'
import { defineStore } from 'pinia'
import { sessionStorage } from '@/utils/storage'
export const useCourseStore = defineStore('course', {
  state: () => ({
    createCourseList: [],
    inCourseList: [],
    tutorCourseList: [],
    manageClassList: [JSON],
  }),
  getters: {
    getStudentList: (state) => {
      return state.createCourseList
    },
    getTeacherList: (state) => {
      return state.inCourseList
    },
    getClassList: (state) => {
      return state.manageClassList
    },
  },
  actions: {
    async flashCourse() {
      await listCourse()
        .then(async (resp) => {
          // @ts-ignore
          this.createCourseList = resp.data.data.course_t
          // @ts-ignore
          this.inCourseList = resp.data.data.choose_class_t
          // @ts-ignore
          this.manageClassList = resp.data.data.class_t
        })
        .catch(async (err) => {
          await MessagePlugin.error('刷新课程列表失败！')
          console.log(err)
        })
    },
    getClassByCourse(courseId) {
      const classList = []
      this.manageClassList.forEach(function (item) {
        if (item.course_id === courseId) {
          classList.push(item)
        }
      })
      this.manageClassList = classList
    },
    toSession() {
      sessionStorage.set('createCourseList', this.createCourseList)
      sessionStorage.set('inCourseList', this.inCourseList)
      sessionStorage.set('tutorCourseList', this.tutorCourseList)
      sessionStorage.set('manageClassList', this.manageClassList)
    },
    fromSession() {
      this.manageClassList = sessionStorage.get('manageClassList')
      this.tutorCourseList = sessionStorage.get('tutorCourseList')
      this.inCourseList = sessionStorage.get('inCourseList')
      this.createCourseList = sessionStorage.get('createCourseList')
      sessionStorage.remove('manageClassList')
      sessionStorage.remove('tutorCourseList')
      sessionStorage.remove('inCourseList')
      sessionStorage.remove('createCourseList')
    },
  },
})

export function getCourseStore() {
  return useCourseStore(store)
}
