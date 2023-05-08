<!--
  封装了基本圆环图
-->
<template>
  <div id="doughnut-rounded">
    <EChart :option="option"></EChart>
  </div>
</template>
<script setup lang="ts">
import EChart from '@/components/echarts/echart.vue'
import { ref } from 'vue'
const props = defineProps(['info'])
// eslint-disable-next-line vue/no-setup-props-destructure
const title = props.info.title
// eslint-disable-next-line vue/no-setup-props-destructure
const data = props.info.data
const option = ref({
  title: {
    text: title,
  },
  legend: {
    show: true,
    left: 'left',
    top: '30px',
    orient: 'vertical',
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      left: 'right',
      top: 'middle',
      height: '160px',
      width: '160px',
      data,
      label: {
        show: false,
      },
    },
  ],
  grid: {
    x: 30,
    y: 45,
    x2: 5,
    y2: 20,
    borderWidth: 1,
  },
})
</script>
<style lang="less">
#doughnut-rounded {
  height: 100%;
  width: 100%;
}
</style>
