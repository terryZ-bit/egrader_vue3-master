import * as path from '@/store/index'

export function beforeFlushToSession() {
  const chooseStore = path.useChooseStore()
  chooseStore.toSessionStorage()
}

export function afterFlushToSession() {
  const chooseStore = path.useChooseStore()
  chooseStore.fromSessionStorage()
}
