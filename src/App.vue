<template>
  <router-view />
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from 'vue'
import { afterFlushToSession, beforeFlushToSession } from '@/store/toSession'

onMounted(() => {
  afterFlushToSession()
  console.log('在刷新后执行')
})
window.onbeforeunload = function () {
  beforeFlushToSession()
  console.log('在刷新前执行')
}
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
