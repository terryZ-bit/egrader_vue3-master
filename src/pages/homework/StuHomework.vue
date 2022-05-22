<!--
    @author: Terry_z
    @date: 2022/5/17 - 19:53
    @fileName: StuHomework
 -->
<template>
  <div id="stu-homework">
    <t-card title="作业总览" style="margin: 30px" bordered header-bordered :shadow="true">
      <vxe-table :data="teacherHomeworkList" align="center" :loading="homeworkPreviewLoading">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="作业标题"></vxe-column>
        <vxe-column field="end_time" title="结束时间" :formatter="formatTime"></vxe-column>
        <vxe-column field="rate_each_flag" title="是否互评" :formatter="formatYesOrNo"></vxe-column>
        <vxe-column field="score_detail_flag" title="是否按小题打分" :formatter="formatYesOrNo"></vxe-column>
        <vxe-column title="操作" width="110px">
          <template #default="{ row }">
            <t-popup content="查看详情">
              <t-button theme="default" variant="dashed" @click="detailHomework(row)"> 去完成 </t-button>
            </t-popup>
          </template>
        </vxe-column>
      </vxe-table>
    </t-card>
    <t-card title="互评任务" style="margin: 30px" bordered header-bordered :shadow="true">
      <vxe-table :data="homeworkRateEachList" align="center" :loading="homeworkPreviewLoading">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column title="作业标题" field="name"></vxe-column>
        <vxe-column title="互评任务总数" field="sum"></vxe-column>
        <vxe-column title="互评任务剩余数量" field="left"></vxe-column>
        <vxe-column title="操作" width="110px">
          <template #default="{ row }">
            <t-popup content="查看详情">
              <t-button theme="default" variant="dashed" @click="detailRateEach(row)"> 去评价 </t-button>
            </t-popup>
          </template>
        </vxe-column>
      </vxe-table>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StuHomework',
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { listAllHomeworks } from '@/apis/homework/studentHomework'
import { useChooseStore, useRateEachStore } from '@/store'
import { storeToRefs } from 'pinia'
import { VxeColumnPropTypes } from '_vxe-table@4.2.3@vxe-table'
import XEUtils from '_xe-utils@3.5.4@xe-utils'
import router from '@/router'

const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseClass, chooseCourse, chooseRole } = storeToRefs(chooseStore)
const homeworkPreviewLoading = ref(false)
const homeworkRateEachList = ref([])
const teacherHomeworkList = ref([])
const rateEachStore = useRateEachStore()
const { rateEachList } = storeToRefs(rateEachStore)
const typeYesOrNoList = [
  { label: '是', value: 1 },
  { label: '否', value: 0 },
]
const formatTime: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss')
}

const formatYesOrNo: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = typeYesOrNoList.find((item) => item.value === cellValue)
  return item ? item.label : ''
}
const getTeacherHomework = function () {
  homeworkPreviewLoading.value = true
  // @ts-ignore
  listAllHomeworks(chooseRole.value.roleId, chooseClass.value.class_id)
    .then((resp) => {
      console.log(resp)
      // @ts-ignore
      teacherHomeworkList.value = resp.data.data
      homeworkRateEachList.value = rateEachList.value
    })
    .finally(() => {
      homeworkPreviewLoading.value = false
    })
}

const detailHomework = function (row) {
  router.push({ name: 'stuHomeworkDetail', params: { teacherHomeworkId: row.id } })
}

const detailRateEach = function (row) {
  router.push({ name: 'stuRateEach', params: { rateParam: row.teacherHomeworkId } })
}
onMounted(() => {
  getTeacherHomework()
})
</script>

<style scoped></style>
