import { store } from '@/store'
import { defineStore } from 'pinia'
export const useStyleStore = defineStore('style', {
  state: () => ({
    asideWidth: '232px',
  }),
  actions: {
    setAsideWidth(width) {
      this.asideWidth = width
    },
  },
})

export function getStyleStore() {
  return useStyleStore(store)
}
