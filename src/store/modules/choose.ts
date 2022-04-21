import { store } from '@/store'
import { defineStore } from '_pinia@2.0.13@pinia'
export const useChooseStore = defineStore('course', {
  state: () => ({
    chooseCourse: JSON,
    chooseClass: JSON,
    chooseRole: JSON,
  }),
  getters: {},
  actions: {},
})

export function getChooseStore() {
  return useChooseStore(store)
}
