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
      <t-dialog
        v-model:visible="visible"
        header="批量导入"
        attach="body"
        :confirm-on-enter="true"
        :on-cancel="onCancel"
        :on-esc-keydown="onEscKeydown"
        :on-close-btn-click="onCloseBtnClick"
        :on-overlay-click="onOverlayClick"
        :on-close="close"
        :on-confirm="onConfirmAnother"
        :confirm-btn="{
          content: '上传',
          variant: 'base',
          disabled: uploadBtnDisable,
        }"
      >
        <template #body>
          <t-button style="margin-bottom: 20px" @click="bulkImportOnClick">获得模板</t-button>
          <t-select v-model="selectClass" style="margin-bottom: 20px" placeholder="请选择要导入到的班级">
            <t-option
              v-for="item in chooseClass"
              :key="item.class_code"
              :value="item.id"
              :label="item.class_name"
              placeholder="选择要导入到的班级"
            ></t-option>
          </t-select>
          <t-upload
            ref="uploadRef"
            v-model="uploadFile"
            theme="file-input"
            placeholder="未选择文件"
            action="https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/egraderBackend.LATEST/studentManageService//bulkImportStudent"
            :headers="{
              class_id: selectClass,
              'E-Token': token,
            }"
            :auto-upload="false"
          ></t-upload>
        </template>
      </t-dialog>
      <template #actions>
        <t-button size="small" @click="onClick">批量导入</t-button>
      </template>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherStudentManage',
}
</script>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { VxeColumnPropTypes } from 'vxe-table'
// eslint-disable-next-line no-unused-vars
import { getCourseStudent, uploadBulkImport } from '@/apis/course'
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
import { modelFileDownLoad } from '@/apis/oss/courseFile'
import { storage } from '@/utils/storage'

const classNameFilter = ref([])
const tableLoading = ref(false)
const tableData = ref([])
const chooseStore = useChooseStore()
const visible = ref(false)
const { chooseCourse, chooseClass } = storeToRefs(chooseStore)
const selectClass = ref([])
const uploadFile = ref([])
const uploadBtnDisable = ref(true)
const uploadRef = ref()
const token = ref(null)
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
const onClick = (context) => {
  console.log('点击了确认按钮，弹出弹窗', context)
  visible.value = true
}
const onConfirmAnother = (context) => {
  console.log('点击了确认按钮', context)
  uploadRef.value.uploadFiles()
  visible.value = false
}
const close = (context) => {
  console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context)
  uploadFile.value = []
  selectClass.value = null
  uploadBtnDisable.value = true
}
const onCancel = (context) => {
  console.log('点击了取消按钮', context)
}
const onEscKeydown = (context) => {
  console.log('按下了ESC', context)
}
const onCloseBtnClick = (context) => {
  console.log('点击了关闭按钮', context)
}
const bulkImportOnClick = () => {
  modelFileDownLoad()
}
watch(
  () => uploadFile.value,
  (newVal) => {
    uploadBtnDisable.value = selectClass.value == null
  },
)
watch(
  () => selectClass.value,
  (newVal) => {
    uploadBtnDisable.value = uploadFile.value.length === 0
  },
)
onMounted(() => {
  getStudent()
  token.value = storage.get('E-Token')
})
</script>

<style scoped></style>
