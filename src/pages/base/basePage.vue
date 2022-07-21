<template>
  <div id="base-page">
    <div class="base-page-top">
      <teacher-setup-base v-if="chooseClass === undefined || chooseClass.length === 0"></teacher-setup-base>
      <t-card bordered header-bordered :shadow="true" class="base-page-card">
        <div class="base-page-hello">
          <div class="base-page-hello-name">
            <div class="welcome-word">{{ hoursTip }} ！{{ chooseRole.roleName }}</div>
            <div style="font-size: medium; text-align: left; margin-top: 25px">
              您目前查看的课程：{{ chooseCourse.course_name }}
            </div>
            <div style="font-size: medium; text-align: left; margin-top: 25px">
              课程人数:<span style="color: #012b9d; font-weight: bold">&nbsp; 60人</span>
            </div>
          </div>
        </div>
      </t-card>
      <t-card bordered header-bordered :shadow="true" class="base-page-card">
        <div style="height: 160px; width: 250px">
          <doughnut-rounded
            :info="{
              title: '作业完成情况',
              data: [
                { value: 200, name: '已完成' },
                { value: 10, name: '未完成' },
              ],
              id: '1',
            }"
          ></doughnut-rounded>
        </div>
      </t-card>
      <t-card bordered header-bordered :shadow="true" class="base-page-card">
        <div style="height: 160px; width: 250px">
          <doughnut-rounded
            :info="{
              title: '作业分数分布',
              data: [
                { value: 200, name: '优秀' },
                { value: 120, name: '良好' },
                { value: 30, name: '较差' },
              ],
            }"
          ></doughnut-rounded>
        </div>
      </t-card>
    </div>
    <div class="base-page-medium">
      <t-card bordered header-bordered :shadow="true" class="long-page-card">
        <div style="height: 160px; width: 900px">
          <simple-category
            :info="{
              title: '本周课程活跃度',
              data: [300, 200, 134, 245, 40, 10, 560],
            }"
          ></simple-category>
        </div>
      </t-card>
    </div>
    <div class="base-page-bottom">
      <t-card bordered header-bordered :shadow="true" class="long-page-card">
        <div style="display: block; height: 30px">
          <p style="float: left; font-size: 18px; font-weight: bolder">作业成绩排名</p>
        </div>
        <div style="width: 100%">
          <vxe-table
            style="margin-left: 30px; margin-top: 10px"
            border
            :data="studentGradeData"
            :sort-config="{ defaultSort: { field: 'student_mix_grade', order: 'desc' } }"
          >
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="student_name" title="学生姓名"></vxe-column>
            <vxe-column field="student_num" title="学生学号" sortable></vxe-column>
            <vxe-column field="student_mix_grade" title="学生总成绩" sortable></vxe-column>
          </vxe-table>
        </div>
      </t-card>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BasePage',
}
</script>
<script lang="ts" setup>
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import TeacherSetupBase from '@/pages/base/components/teacherSetupBase.vue'
import DoughnutRounded from '@/components/echarts/DoughnutRounded.vue'
import SimpleCategory from '@/components/echarts/SimpleCategory.vue'
const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
const hoursTip = ref('')
const studentGradeData = ref([
  { student_name: '郑才睿', student_num: 60, student_mix_grade: 454 },
  { student_name: '黄川', student_num: 160, student_mix_grade: 580 },
  { student_name: '沈朗', student_num: 260, student_mix_grade: 389 },
  { student_name: '余成', student_num: 360, student_mix_grade: 432 },
  { student_name: '梁铭明', student_num: 460, student_mix_grade: 225 },
])
const getHoursTip = function () {
  const date = new Date()
  if (date.getHours() >= 0 && date.getHours() < 12) {
    hoursTip.value = '上午好'
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    hoursTip.value = '下午好'
  } else {
    hoursTip.value = '晚上好'
  }
}

onMounted(() => {
  getHoursTip()
})
</script>

<style scoped lang="less">
#base-page {
  .base-page-top {
    display: flex;
    flex-direction: row;
  }
  .base-page-card {
    height: 200px;
    width: 300px;
    margin: 20px 10px 10px 20px;
  }
  .long-page-card {
    height: auto;
    width: 960px;
    margin: 20px 10px 10px 20px;
  }
  display: flex;
  flex-direction: column;
  .base-page-hello {
    height: 160px;
    width: 250px;
    display: flex;
    .welcome-word {
      text-shadow: 0 1px 0 #eee;
      font-size: x-large;
      text-align: left;
      margin-top: 10px;
    }

    .base-page-hello-name {
      display: flex;
      flex-direction: column;
    }
  }
  #class_number_sum {
    height: 100%;
    width: 100%;
  }
}
</style>
