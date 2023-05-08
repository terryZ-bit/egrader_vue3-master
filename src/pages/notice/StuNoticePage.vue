<!--
    @author: Terry_z
    @date: 2022/5/20 - 17:56
    @fileName: StuNoticePage
 -->

<template>
  <div id="stu-notice-page">
    <t-card title="通知管理" style="margin: 30px" bordered header-bordered :shadow="true">
      <vxe-table :data="noticeList" border :loading="tableLoading">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="notice_topic" title="通知题目"></vxe-column>
        <vxe-column field="notice_content" title="通知内容"></vxe-column>
        <vxe-column field="create_time" title="发布时间" :formatter="formatTime"></vxe-column>
      </vxe-table>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StuNoticePage',
}
</script>
<script lang="ts" setup>
import { useChooseStore, useNoticeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { VxeColumnPropTypes } from 'vxe-table'
import XEUtils from 'xe-utils'
const chooseStore = useChooseStore()
const noticeStore = useNoticeStore()
const { noticeList } = storeToRefs(noticeStore)
// eslint-disable-next-line no-unused-vars
const { chooseClass, chooseCourse } = storeToRefs(chooseStore)
const tableLoading = ref(false)
const formatTime: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  return XEUtils.toDateString(cellValue, 'yyyy年MM月dd日 HH时ss分')
}
const getNoticeList = async function () {
  tableLoading.value = true
  noticeStore.clearNoticeList()
  // @ts-ignore
  if (noticeStore.flushNoticeByClass(chooseClass.value.class_id)) {
    tableLoading.value = false
  }

  tableLoading.value = false
}

onMounted(() => {
  getNoticeList()
})
</script>

<style scoped></style>
