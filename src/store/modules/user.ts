import { store } from '@/store'
import { defineStore } from 'pinia'
import { TOKEN_NAME } from '@/config/global'

const InitUserInfo = {
  name: '',
  email: '',
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME),
    userInfo: InitUserInfo,
  }),
  getters: {
    getUserInfo: (state) => {
      return state.userInfo
    },
  },
  actions: {
    async logout() {
      localStorage.removeItem(TOKEN_NAME)
      this.token = ''
      this.userInfo = InitUserInfo
    },
    async removeToken() {
      this.token = ''
    },
    async logIn(email) {
      localStorage.setItem('email', email)
      this.userInfo.email = email
    },
  },
})

export function getUserStore() {
  return useUserStore(store)
}
