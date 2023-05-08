<!--
    @author: Terry_z
    @date: 2022/7/21 - 8:58
    @fileName: stuBasePage
 -->
<template>
  <div id="stu-base-page">
    <t-card title="概览台" style="margin: 30px" bordered header-bordered :shadow="true">
      <div class="stu-base-page-main">
        <t-calendar>
          <template #head> 🗓 作业日程</template>
          <template #cellAppend="data">
            <div v-if="getShow(data)" class="cell-append-demo-outer">
              <t-tag theme="danger" variant="light" size="small" class="activeTag" style="width: 100%">
                {{ data.mode === 'month' ? '我们的纪念日' : '我们的纪念月' }}
              </t-tag>
            </div>
          </template>
        </t-calendar>
        <div class="stu-base-page-right">
          <div>
            <p style="font-weight: bolder; color: #002b9e; float: left">TODO:</p>
          </div>
          <div>
            <t-list :split="true">
              <t-list-item>
                <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
              </t-list-item>
              <t-list-item>
                <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
              </t-list-item>
              <t-list-item>
                <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
              </t-list-item>
            </t-list>
          </div>
        </div>
      </div>
    </t-card>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import { listAllHomeworks } from '@/apis/homework/studentHomework'
import { getEvalTask } from '@/apis/mutual_operation/studentEach'
import { storeToRefs } from '_pinia@2.0.34@pinia'
import { onMounted, ref } from 'vue'
import { useChooseStore } from '@/store'
const chooseStore = useChooseStore()
const { chooseClass, chooseRole } = storeToRefs(chooseStore)
const homeworkPreviewLoading = ref(false)
const todoList = ref([])

const getShow = (data) =>
  data.mode === 'month'
    ? dayjs().format('YYYY-MM-DD') === data.formattedDate
    : data.date.getMonth() === new Date().getMonth()
const getTeacherHomework = function () {
  console.log(chooseClass.value)
  homeworkPreviewLoading.value = true
  let _todoList: any[]
  // @ts-ignore
  listAllHomeworks(chooseRole.value.roleId, chooseClass.value.class_id)
    .then((resp) => {
      // @ts-ignore
      const _list: any[] = resp.data.data
      const now = new Date()
      _list.forEach((value, index, array) => {
        const date: Date = new Date(value.end_time)
        console.log(now, date)
        if (now > date) {
          _todoList.push(value)
        }
      })
    })
    .finally(() => {
      homeworkPreviewLoading.value = false
    })
  // @ts-ignore
  getEvalTask(chooseClass.value.class_id, chooseClass.value.student_id)
    .then((res) => {
      // @ts-ignore
      const _list: any[] = res.data.data
      const now = new Date()
      _list.forEach((value, index, array) => {
        const date: Date = new Date(value.end_time)
        console.log(now, date)
        if (now > date) {
          _todoList.push(value)
        }
      })
    })
    .finally(() => {})
  todoList.value = _todoList.sort((a, b) => {
    return a.end_time - b.end_time
  })
  console.log(todoList.value)
}
onMounted(() => {
  getTeacherHomework()
})
</script>

<style scoped lang="less">
#stu-base-page {
  height: 100%;
  width: 100%;
  .stu-base-page-main {
    display: flex;
    flex-direction: row;
    .stu-base-page-right {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      width: 300px;
    }
  }
}
</style>
