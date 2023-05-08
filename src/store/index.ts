// @ts-ignore
import { createPinia } from 'pinia'

const store = createPinia()

export { store }

export * from './modules/user'
export * from './modules/permission'
export * from './modules/tabs-router'
export * from './modules/notification'
export * from './modules/role'
export * from './modules/course'
export * from './modules/choose'
export * from './modules/style'
export * from './modules/notice'
export * from './modules/teacherHomework'
export * from './modules/rateEach'

export default store
