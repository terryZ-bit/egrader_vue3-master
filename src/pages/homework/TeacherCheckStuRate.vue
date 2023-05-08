<!--
    @author: Terry_z
    @date: 2023/4/26 - 16:49
    @fileName: TeacherCheckStuRate
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
          {{ props.studentName }} 互评任务完成情况
        </p>
      </div>
      <div class="teacher-watch-homework-main-area">
        <t-divider></t-divider>
        <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">互评情况</p>
        <t-skeleton animation="flashed" :loading="rateEachLoadingControl">
          <div style="margin-left: 20px; margin-top: 20px">
            <t-collapse v-for="item in rateEachList" :key="item.id">
              <t-collapse-panel>
                <template #header>
                  对 &nbsp;&nbsp;{{ item.student_name }} &nbsp; &nbsp; {{ item.student_number }} &nbsp; &nbsp; 的评分
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 原始评分：{{ item.grade }}
                  &nbsp; &nbsp; 可信度：
                  {{ item.reliability }}
                </template>
                <vxe-table :loading="rateEachLoadingControl" border :data="item.rate_detail">
                  <vxe-column type="seq" width="60"></vxe-column>
                  <vxe-column field="score" title="分数"></vxe-column>
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
import { getStuOneRateDetail } from '@/apis/homework/teacherHomework'
import { onMounted, ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

interface Props {
  teacherHomeworkId?: string
  studentName?: string
  studentId?: string
}

const props = withDefaults(defineProps<Props>(), {
  teacherHomeworkId: '',
  studentName: '',
  studentId: '',
})

const rateEachLoadingControl = ref(false)
const rateEachList = ref([])

const getRateEachList = function () {
  getStuOneRateDetail(props.teacherHomeworkId, props.studentId)
    .then((resp) => {
      // @ts-ignore
      rateEachList.value = resp.data.data
    })
    .catch(() => {
      MessagePlugin.error('获取学生互评信息错误')
    })
}

onMounted(() => {
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
