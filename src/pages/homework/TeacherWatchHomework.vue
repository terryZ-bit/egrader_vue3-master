<!--
    @author: Terry_z
    @date: 2022/6/11 - 21:02
    @fileName: TeacherWatchHomework
 -->
<template>
  <div id="teacher-watch-homework">
    <t-card style="margin: 30px" bordered header-bordered :shadow="true">
      <div style="display: flex; flex-direction: column">
        <div>
          <t-button
            theme="primary"
            variant="text"
            style="float: left; display: inline"
            @click="$router.push({ name: 'teacherHomework' })"
          >
            <template #icon>
              <t-icon name="rollback"></t-icon>
            </template>
            返回
          </t-button>
        </div>
        <p style="margin-right: auto; padding-left: 20px; margin-top: 20px; font-size: x-large">
          {{ props.teacherHomeworkName }} 作业完成情况
        </p>
        <div>
          <div class="teacher-watch-homework-table">
            <vxe-table :data="homeworkList" :loading="tableLoading" border>
              <vxe-column type="seq" width="60"></vxe-column>
              <vxe-column field="student_name" title="学生姓名"></vxe-column>
              <vxe-column field="student_number" title="学生学号"></vxe-column>
              <vxe-column field="finish_status" title="是否完成" :formatter="formatYesOrNo"></vxe-column>
              <vxe-column field="homework_grade" title="成绩" :formatter="formatNullToCh"></vxe-column>
              <vxe-column field="rate_each_grade" title="互评成绩" :formatter="formatNullToCh"></vxe-column>
              <vxe-column field="rate_each_end_flag" title="互评是否完成" :formatter="formatYesOrNo"></vxe-column>
              <vxe-column title="操作" width="110px">
                <template #default="{ row }">
                  <t-popup content="查看互评详情">
                    <t-button shape="circle" variant="text" @click="detailHomework(row)">
                      <t-icon name="browse" style="color: #000000"></t-icon>
                    </t-button>
                  </t-popup>
                  <t-popup content="去评分">
                    <t-button shape="circle" variant="text" @click="scoreHomework(row)">
                      <t-icon name="edit" style="color: #0052d9"></t-icon>
                    </t-button>
                  </t-popup>
                </template>
              </vxe-column>
            </vxe-table>
          </div>
        </div>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherWatchHomework',
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { teacherGetAllHomework } from '@/apis/homework/teacherHomework'
import { formatYesOrNo, formatNullToCh } from '@/utils/format'
import router from '@/router'

interface Props {
  teacherHomeworkName?: string
  teacherHomeworkId?: string
}

const props = withDefaults(defineProps<Props>(), {
  teacherHomeworkName: '',
  teacherHomeworkId: '',
})
const tableLoading = ref(false)
const homeworkList = ref([])

const getAllHomework = async function () {
  tableLoading.value = true
  teacherGetAllHomework(props.teacherHomeworkId)
    .then(async (resp) => {
      // @ts-ignore
      homeworkList.value = resp.data.data
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      tableLoading.value = false
    })
}

const scoreHomework = function (row) {
  router.push({ name: 'teacherScoreHomework', params: { studentName: row.student_name, homeworkId: row.id } })
}
onMounted(() => {
  getAllHomework()
})
</script>

<style lang="less" scoped>
#teacher-watch-homework {
  .teacher-watch-homework-table {
    margin: 20px;
  }
}
</style>
