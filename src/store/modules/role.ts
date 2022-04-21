import { store } from '@/store'
import { defineStore } from 'pinia'
import { listRole } from '@/apis/role'
import { MessagePlugin } from 'tdesign-vue-next'
export const useRoleStore = defineStore('role', {
  state: () => ({
    studentList: [],
    teacherList: [],
  }),
  getters: {
    getStudentList: (state) => {
      return state.studentList
    },
    getTeacherList: (state) => {
      return state.teacherList
    },
  },
  actions: {
    async flashRoles() {
      await listRole()
        .then((resp) => {
          // @ts-ignore
          this.studentList = resp.data.data.students
          // @ts-ignore
          this.teacherList = resp.data.data.teachers
          // @ts-ignore
          if (resp.data.data.students.length === 0) {
            this.studentList = undefined
          }
          // @ts-ignore
          if (resp.data.data.teachers.length === 0) {
            this.teacherList = undefined
          }
          MessagePlugin.success('获取角色列表成功！')
        })
        .catch((err) => {
          console.log(err)
          MessagePlugin.error('获取角色列表失败！')
        })
    },
  },
})

export function getRoleStore() {
  return useRoleStore(store)
}
