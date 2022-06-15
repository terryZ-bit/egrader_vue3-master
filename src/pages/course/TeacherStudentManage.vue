<template>
  <div class="teacher-student-manage">
    <t-card title="学生管理" style="margin: 30px">
      <vxe-table
        border
        :row-config="{ isCurrent: true, isHover: true }"
        :column-config="{ resizable: true }"
        :sort-config="{ iconAsc: 'fa fa-chevron-up', iconDesc: 'fa fa-chevron-down' }"
        :loading="tableLoading"
        :data="tableData"
      >
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="学生姓名"></vxe-column>
        <vxe-column field="student_number" title="学生学号" sortable></vxe-column>
        <vxe-column
          field="class_name"
          title="学生班级"
          :filters="classNameFilter"
          :filter-method="classNameFilterMethod"
        ></vxe-column>
        <vxe-column title="操作" width="100px">
          <template #default="{ row }">
            <t-popconfirm content="确认删除？">
              <t-button shape="circle" variant="text" @click="popStudent(row)">
                <t-icon name="delete" style="color: red"></t-icon>
              </t-button>
            </t-popconfirm>
          </template>
        </vxe-column>
      </vxe-table>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherStudentManage',
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { VxeColumnPropTypes } from 'vxe-table'
import { getCourseStudent } from '@/apis/course'
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'

const classNameFilter = ref([])
const tableLoading = ref(false)
const tableData = ref([])
const chooseStore = useChooseStore()
const { chooseCourse } = storeToRefs(chooseStore)
const classNameFilterMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
  return row.class_id === value
}
const popStudent = function (row) {}
const getStudent = async function () {
  tableLoading.value = true
  await getCourseStudent(chooseCourse.value.id)
    .then(async (resp) => {
      // @ts-ignore
      const data_ = resp.data.data
      const data = []
      data_.forEach((item, index, array) => {
        // 动态加载数据部分需要下一步开发，先开发基础功能
        classNameFilter.value.push({ label: item.class_name, value: item.class_name })
        const students = item.students
        students.forEach((item_, index_, array_) => {
          const it = item_
          it.class_name = item.class_name
          it.class_id = item.class_id
          data.push(it)
        })
      })
      tableData.value = data
    })
    .catch(() => {})
    .finally(() => {
      tableLoading.value = false
    })
}
onMounted(() => {
  getStudent()
})
</script>

<style scoped></style>
