<template>
  <div id="teacher-course">
    <t-card title="课程信息" style="margin: 30px 30px" header-bordered bordered>
      <div class="info-block">
        <h1>课程名称</h1>
        <i></i>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherCourse',
}
</script>
<script setup lang="ts"></script>

<style scoped lang="less">
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
