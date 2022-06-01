<template>
  <div id="teacher-notice-page">
    <t-dialog
      v-model:visible="newNoticeVisibleModal"
      header="新建通知"
      mode="modal"
      :draggable="true"
      :on-confirm="newNotice"
      :confirm-btn="{
        content: '新建',
        loading: newNoticeConfirmBtnLoading,
      }"
    >
      <template #body>
        <t-form :data="newNoticeForm">
          <t-form-item label="通知标题">
            <t-input v-model="newNoticeForm.notice_topic"></t-input>
          </t-form-item>
          <t-form-item label="通知内容">
            <t-textarea v-model="newNoticeForm.notice_content"></t-textarea>
          </t-form-item>
          <t-form-item label="是否保存草稿">
            <t-radio-group v-model="newNoticeForm.notice_type">
              <t-radio value="0">是</t-radio>
              <t-radio value="1">否，直接发布</t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item>
            <t-select v-model="newNoticeForm.class_id" placeholder="请选择发布到的班级" multiple>
              <t-option v-for="item in chooseClass" :key="item.id" :value="item.id" :label="item.class_name"></t-option>
            </t-select>
          </t-form-item>
        </t-form>
      </template>
    </t-dialog>
    <t-card title="通知管理" style="margin: 30px 30px" header-bordered bordered>
      <template #actions>
        <t-button size="small" @click="newNoticeVisibleModal = true">新建通知</t-button>
      </template>
      <vxe-table :data="noticeList" border :loading="tableLoading">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="notice_topic" title="通知题目"></vxe-column>
        <vxe-column field="notice_content" title="通知内容"></vxe-column>
        <vxe-column field="create_time" title="创建时间" :formatter="formatTime"></vxe-column>
        <vxe-column field="notice_type" title="通知状态" :formatter="formatType"></vxe-column>
        <vxe-column title="操作" width="100px">
          <template #default="{ row }">
            <t-button shape="circle" variant="text" @click="editNotice(row)">
              <t-icon name="edit" style="color: #002b9f"></t-icon>
            </t-button>
            <t-button shape="circle" variant="text" @click="deleteNotice(row)">
              <t-icon name="delete" style="color: red"></t-icon>
            </t-button>
          </template>
        </vxe-column>
      </vxe-table>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherNoticePage',
}
</script>
<script lang="ts" setup>
import { useChooseStore, useNoticeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { createNotice } from '@/apis/notice'
import { VxeColumnPropTypes } from 'vxe-table'
import XEUtils from 'xe-utils'
const NOTICE_INIT = {
  notice_type: '',
  notice_topic: '',
  notice_content: '',
  class_id: [],
}

const chooseStore = useChooseStore()
const noticeStore = useNoticeStore()
const { noticeList } = storeToRefs(noticeStore)
const { chooseClass, chooseCourse } = storeToRefs(chooseStore)
const newNoticeVisibleModal = ref(false)
const newNoticeForm = ref(NOTICE_INIT)
const newNoticeConfirmBtnLoading = ref(false)
const tableLoading = ref(false)
const formatTime: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  return XEUtils.toDateString(cellValue, 'yyyy年MM月dd日 HH时ss分')
}
const typeList = [
  { label: '已发布', value: 1 },
  { label: '未发布', value: 0 },
]
const formatType: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = typeList.find((item) => item.value === cellValue)
  return item ? item.label : ''
}
const newNotice = async function () {
  newNoticeConfirmBtnLoading.value = true
  await createNotice(
    chooseCourse.value.id,
    newNoticeForm.value.notice_type,
    newNoticeForm.value.notice_topic,
    newNoticeForm.value.notice_content,
    newNoticeForm.value.class_id,
  ).then(async () => {
    await noticeStore.flushNoticeByCourse(chooseCourse.value.id)
  })
  newNoticeVisibleModal.value = false
  newNoticeConfirmBtnLoading.value = false
}
const getNoticeList = async function () {
  tableLoading.value = true
  noticeStore.clearNoticeList()
  // @ts-ignore
  if (noticeStore.flushNoticeByCourse(chooseCourse.value.id)) {
    tableLoading.value = false
  }
  tableLoading.value = false
}
const editNotice = function (row) {}
const deleteNotice = function (row) {}
onMounted(() => {
  getNoticeList()
})
</script>

<style scoped></style>
