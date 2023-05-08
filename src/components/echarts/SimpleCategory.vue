<!--
    @author: Terry_z
    @date: 2022/7/20 - 20:21
    @fileName: SimpleCategory
 -->
<template>
  <div id="simple-category">
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
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: data,
      type: 'line',
      smooth: true,
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
#simple-category {
  height: 100%;
  width: 100%;
}
</style>
