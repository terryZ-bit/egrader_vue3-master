import { store } from '@/store'
import { defineStore } from '_pinia@2.0.13@pinia'
import { sessionStorage } from '@/utils/storage'
import { listCourse } from '@/apis/course'
import { MessagePlugin } from 'tdesign-vue-next'
export const useChooseStore = defineStore('choose', {
  state: () => ({
    chooseCourse: {
      id: '',
      create_time: '',
      course_name: '',
      course_introduction: '',
    },
    chooseClass: Array,
    chooseRole: {
      roleId: '',
      roleType: '',
    },
  }),
  getters: {
    getChooseClassId() {
      const idList = []
      this.chooseClass.forEach((item) => {
        idList.push(item.id)
      })
      return idList
    },
  },
  actions: {
    setChooseRole(roleId, roleType) {
      this.chooseRole = { roleId: roleId, roleType: roleType }
    },
    setCourse(course) {
      this.chooseCourse = course
    },
    setClass(classInfo) {
      this.chooseClass = classInfo
    },
    toSessionStorage() {
      sessionStorage.set('chooseCourse', this.chooseCourse)
      sessionStorage.set('chooseClass', this.chooseClass)
      sessionStorage.set('chooseRole', this.chooseRole)
    },
    fromSessionStorage() {
      this.chooseCourse = sessionStorage.get('chooseCourse')
      this.chooseClass = sessionStorage.get('chooseClass')
      this.chooseRole = sessionStorage.get('chooseRole')
      sessionStorage.remove('chooseCourse')
      sessionStorage.remove('chooseClass')
      sessionStorage.remove('chooseRole')
    },
    async flushChooseClass() {
      await listCourse().then(async (resp) => {
        // @ts-ignore
        const classList = resp.data.data.class_t
        this.chooseClass = []
        classList.forEach((class_) => {
          console.log(class_)
          if (class_.course_id === this.chooseCourse.id) {
            this.chooseClass.push(class_)
          }
        })
        await MessagePlugin.success('刷新班级列表成功！')
      })
    },
  },
})

export function getChooseStore() {
  return useChooseStore(store)
}
