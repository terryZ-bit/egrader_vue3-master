<!--
    @author: Terry_z
    @date: 2022/6/12 - 16:49
    @fileName: TeacherScoreHomework
 -->
<template>
  <div id="teacher-score-homework">
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
          {{ props.studentName }} 作业完成情况
        </p>
      </div>
      <div class="teacher-watch-homework-main-area">
        <t-divider></t-divider>
        <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">作业主体</p>
        <t-skeleton animation="flashed" :loading="loadingControl">
          <t-row>
            <t-col span="6">
              <div class="teacher-watch-homework-span-left">
                <span>作业留言：</span>
                <i>{{ homeworkDetail.homework_message }}</i>
              </div>
            </t-col>
            <t-col span="6">
              <div class="teacher-watch-homework-span-left">
                <span>分数：</span>
                <i>{{ homeworkDetail.homework_grade }}</i>
              </div>
            </t-col>
          </t-row>
        </t-skeleton>
        <t-divider></t-divider>
        <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">作业附件</p>
        <vxe-table
          :data="homeworkDetail.oss"
          :loading="loadingControl"
          border
          style="margin-top: 20px; margin-left: 20px"
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="oss_url" title="文件名"></vxe-column>
          <vxe-column field="update_time" title="最后提交时间" :formatter="formatTime"></vxe-column>
          <vxe-column title="操作" width="100px">
            <template #default="{ row }">
              <t-popup content="下载">
                <t-button shape="circle" variant="text" @click="downloadHomework(row)">
                  <t-icon name="download" style="color: #000000"></t-icon>
                </t-button>
              </t-popup>
            </template>
          </vxe-column>
        </vxe-table>
        <t-divider></t-divider>
        <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">作业打分</p>
        <t-skeleton animation="flashed" :loading="loadingControl">
          <div style="display: block; width: 100%">
            <t-row style="margin-left: 20px">
              <t-col span="6">
                <t-form>
                  <t-form-item label="打分">
                    <t-input-number v-model="grade"></t-input-number>
                  </t-form-item>
                </t-form>
              </t-col>
              <t-col span="6">
                <t-button :loading="submitBtnLoading" @click="submitGrade()">提交</t-button>
              </t-col>
            </t-row>
          </div>
        </t-skeleton>
        <t-divider animation="flashed"></t-divider>
        <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">互评情况</p>
        <t-skeleton animation="flashed" :loading="rateEachLoadingControl">
          <div style="margin-left: 20px; margin-top: 20px">
            <t-collapse v-for="item in rateEachList" :key="item.id">
              <t-collapse-panel>
                <template #header>
                  {{ item.student_name }} &nbsp; &nbsp; {{ item.student_number }} &nbsp; &nbsp; 的评分 &nbsp; &nbsp;
                  &nbsp; &nbsp; 原始评分：{{ item.grade }} &nbsp; &nbsp; 可信度：
                  {{ item.reliability }}
                </template>
                <vxe-table :loading="rateEachLoadingControl" border :data="item.rate_each_detail">
                  <vxe-column type="seq" width="60"></vxe-column>
                  <vxe-column field="grade" title="分数"></vxe-column>
                </vxe-table>
              </t-collapse-panel>
            </t-collapse>
          </div>
        </t-skeleton>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherScoreHomework',
}
</script>
<script lang="ts" setup>
import {
  teacherGetHomeworkDetail,
  teacherUpdateStudentGrade,
  getStuRateEachInfo,
} from '@/apis/homework/teacherHomework'
import { stuGetHomeworkFileUrl } from '@/apis/homework/studentHomework'
import { onMounted, ref } from 'vue'
import { formatTime, GMTToStr } from '@/utils/format'
import { MessagePlugin } from 'tdesign-vue-next'

interface Props {
  homeworkId?: string
  studentName?: string
}

const props = withDefaults(defineProps<Props>(), {
  homeworkId: '',
  studentName: '',
})

const homeworkDetail = ref({})
const loadingControl = ref(false)
const grade = ref(undefined)
const submitBtnLoading = ref(false)
const rateEachLoadingControl = ref(false)
const rateEachList = ref([])

const submitGrade = async function () {
  submitBtnLoading.value = true
  await teacherUpdateStudentGrade(props.homeworkId, grade.value)
    .then(() => {
      MessagePlugin.success('修改成功！')
    })
    .catch((err) => {
      MessagePlugin.error('提交失败')
      console.log(err)
    })
    .finally(() => {
      submitBtnLoading.value = false
    })
}

const getDataStudentHomeworkDetail = function (homeworkId) {
  loadingControl.value = true
  teacherGetHomeworkDetail(homeworkId)
    .then(async (resp) => {
      // @ts-ignore
      homeworkDetail.value = resp.data.data
      // @ts-ignore
      if (homeworkDetail.value.homework_grade === null) {
        // @ts-ignore
        homeworkDetail.value.homework_grade = '暂无'
      } else {
        // @ts-ignore
        grade.value = homeworkDetail.value.homework_grade
      }
      // @ts-ignore
      homeworkDetail.value.oss.forEach((item) => {
        item.update_time = GMTToStr(item.update_time)
      })
      console.log(homeworkDetail.value)
      // @ts-ignore
      console.log(typeof homeworkDetail.value.update_time)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loadingControl.value = false
    })
}

const downloadHomework = function (row) {
  stuGetHomeworkFileUrl(row.id)
}

const getRateEachList = function () {
  getStuRateEachInfo(props.homeworkId)
    .then((resp) => {
      // @ts-ignore
      rateEachList.value = resp.data.data
    })
    .catch(() => {
      MessagePlugin.error('获取学生互评信息错误')
    })
}

onMounted(() => {
  getDataStudentHomeworkDetail(props.homeworkId)
  getRateEachList()
})
</script>

<style lang="less" scoped>
@import '../../style/variables';
#teacher-score-homework {
  .teacher-watch-homework-main-area {
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
    .teacher-watch-homework-span-left {
      float: left;
      i {
        border-radius: @border-radius-50;
      }
    }
  }
}
</style>
