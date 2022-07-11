<!--
    @author: Terry_z
    @date: 2022/5/21 - 21:16
    @fileName: StuRateDetail
 -->
<template>
  <div id="stu-rate-detail">
    <t-card style="margin: 30px" ordered header-bordered :shadow="true">
      <div style="display: flex; flex-direction: column">
        <div>
          <t-button
            theme="primary"
            variant="text"
            style="float: left; display: inline"
            @click="$router.push({ name: 'stuRateEach', params: { rateParam: props.homeworkParam } })"
          >
            <template #icon>
              <t-icon name="rollback"></t-icon>
            </template>
            返回
          </t-button>
        </div>
        <div class="teacher-homework-detail-area">
          <p style="margin-right: auto; padding-left: 20px; margin-top: 20px; font-size: x-large">完成互评</p>
          <t-row>
            <t-col span="12">
              <div class="teacher-homework-detail-span-left">
                <span>作业留言：</span>
                <i>{{ homeworkMessage }}</i>
              </div>
            </t-col>
          </t-row>
          <t-row>
            <t-col span="12">
              <div class="teacher-homework-detail-span-left">
                <span>作业附件：</span>
              </div>
            </t-col>
          </t-row>
          <vxe-table style="margin-left: 20px; margin-top: 10px" :data="fileList">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="fileName" title=""></vxe-column>
            <vxe-column title="操作" width="110px">
              <template #default="{ row }">
                <t-popup content="下载">
                  <t-button shape="circle" variant="text" @click="downloadTHomeworkFile(row)">
                    <t-icon name="download" style="color: #002b9f"></t-icon>
                  </t-button>
                </t-popup>
              </template>
            </vxe-column>
          </vxe-table>
          <t-divider></t-divider>
          <t-row>
            <t-col span="12">
              <div class="teacher-homework-detail-span-left">
                <span>打分：</span>
              </div>
            </t-col>
          </t-row>
          <div v-for="(item, index) in homeworkInfo.score_detail_list" :key="item.id">
            <t-form label-align="left" style="margin-left: 20px">
              <t-form-item label="得分点">
                <t-tag>第{{ index + 1 }}题得分</t-tag>
              </t-form-item>
              <t-form-item label="评分标准">{{ item.question_name }}</t-form-item>
              <t-form-item label="分数上限">{{ item.score_max }}</t-form-item>
              <t-input auto-width />
              <t-form-item label="打分">
                <t-input-number v-model="senDetail[index].score" :max="item.score_max"></t-input-number>
              </t-form-item>
            </t-form>
            <t-divider></t-divider>
          </div>
          <div><t-button @click="submitDetail">提交</t-button></div>
        </div>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StuRateDetail',
}
</script>
<script lang="ts" setup>
import { useRateEachStore, useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { getTeacherHomeworkFile } from '@/apis/homework/teacherHomework'
import router from '@/router'
import { getHomeworkInfo } from '@/apis/homework/studentHomework'
import { uploadEach } from '@/apis/mutual_operation/studentEach'

const stuHomeworkDetailLoading = ref(false)

interface Props {
  rateParam?: string
  homeworkParam?: string
}
const props = withDefaults(defineProps<Props>(), {
  rateParam: '',
  homeworkParam: '',
})
const rateEachStore = useRateEachStore()
const chooseStore = useChooseStore()
const { chooseRole, chooseClass } = storeToRefs(chooseStore)

const fileList = ref([])
const senDetail = ref([])
const homeworkMessage = ref('')
const homeworkInfo = ref({})

// eslint-disable-next-line no-unused-vars
const { rateDetailJson } = storeToRefs(rateEachStore)
const downloadTHomeworkFile = function (row) {
  getTeacherHomeworkFile(row.id)
}
const submitDetail = function () {
  console.log(rateDetailJson.value[props.rateParam])
  const rateDetailList = rateDetailJson.value[props.rateParam].rate_each_detail
  const list = []
  list.push({ rate_each_id: props.rateParam })
  for (const i in rateDetailList) {
    list.push({
      rate_each_detail_id: rateDetailList[i].id,
      teacher_homework_detail_id: rateDetailList[i].teacher_homework_detail_id,
      score: senDetail.value[i].score,
    })
  }
  console.log(list)
  uploadEach(list)
    .then((resp) => {
      console.log('upload success!')
    })
    .finally(() => {})
  router.push({ name: 'stuRateEach', params: { rateParam: props.homeworkParam } })
}
const getHomeworkInfo_ = function () {
  stuHomeworkDetailLoading.value = true
  // @ts-ignore
  getHomeworkInfo(chooseRole.value.roleId, chooseClass.value.class_id, rateDetailJson.value.teacher_homework_id)
    .then((resp) => {
      // @ts-ignore
      homeworkInfo.value = resp.data.data
      // @ts-ignore
      if (homeworkInfo.value.student_homework_finish_status === 1) {
        // @ts-ignore
        homeworkMessage.value = homeworkInfo.value.student_homework_message
      }
      console.log('1111', homeworkInfo.value)
    })
    .finally(() => {
      stuHomeworkDetailLoading.value = false
    })
}

onMounted(() => {
  fileList.value = rateDetailJson.value[props.rateParam].homework_oss
  senDetail.value = rateDetailJson.value[props.rateParam].rate_each_detail
  console.log(fileList.value)
  console.log(fileList.value)
  console.log(senDetail.value)
  console.log(senDetail.value)

  getHomeworkInfo_()
})
</script>

<style scoped lang="less">
@import '../../style/variables';
#stu-rate-detail {
  .teacher-homework-detail-area {
    display: flex;
    flex-direction: column;
    span {
      margin-left: 20px;
      font-weight: normal;
      color: @text-color-secondary;
    }
    .t-col {
      margin-top: 20px;
    }
    .teacher-homework-detail-span-left {
      float: left;
      i {
        border-radius: @border-radius-50;
      }
    }
  }
}
</style>
