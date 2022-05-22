/**
 * 当用户点击刷新时，pinia中存放的信息会被删除，所以刷新前存到Session中，刷新后再全部取出来
 */
import * as path from '@/store/index'

export function beforeFlushToSession() {
  const chooseStore = path.useChooseStore()
  const courseStore = path.useCourseStore()
  const userStore = path.useUserStore()
  chooseStore.toSessionStorage()
  courseStore.toSession()
  userStore.toSession()
}

export function afterFlushToSession() {
  const chooseStore = path.useChooseStore()
  const courseStore = path.useCourseStore()
  const userStore = path.useUserStore()
  chooseStore.fromSessionStorage()
  courseStore.fromSession()
  userStore.fromSession()
}
