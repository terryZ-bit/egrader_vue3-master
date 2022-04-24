import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import router from './router'
import VXETable from 'vxe-table'
import 'xe-utils'
import './assets/defult.less'
import 'tdesign-vue-next/es/style/index.css'
import 'vxe-table/lib/style.css'
import './style/index.less'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VXETable)

app.mount('#app')
