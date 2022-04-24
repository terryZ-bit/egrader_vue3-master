<template>
  <div id="teacher-course">
    <t-card title="课程信息" style="margin: 30px 30px" header-bordered bordered>
      <div class="info-block">
        <h1>课程名称</h1>
        <p>{{ chooseCourse.course_name }}</p>
        <h1>课程简介</h1>
        <p>{{ chooseCourse.course_introduction }}</p>
      </div>
    </t-card>
    <t-card title="班级信息" style="margin: 30px 30px" header-bordered bordered>
      <vxe-table align="center" :data="chooseClass">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="课程名"></vxe-column>
        <vxe-column field="sex" title="班级码"></vxe-column>
        <vxe-column field="age" title="创建时间"></vxe-column>
      </vxe-table>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherCourse',
}
</script>
<script setup lang="ts">
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'

const chooseStore = useChooseStore()
const { chooseCourse, chooseClass } = storeToRefs(chooseStore)
</script>

<style scoped lang="less">
@import '/src/style/variables';
#teacher-course {
  height: 100%;
  width: 100%;

  .info-block {
    column-count: 2;
    h1 {
      width: 84px;
      font-size: 14px;
      text-align: left;
      line-height: 22px;
    }
    i {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: @border-radius-50;
      background: @success-color-5;
    }
  }
}
</style>
