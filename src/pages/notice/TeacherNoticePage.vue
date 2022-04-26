<template>
  <div id="teacher-notice-page">
    <t-dialog
      v-model:visible="newNoticeVisibleModal"
      header="新建通知"
      mode="modal"
      draggable="true"
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
          <t-form-item v-model="newNoticeForm.notice_type" label="是否保存草稿">
            <t-radio-group default-value="0">
              <t-radio value="0">是</t-radio>
              <t-radio value="1">否，直接发布</t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item>
            <t-select v-model="newNoticeForm.class_id" :options="chooseClass" placeholder="请选择云解决方案" multiple />
          </t-form-item>
        </t-form>
      </template>
    </t-dialog>
    <t-card title="通知管理" style="margin: 30px 30px" header-bordered bordered>
      <template #actions>
        <t-button size="small" @click="newNoticeVisibleModal = true">新建通知</t-button>
      </template>
      <vxe-table :data="noticeList" border :row-config="{ isHover: true }">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="notice_topic" title="通知题目"></vxe-column>
        <vxe-column field="notice_content" title="通知内容"></vxe-column>
        <vxe-column field="create_time" title="创建时间"></vxe-column>
        <vxe-column field="notice_type" title="通知状态"></vxe-column>
        <vxe-column title="操作" width="100px">
          <template #default="{ row }">
            <t-button shape="circle" variant="text" @click="editClass(row)">
              <t-icon name="edit" style="color: #002b9f"></t-icon>
            </t-button>
            <t-button shape="circle" variant="text" @click="deleteClassDialog(row)">
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
import { onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'
import { createNotice } from '@/apis/notice'
const NOTICE_INIT = {
  notice_type: 0,
  notice_topic: '',
  notice_content: '',
  class_id: [],
}

const chooseStore = useChooseStore()
const noticeStore = useNoticeStore()
const { noticeList } = storeToRefs(noticeStore)
const { chooseClass } = storeToRefs(chooseStore)
const newNoticeVisibleModal = ref(false)
const newNoticeForm = ref(NOTICE_INIT)
const newNoticeConfirmBtnLoading = ref(false)
onBeforeRouteUpdate((to) => {
  if (to.name === 'teacherNoticePage') {
    noticeStore.flushNoticeByClass(chooseStore.getChooseClassId)
  }
})
const newNotice = function () {
  newNoticeConfirmBtnLoading.value = true
  createNotice()
}
</script>

<style scoped></style>
