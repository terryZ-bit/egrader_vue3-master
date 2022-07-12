<!--
    @author: Terry_z
    @date: 2022/5/20 - 17:39
    @fileName: StuRateEach
 -->
<template>
  <div id="stu-rate-each">
    <t-card style="margin: 30px" ordered header-bordered :shadow="true">
      <div style="display: flex; flex-direction: column">
        <div>
          <t-button
            theme="primary"
            variant="text"
            style="float: left; display: inline"
            @click="$router.push({ name: 'stuHomework' })"
          >
            <template #icon>
              <t-icon name="rollback"></t-icon>
            </template>
            返回
          </t-button>
        </div>
        <p style="margin-right: auto; padding-left: 20px; margin-top: 20px; font-size: x-large">互评详情</p>
        <div>
          <div class="teacher-homework-detail-area">
            <t-divider></t-divider>
            <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">作业主体</p>
            <t-skeleton animation="flashed" :loading="skeletonLoading">
              <t-row>
                <t-col span="6">
                  <div class="teacher-homework-detail-span-left">
                    <span>作业名称：</span>
                    <i>{{ homeworkInfo.name }}</i>
                  </div>
                </t-col>
                <t-col span="6">
                  <div class="teacher-homework-detail-span-left">
                    <span>分数上限：</span>
                    <i>{{ homeworkInfo.score_max }}</i>
                  </div>
                </t-col>
              </t-row>
              <t-row>
                <t-col span="6">
                  <div class="teacher-homework-detail-span-left">
                    <span>发布时间：</span>
                    <i>{{ XEUtils.toDateString(homeworkInfo.create_time, 'yyyy-MM-dd HH:ss') }}</i>
                  </div>
                </t-col>
                <t-col span="6">
                  <div class="teacher-homework-detail-span-left">
                    <span>截止时间：</span>
                    <i>{{ XEUtils.toDateString(homeworkInfo.end_time, 'yyyy-MM-dd HH:ss') }}</i>
                  </div>
                </t-col>
              </t-row>
              <t-row>
                <t-col span="6">
                  <div class="teacher-homework-detail-span-left">
                    <span>是否进行互评：</span>
                    <i>{{ homeworkInfo.rate_each_flag === 1 ? '是' : '否' }}</i>
                  </div>
                </t-col>
                <t-col span="6">
                  <div class="teacher-homework-detail-span-left">
                    <span>有无评分细则：</span>
                    <i>{{ homeworkInfo.score_detail_flag === 1 ? '有' : '无' }}</i>
                  </div>
                </t-col>
              </t-row>
              <t-row>
                <t-col span="12">
                  <div class="teacher-homework-detail-span-left">
                    <span>作业主要内容：</span>
                    <i>{{ homeworkInfo.homework_introduction }}</i>
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
              <vxe-table style="margin-left: 20px" :data="homeworkInfo.oss_list">
                <vxe-column type="seq" width="60"></vxe-column>
                <vxe-column field="oss_path" title="文件名称" :formatter="formatFileName"></vxe-column>
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
              <t-row>
                <t-col span="12">
                  <div class="teacher-homework-detail-span-left">
                    <span>评分细则：</span>
                  </div>
                </t-col>
              </t-row>
              <vxe-table style="margin-left: 20px" :data="homeworkInfo.score_detail_list">
                <vxe-column type="seq" width="60"></vxe-column>
                <vxe-column field="question_name" title="评分点详情"></vxe-column>
                <vxe-column field="score_max" title="分数上限" width="100px"></vxe-column>
              </vxe-table>
            </t-skeleton>
            <t-divider></t-divider>
            <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">评分任务</p>
            <vxe-table style="margin-left: 20px" :data="fakeRate">
              <vxe-column type="seq" width="60"></vxe-column>
              <vxe-column field="homework_message" title="作业详情"></vxe-column>
              <vxe-column title="操作" width="140px">
                <template #default="{ row }">
                  <t-button
                    v-if="homeworkInfo.rate_expire"
                    theme="default"
                    variant="dashed"
                    disabled
                    style="color: #ff5959"
                    @click="detailHomework(row)"
                  >
                    已截止
                  </t-button>
                  <t-button
                    v-else
                    theme="default"
                    variant="dashed"
                    :disabled="row.rate_flag === 1"
                    @click="detailHomework(row)"
                  >
                    {{ row.rate_flag === 1 ? '已完成' : '去评分' }}
                  </t-button>
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
  name: 'StuRateEach',
}
</script>
<script lang="ts" setup>
import { getHomeworkInfo } from '@/apis/homework/studentHomework'
import { getTeacherHomeworkFile } from '@/apis/homework/teacherHomework'
import { useChooseStore, useRateEachStore } from '@/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import XEUtils from 'xe-utils'
import { VxeColumnPropTypes } from 'vxe-table'
import router from '@/router'
import { getRaths } from '@/apis/mutual_operation/studentEach'

const chooseStore = useChooseStore()
const rateEachStore = useRateEachStore()
// eslint-disable-next-line no-unused-vars
const { chooseRole, chooseClass, chooseCourse } = storeToRefs(chooseStore)
const { rateDetailJson } = storeToRefs(rateEachStore)
interface Props {
  rateParam?: string
}

const homeworkInfo = ref({})
const stuHomeworkDetailLoading = ref(false)
const skeletonLoading = ref(false)
const fakeRate = ref([])
const props = withDefaults(defineProps<Props>(), {
  rateParam: '',
})
const formatFileName: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = cellValue.lastIndexOf('/')
  return cellValue.substring(item + 1, cellValue.length)
}
const downloadTHomeworkFile = function (row) {
  getTeacherHomeworkFile(row.id)
}
const getHomeworkInfo_ = function () {
  stuHomeworkDetailLoading.value = true
  // @ts-ignore
  getHomeworkInfo(chooseRole.value.roleId, chooseClass.value.class_id, props.rateParam)
    .then((resp) => {
      console.log(resp)
      // @ts-ignore
      homeworkInfo.value = resp.data.data
      // @ts-ignore
      // if (homeworkInfo.value) {
      //
      // }
    })
    .finally(() => {
      stuHomeworkDetailLoading.value = false
    })
  // @ts-ignore
  getRaths(props.rateParam, chooseClass.value.student_id)
    .then((res) => {
      rateDetailJson.value = {}
      // @ts-ignore
      fakeRate.value = res.data.data
      // @ts-ignore
      for (const item of res.data.data) {
        rateDetailJson.value[item.rate_each_id.toString()] = {
          homework_oss: item.homework_oss,
          rate_each_detail: item.rate_each_detail,
        }
        // @ts-ignore
        rateDetailJson.value.teacher_homework_id = props.rateParam
      }
    })
    .finally(() => {})
}

const detailHomework = function (row) {
  router.push({ name: 'stuRateDetail', params: { rateParam: row.rate_each_id, homeworkParam: props.rateParam } })
}
onMounted(() => {
  homeworkInfo.value = {}
  getHomeworkInfo_()
  console.log(props.rateParam)
})
</script>

<style scoped lang="less">
@import '../../style/variables';
#stu-rate-each {
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
