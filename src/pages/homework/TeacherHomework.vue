<template>
  <div id="teacher-homework">
    <t-card title="作业概览" style="margin: 30px" bordered header-bordered :shadow="true">
      <t-tabs v-model="headerMenuHomeworkSelect" theme="card" @change="handlerTabChange">
        <template v-for="item in teacherHomeworkList" :key="item.id">
          <t-tab-panel :value="item.id" :label="item.name">
            <t-skeleton :loading="skeletonLoading">
              <div v-if="item.end_flag !== 0" style="display: flex; flex-direction: column">
                <div style="display: flow">
                  <p style="float: left; margin-left: 30px; margin-top: 20px">
                    作业截止时间：{{ GMTToStr(item.end_time) }} &nbsp;&nbsp;&nbsp; 互评截止时间：{{
                      GMTToStr(item.rate_each_end_time)
                    }}
                    &nbsp;&nbsp;&nbsp; 作业状态：{{ judgeEndFlag(item.end_flag) }}
                    <t-button theme="primary" variant="text" size="big" @click="pushToTeacherHomeworkDetail(item.id)">
                      查看作业详情
                    </t-button>
                  </p>
                </div>
                <div>
                  <div style="float: left; margin-left: 30px">
                    <t-button theme="primary" variant="dashed" size="small" :disabled="item.end_flag !== 3">
                      打包作业
                    </t-button>
                    <t-button
                      theme="primary"
                      variant="dashed"
                      size="small"
                      :disabled="item.end_flag !== 3"
                      @click="exportDataEvent"
                      >导出成绩</t-button
                    >
                  </div>
                </div>
                <vxe-table
                  ref="xTable1"
                  style="margin-left: 30px; margin-top: 10px"
                  border
                  :data="teacherHomeworkToAllHomework"
                  :loading="AllHomeworkTableLoading"
                  :edit-config="{ trigger: 'manual', mode: 'row' }"
                  :export-config="{}"
                >
                  <vxe-column type="seq" width="60"></vxe-column>
                  <vxe-column field="student_number" title="学生学号" sortable></vxe-column>
                  <vxe-column field="student_name" title="学生姓名"></vxe-column>
                  <vxe-column
                    field="finish_status"
                    title="作业状态"
                    :filters="[
                      { label: '已完成', value: '已完成' },
                      { label: '未完成', value: '未完成' },
                    ]"
                    :filter-multiple="false"
                  ></vxe-column>
                  <vxe-column field="update_time" title="提交时间" :formatter="formatTime" sortable></vxe-column>
                  <vxe-column
                    field="rate_each_grade"
                    title="互评成绩"
                    :formatter="formatNullToCh"
                    sortable
                  ></vxe-column>
                  <vxe-column field="homework_grade" title="成绩" :formatter="formatNullToCh" sortable></vxe-column>
                  <vxe-column title="操作" width="160px">
                    <template #default="{ row }">
                      <div v-if="row.finish_status === '已完成'">
                        <t-button theme="primary" variant="text" size="small" @click="pushToTeacherScoreHomework(row)">
                          查看
                        </t-button>
                        <t-button theme="primary" variant="text" size="small" @click="editRowEvent(row)">修改</t-button>
                      </div>
                    </template>
                  </vxe-column>
                </vxe-table>
              </div>
              <!--  以下开始为未发布作业处理部分    -->
              <div v-else style="display: flex; flex-direction: column; margin-left: 20px; margin-top: 20px">
                <div style="display: flow">
                  <p style="float: left">
                    作业状态：
                    <span style="color: #c70708">未发布</span>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <t-button theme="primary" variant="text">查看作业详情</t-button>
                  </p>
                </div>
                <t-divider />
                <div style="display: flow">
                  <t-form>
                    <t-form-item label="提交截止时间">
                      <t-date-picker v-model="endTime" enable-time-picker format="YYYY-MM-DD HH:mm" />
                      <t-tag v-if="endTimeFFlag" theme="danger" style="margin-left: 10px">时间小于当前时间！</t-tag>
                    </t-form-item>
                    <t-form-item label="是否进行互评">
                      <t-checkbox v-model="rateEachCheckBox"></t-checkbox>
                    </t-form-item>
                    <t-form-item v-if="rateEachCheckBox" label="互评截止时间">
                      <t-date-picker v-model="rateEndTime" enable-time-picker format="YYYY-MM-DD HH:mm" />
                      <t-tag v-if="rateTimeFFlag && rateEachCheckBox" theme="danger" style="margin-left: 10px">
                        互评截止时间要在提交截止时间之后！
                      </t-tag>
                    </t-form-item>
                    <t-form-item label="互评任务量">
                      <t-input-number v-model="rateEachNum"></t-input-number>
                    </t-form-item>
                    <t-button
                      style="margin-top: 20px"
                      :loading="submitConfirmLoading"
                      :disabled="submitConfirmDisable"
                      @click="submitConfirmPublicHomework(item)"
                      >发布</t-button
                    >
                  </t-form>
                </div>
              </div>
            </t-skeleton>
          </t-tab-panel>
        </template>
      </t-tabs>
      <template #actions>
        <t-button size="small" :loading="submitConfirmLoading" @click="pushToNewHomework">新建作业</t-button>
      </template>
    </t-card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import router from '@/router'
import { confirmTeacherHomework, listTeacherHomework, teacherGetAllHomework } from '@/apis/homework/teacherHomework'
import { useChooseStore, useTeacherHomeworkStore } from '@/store'
import { storeToRefs } from 'pinia'
import { formatNullToCh, formatTime, GMTToStr } from '@/utils/format'
import { MessagePlugin } from 'tdesign-vue-next'

const chooseStore = useChooseStore()
const teacherHomeworkStore = useTeacherHomeworkStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
const { teacherHomeworkList } = storeToRefs(teacherHomeworkStore)

const pushToNewHomework = function () {
  router.push({ name: 'teacherNewHomework' })
}
// const detailHomework = function (row) {
//   router.push({ name: 'teacherHomeworkDetail', params: { teacherHomeworkId: row.id } })
// }
const skeletonLoading = ref(false)
const headerMenuHomeworkSelect = ref(undefined)
const teacherHomeworkToAllHomework = ref([])
const AllHomeworkTableLoading = ref(false)
const rateEachCheckBox = ref(true)
const selectClass = ref([])
const endTime = ref(undefined)
const rateEndTime = ref(undefined)
const submitConfirmLoading = ref(false)
const endTimeFFlag = ref(false)
const rateTimeFFlag = ref(false)
const submitConfirmDisable = ref(true)
const rateEachNum = ref(2)
const getTeacherHomeworkList = async function () {
  skeletonLoading.value = true
  await listTeacherHomework(chooseCourse.value.id, chooseRole.value.roleId)
    .then(async (resp) => {
      // @ts-ignore
      const respData = resp.data.data
      teacherHomeworkStore.setTeacherHomeworkList(respData)
    })
    .catch(async (err) => {
      console.log(err)
    })
    .finally(async () => {
      skeletonLoading.value = false
    })
}

watch(
  () => teacherHomeworkList.value,
  (newVal) => {
    if (headerMenuHomeworkSelect.value === undefined) {
      headerMenuHomeworkSelect.value = newVal[0].id
      handlerTabChange()
    }
  },
)

watch(
  () => endTime.value,
  (newVal) => {
    const d = new Date(Date.parse(newVal.replace(/-/g, '/')))
    const curDate = new Date()
    endTimeFFlag.value = d <= curDate
  },
)

watch(
  () => rateEndTime.value,
  (newVal) => {
    const d = new Date(Date.parse(newVal.replace(/-/g, '/')))
    const s = new Date(Date.parse(endTime.value.replace(/-/g, '/')))
    rateTimeFFlag.value = d < s
  },
)

watch(
  () => [endTime.value, rateEndTime.value, rateEachCheckBox.value],
  (newVal) => {
    if (newVal[0] !== undefined && rateEachCheckBox.value === false && endTimeFFlag.value === false) {
      submitConfirmDisable.value = false
    } else
      submitConfirmDisable.value = !(
        newVal[1] !== undefined &&
        rateEachCheckBox.value === true &&
        rateEndTime.value !== undefined &&
        endTimeFFlag.value === false &&
        rateTimeFFlag.value === false
      )
  },
)

const handlerTabChange = function () {
  AllHomeworkTableLoading.value = true
  teacherGetAllHomework(headerMenuHomeworkSelect.value)
    .then((resp) => {
      // @ts-ignore
      const data_ = resp.data.data
      teacherHomeworkToAllHomework.value = []
      data_.forEach((item) => {
        item.finish_status = item.finish_status === 0 ? '未完成' : '已完成'
        item.update_time = GMTToStr(item.update_time)
        if (item.rate_each_grade != null) {
          item.rate_each_grade = item.rate_each_grade.toFixed(2)
        }
        if (item.homework_grade != null) {
          item.homework_grade = parseFloat(item.homework_grade)
          item.homework_grade = item.homework_grade.toFixed(2)
        }
        teacherHomeworkToAllHomework.value.push(item)
      })
    })
    .finally(() => {
      AllHomeworkTableLoading.value = false
    })
}

const judgeEndFlag = function (flag) {
  let text = ''
  console.log(flag)
  switch (flag) {
    case 1:
      text = '已发布'
      break
    case 2:
      text = '互评中'
      break
    case 3:
      text = '已结束'
      break
  }
  return text
}

const submitConfirmPublicHomework = async function (item) {
  submitConfirmLoading.value = true
  await confirmTeacherHomework(
    item.id,
    endTime.value,
    rateEndTime.value,
    selectClass.value,
    rateEachCheckBox.value,
    rateEachNum.value,
  )
    .then(async () => {
      await MessagePlugin.success('发布成功！')
    })
    .catch(async () => {
      await MessagePlugin.error('发布失败')
    })
    .finally(async () => {
      submitConfirmLoading.value = false
      await getTeacherHomeworkList()
      await handlerTabChange()
    })
}

const pushToTeacherHomeworkDetail = function (teacherHomeworkId) {
  router.push({ name: 'teacherHomeworkDetail', params: { teacherHomeworkId } })
}

const pushToTeacherScoreHomework = function (row) {
  router.push({ name: 'teacherScoreHomework', params: { homeworkId: row.id, studentName: row.student_name } })
}

onMounted(() => {
  getTeacherHomeworkList()
})
</script>

<style scoped></style>
