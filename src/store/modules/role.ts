import { store } from '@/store'
import { defineStore } from 'pinia'
import { listRole } from '@/apis/role'
import { MessagePlugin } from 'tdesign-vue-next'
export const useRoleStore = defineStore('role', {
  state: () => ({
    studentList: [{ name: 'defult' }],
    teacherList: [{ name: 'defult' }],
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
          this.studentList = resp.data.studentList
          // @ts-ignore
          this.teacherList = resp.data.teacherList
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
