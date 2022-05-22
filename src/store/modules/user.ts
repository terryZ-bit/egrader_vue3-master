import { store } from '@/store'
import { defineStore } from 'pinia'
import { TOKEN_NAME } from '@/config/global'
import { sessionStorage } from '@/utils/storage'

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
    toSession() {
      sessionStorage.set('userInfo', this.userInfo)
    },
    fromSession() {
      this.userInfo = sessionStorage.get('userInfo')
      sessionStorage.remove('userInfo')
    },
    setUserInfo(info) {
      this.userInfo = info
    },
  },
})

export function getUserStore() {
  return useUserStore(store)
}
