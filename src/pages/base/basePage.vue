<template>
  <div id="base-page">
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
        <doughnut-rounded></doughnut-rounded>
      </div>
    </t-card>
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
const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
const hoursTip = ref('')
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
  display: flex;
  .base-page-hello {
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
  .base-page-card {
    height: 200px;
    width: 300px;
    margin: 20px 10px 10px 20px;
  }
  #class_number_sum {
    height: 100%;
    width: 100%;
  }
}
</style>
