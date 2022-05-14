<template>
  <div id="teacher-homework">
    <t-card title="作业概览" style="margin: 30px" bordered header-bordered :shadow="true">
      <template #actions>
        <t-button size="small" @click="pushToNewHomework">新建作业</t-button>
      </template>
      <div>
        <vxe-table :data="teacherHomeworkList" align="center">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="作业标题"></vxe-column>
          <vxe-column field="score_max" title="作业分数上限"></vxe-column>
          <vxe-column field="create_time" title="创建时间" :formatter="formatTime"></vxe-column>
          <vxe-column field="end_time" title="结束时间" :formatter="formatTime"></vxe-column>
          <vxe-column field="rate_each_flag" title="是否互评" :formatter="formatYesOrNo"></vxe-column>
          <vxe-column field="score_detail_flag" title="是否按小题打分" :formatter="formatYesOrNo"></vxe-column>
          <vxe-column field="class_name_list" title="发布到的班级"></vxe-column>
          <vxe-column title="操作" width="140px">
            <template #default="{ row }">
              <t-popup content="查看详情">
                <t-button shape="circle" variant="text" @click="detailHomework(row)">
                  <t-icon name="browse" style="color: #000000"></t-icon>
                </t-button>
              </t-popup>
              <t-popup content="编辑">
                <t-button shape="circle" variant="text" @click="editHomework(row)">
                  <t-icon name="edit" style="color: #002b9f"></t-icon>
                </t-button>
              </t-popup>
              <t-popup content="删除">
                <t-button shape="circle" variant="text" @click="deleteHomework(row)">
                  <t-icon name="delete" style="color: red"></t-icon>
                </t-button>
              </t-popup>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherHomework',
}
</script>
<script lang="ts" setup>
// eslint-disable-next-line no-unused-vars
import { onMounted, ref } from 'vue'
import { VxeColumnPropTypes } from '_vxe-table@4.2.3@vxe-table'
import XEUtils from '_xe-utils@3.5.4@xe-utils'
import router from '@/router'
import { listTeacherHomework } from '@/apis/homework/teacherHomework'
import { useChooseStore, useTeacherHomeworkStore } from '@/store'
import { storeToRefs } from 'pinia'

const chooseStore = useChooseStore()
const teacherHomeworkStore = useTeacherHomeworkStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
const { teacherHomeworkList } = storeToRefs(teacherHomeworkStore)
// const teacherHomeworkData = ref([
//   {
//     name: '作业标题',
//     homework_introduction: '作业内容',
//     rate_each_flag: 0,
//     score_detail_flag: 1,
//     create_time: '2022-04-26T02:32:30',
//     end_time: '2022-04-26T02:32:30',
//     class_id_list: ['111', '112'],
//     score_max: 99,
//   },
// ])
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
const pushToNewHomework = function () {
  router.push({ name: 'teacherNewHomework' })
}
const detailHomework = function (row) {
  router.push({ name: 'teacherHomeworkDetail', params: { teacherHomeworkId: row.id } })
}
const editHomework = function (row) {}
const deleteHomework = function (row) {}
const getTeacherHomeworkList = async function () {
  listTeacherHomework(chooseCourse.value.id, chooseRole.value.roleId)
    .then(async (resp) => {
      // @ts-ignore
      const respData = resp.data.data
      respData.forEach((item) => {
        item.class_id_list.forEach((item_) => {
          chooseClass.value.forEach((item__) => {
            if (item__.id === item_) {
              // eslint-disable-next-line no-prototype-builtins
              if (!item.hasOwnProperty('class_name_list')) {
                item.class_name_list = []
              }
              item.class_name_list.push(item__.class_name)
            }
          })
        })
      })
      teacherHomeworkStore.setTeacherHomeworkList(respData)
    })
    .catch(async (err) => {
      console.log(err)
    })
}

onMounted(() => {
  getTeacherHomeworkList()
})
</script>

<style scoped></style>
