import 'xe-utils'
import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import router from './router'

import './assets/defult.less'
import 'tdesign-vue-next/es/style/index.css'
import './style/index.less'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import * as echarts from 'echarts'
// import 'echarts'
// import VueECharts from 'vue-echarts'
const app = createApp(App)

app.use(store)
app.use(router)
app.use(VXETable)
app.config.globalProperties.$echarts = echarts
// app.component('VChart', VueECharts)
app.mount('#app')
