<template>
  <div id="teacher-new-homework">
    <t-card style="margin: 30px">
      <div class="teacher-new-homework-top-area">
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
      <div class="teacher-new-homework-main-area">
        <p style="font-size: x-large; text-align: left; margin-bottom: 30px">新建作业</p>
        <t-steps v-model="homeworkStep" :default-current="0" style="margin-bottom: 30px">
          <t-step-item title="作业主要内容" />
          <t-step-item title="作业评分细则" />
          <t-step-item title="作业附件" />
        </t-steps>

        <div v-if="homeworkStep === 0" class="homework_main_input">
          <t-form colon label-align="left">
            <t-form-item label="作业标题">
              <t-input v-model="newHomeworkStepOneForm.name" placeholder="请输入作业标题"></t-input>
            </t-form-item>
            <t-form-item label="作业主要内容">
              <t-textarea
                v-model="newHomeworkStepOneForm.homeworkIntroduction"
                placeholder="请输入作业内容"
              ></t-textarea>
            </t-form-item>
            <t-form-item label="作业总分">
              <t-input-number v-model="newHomeworkStepOneForm.scoreMax" theme="row" :min="0"></t-input-number>
            </t-form-item>
            <t-form-item label="发布到班级">
              <t-select v-model="selectClass" placeholder="请选择要发布到的班级" multiple>
                <t-option
                  v-for="item in chooseClass"
                  :key="item.class_code"
                  :value="item.id"
                  :label="item.class_name"
                ></t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="截止时间">
              <t-date-picker
                v-model="newHomeworkStepOneForm.endTime"
                theme="primary"
                mode="date"
                format="YYYY-MM-DD HH:mm:ss"
                enable-time-picker
              ></t-date-picker>
            </t-form-item>
            <t-form-item>
              <t-checkbox v-model="newHomeworkStepOneForm.rateEachFlag" style="margin-right: 40px" value="1"
                >进行学生间互评</t-checkbox
              >
            </t-form-item>
          </t-form>
          <t-button :loading="stepOneLoading" @click="newHomeworkBody()">下一步</t-button>
        </div>
        <div v-else-if="homeworkStep === 1" class="homework_detail_input">
          <t-tag style="width: 300px">如果不想设置评分细则，可以直接点击下一步</t-tag>
          <div v-for="item in newScoreDetailList" :key="item.question_id" style="width: 100%">
            <div style="display: flex; margin-bottom: 10px; justify-content: space-between">
              <t-tag style="margin-top: 5px">第{{ item.question_id }}评分点</t-tag>
              <t-button
                shape="circle"
                variant="text"
                style="margin-bottom: 3px"
                @click="deleteDetailById(item.question_id)"
              >
                <t-icon name="delete" style="color: red"></t-icon>
              </t-button>
            </div>
            <t-form colon label-align="left">
              <t-form-item label="小题题目">
                <t-input v-model="item.question_name"></t-input>
              </t-form-item>
              <t-form-item label="分数上限">
                <t-input-number v-model="item.score_max"></t-input-number>
              </t-form-item>
            </t-form>
            <t-divider />
          </div>
          <t-button style="margin-bottom: 30px; width: 300px" @click="pushNewDetail">
            <template #icon>
              <t-icon name="add"></t-icon>
            </template>
            增加题目
          </t-button>
          <div class="new-homework-detail-next-area">
            <t-button theme="default" variant="outline" @click="homeworkStep -= 1">上一步</t-button>
            <t-button :loading="stepTwoLoading" @click="newHomeworkDetail()">下一步</t-button>
          </div>
        </div>
        <div
          v-else-if="homeworkStep === 2"
          style="display: flex; flex-direction: column; justify-content: center; align-items: center"
        >
          <t-upload
            v-model="files_"
            placeholder="支持批量上传文件，文件格式不限，最多只能上传 10 份文件"
            theme="file-flow"
            multiple
            :auto-upload="false"
            :max="10"
            :request-method="filesUpload"
          ></t-upload>
          <t-button style="width: 200px; display: inline; margin-top: 20px" @click="jumpToHomeworkPage()"
            >完成</t-button
          >
        </div>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherNewHomework',
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
import { createHomeworkBody, createHomeworkDetail, getTeacherHomeworkOssPaths } from '@/apis/homework/teacherHomework'
import { MessagePlugin, RequestMethodResponse } from 'tdesign-vue-next'
import { getUploadSTS } from '@/apis/oss/sts'
import OSS from 'ali-oss'
import router from '@/router'

const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
const homeworkStep = ref(0)
const files_ = ref([])
const selectClass = ref([])
const stepOneLoading = ref(false)
const stepTwoLoading = ref(false)
const newHomeworkId = ref('')
const sts = ref({
  token: '',
  ak: '',
  as: '',
})
const newHomeworkStepOneForm = ref({
  name: '',
  homeworkIntroduction: '',
  scoreMax: 100,
  scoreDetailFlag: false,
  rateEachFlag: false,
  endTime: '',
})
const newScoreDetailList = ref([
  {
    question_id: 1,
    question_name: '',
    score_max: undefined,
  },
])
const handleUploadBegin = () => {
  console.log('Uploading')
  getUploadSTS('put')
    .then(async (resp) => {
      // @ts-ignore
      sts.value.token = resp.data.data.token
      // @ts-ignore
      sts.value.ak = resp.data.data.ak
      // @ts-ignore
      sts.value.as = resp.data.data.as
    })
    .catch(async (err) => {
      console.log(err)
    })
}
const pushNewDetail = function () {
  newScoreDetailList.value.push({
    question_id: newScoreDetailList.value.length + 1,
    question_name: '',
    score_max: 9,
  })
}
const deleteDetailById = function (id) {
  newScoreDetailList.value.forEach((item, index, array) => {
    if (item.question_id === id) {
      array.splice(index, 1)
    }
  })
  newScoreDetailList.value.forEach((item, index) => {
    item.question_id = index + 1
  })
}

const newHomeworkBody = async function () {
  stepOneLoading.value = true
  console.log(newHomeworkStepOneForm, selectClass)
  await createHomeworkBody(
    chooseRole.value.roleId,
    newHomeworkStepOneForm.value.name,
    newHomeworkStepOneForm.value.homeworkIntroduction,
    newHomeworkStepOneForm.value.scoreMax,
    newHomeworkStepOneForm.value.scoreDetailFlag ? '1' : '0',
    newHomeworkStepOneForm.value.rateEachFlag ? '1' : '0',
    newHomeworkStepOneForm.value.endTime,
    selectClass.value,
  )
    .then(async (resp) => {
      await MessagePlugin.success('创建作业主体成功！')
      // @ts-ignore
      newHomeworkId.value = resp.data.data.homework_id
      stepOneLoading.value = false
      homeworkStep.value += 1
    })
    .catch(async () => {
      await MessagePlugin.error('新建错误！')
      stepOneLoading.value = false
    })
    .finally(() => {
      stepOneLoading.value = false
    })
}
const newHomeworkDetail = async function () {
  if (newScoreDetailList.value.length === 1) {
    if (newScoreDetailList.value.at(0).question_name === '') {
      homeworkStep.value += 1
      return
    }
  }
  stepTwoLoading.value = true
  await createHomeworkDetail(newHomeworkId.value, newScoreDetailList.value)
    .then(async () => {
      await MessagePlugin.success('创建小分成功！')
      stepTwoLoading.value = false
      homeworkStep.value += 1
    })
    .catch(async () => {
      await MessagePlugin.error('创建小分失败！')
      stepTwoLoading.value = false
    })
}

const filesUpload = async (file) => {
  let fileInfo
  let uploadFlag = false
  await getTeacherHomeworkOssPaths(chooseRole.value.roleId, newHomeworkId.value, [file.name]).then(async (resp) => {
    // @ts-ignore
    fileInfo = resp.data.data[0]
  })
  const oss = new OSS({
    accessKeyId: sts.value.ak,
    accessKeySecret: sts.value.as,
    stsToken: sts.value.token,
    region: 'oss-cn-chengdu',
    bucket: fileInfo.bucket_name,
    refreshSTSTokenInterval: 360000,
  })
  console.log(file, typeof file)
  await oss
    .put(fileInfo.oss_path + fileInfo.file_name, file.raw)
    .then(async () => {
      await console.log('开始上传文件')
      uploadFlag = true
    })
    .catch(async (err) => {
      console.log('这执行了吗', err)
      uploadFlag = false
    })
  return uploadFlag
    ? new Promise<RequestMethodResponse>((resolve) => {
        resolve({ status: 'success', response: {} })
      })
    : new Promise<RequestMethodResponse>((resolve) => {
        resolve({ status: 'fail', response: {}, error: '上传错误！' })
      })
}
const jumpToHomeworkPage = function () {
  router.push({ name: 'teacherHomework' })
}
onMounted(() => {
  handleUploadBegin()
})
</script>

<style scoped lang="less">
@import 'animate.css';
#teacher-new-homework {
  .teacher-new-homework-top-area {
    display: flex;
  }
  .teacher-new-homework-main-area {
    margin-right: 40px;
    margin-left: 40px;
    margin-top: 40px;
  }
  .homework_detail_input {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    justify-content: center;
    align-items: center;
  }
}
</style>
