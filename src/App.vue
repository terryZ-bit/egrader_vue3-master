<template>
  <router-view />
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted, provide } from 'vue'
import { afterFlushToSession, beforeFlushToSession } from '@/store/toSession'
import * as echarts from 'echarts'
// import axios from 'axios'

onMounted(() => {
  afterFlushToSession()
  console.log('在刷新后执行')
  // 这里本该是冷启动优化的接口，但是接口有问题，暂时注释掉
  // axios
  //   .post('https://1862232491914219.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/cold_deployment.LATEST/all_function/')
  //   .then(() => {
  //     console.log('ok ok ok')
  //   })
})
window.onbeforeunload = function () {
  beforeFlushToSession()
  console.log('在刷新前执行')
}

provide('echarts', echarts)
</script>
<style lang="less">
@import './style/variables.less';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

#nprogress .bar {
  background: #0052d9 !important; //自定义颜色
}
body {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>
