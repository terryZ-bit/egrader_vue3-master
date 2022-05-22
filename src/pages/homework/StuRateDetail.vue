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
            <vxe-column field="fileName" title="文件名称"></vxe-column>
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
          <div v-for="item in senDetail" :key="item.id">
            <t-form label-align="left" style="margin-left: 20px">
              <t-form-item label="得分点">
                <t-tag>第{{ item.question_id }}得分点</t-tag>
              </t-form-item>
              <t-form-item label="打分标准">{{ item.question_name }}</t-form-item>
              <t-form-item label="分数上限">{{ item.score_max }}</t-form-item>
              <t-form-item label="打分">
                <t-input-number></t-input-number>
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
import { useRateEachStore } from '@/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { getTeacherHomeworkFile } from '@/apis/homework/teacherHomework'
import router from '@/router'

interface Props {
  rateParam?: string
  homeworkParam?: string
}
const props = withDefaults(defineProps<Props>(), {
  rateParam: '',
  homeworkParam: '',
})
const rateEachStore = useRateEachStore()
const fileList = ref([])
const homeworkMessage = ref('')
// eslint-disable-next-line no-unused-vars
const { rateDetailJson, senDetail } = storeToRefs(rateEachStore)
const downloadTHomeworkFile = function (row) {
  getTeacherHomeworkFile(row.id)
}
const submitDetail = function () {
  rateEachStore.setDetailStatus(props.rateParam)
  console.log('success')
  router.push({ name: 'stuRateEach', params: { rateParam: props.homeworkParam } })
}
onMounted(() => {
  rateDetailJson.value['97'].forEach((item) => {
    if (item.id === props.rateParam) {
      fileList.value = [
        {
          id: props.rateParam,
          fileName: item.fileName,
        },
      ]
      homeworkMessage.value = item.homework_message
    }
  })
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
