<template>
  <div class="teacher-homework-detail">
    <t-card title="作业详情" style="margin: 30px" bordered header-bordered :shadow="true"></t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherHomeworkDetail',
}
</script>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { getTeacherHomeworkDetail } from '@/apis/homework/teacherHomework'

interface Props {
  teacherHomeworkId?: string
}

const props = withDefaults(defineProps<Props>(), {
  teacherHomeworkId: '',
})

onMounted(() => {
  getTeacherHomeworkDetail(props.teacherHomeworkId)
    .then((resp) => {
      console.log(resp)
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<style scoped></style>
