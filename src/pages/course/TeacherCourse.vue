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
      <vxe-table align="center" :data="chooseClass" :loading="formLoading">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="class_name" title="班级名"></vxe-column>
        <vxe-column field="class_code" title="班级码"></vxe-column>
        <vxe-column field="create_time" title="创建时间" :formatter="formatTime"></vxe-column>
        <vxe-column field="class_introduction" title="班级介绍"></vxe-column>
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
  name: 'TeacherCourse',
}
</script>
<script setup lang="ts">
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
import { VxeColumnPropTypes } from 'vxe-table'
import XEUtils from 'xe-utils'
import { deleteClassByID } from '@/apis/course'
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'

const chooseStore = useChooseStore()
const { chooseCourse, chooseClass } = storeToRefs(chooseStore)
const formatTime: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  return XEUtils.toDateString(cellValue, 'yyyy年MM月dd日 HH时ss分')
}
const formLoading = ref(false)
const editClass = function (row) {
  console.log(row)
}

const deleteClassDialog = function (row) {
  const confirmLoad = false
  const confirmDia = DialogPlugin({
    header: '确认删除？',
    body: '删除后所有学生信息会丢失！',
    cancelBtn: '取消',
    draggable: true,
    onConfirm: async ({ e }) => {
      console.log('e: ', e)
      if (await deleteClass(row)) {
        confirmDia.hide()
      }
    },
    onClose: () => {
      confirmDia.hide()
    },
  })
}

const deleteClass = async function (row) {
  await deleteClassByID(row.id)
    .then(async () => {
      await MessagePlugin.success('删除成功！')
      await chooseStore.flushChooseClass()
    })
    .catch(async (err) => {
      console.log(err)
      await MessagePlugin.error('删除失败！')
      return false
    })
  return true
}
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
