<template>
  <div class="teacher-student-manage">
    <t-card title="学生管理" style="margin: 30px">
      <vxe-table
        border
        :row-config="{ isCurrent: true, isHover: true }"
        :column-config="{ resizable: true }"
        :sort-config="{ iconAsc: 'fa fa-chevron-up', iconDesc: 'fa fa-chevron-down' }"
        :loading="tableLoading"
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
import { ref } from 'vue'
import { VxeColumnPropTypes } from 'vxe-table'
const classNameFilter = ref([])
const tableLoading = ref(false)
const classNameFilterMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
  return row.class_id === value
}
const popStudent = function (row) {}
</script>

<style scoped></style>
