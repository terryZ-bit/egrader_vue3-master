<!--
    @author: Terry_z
    @date: 2022/5/19 - 16:01
    @fileName: StuHomeworkDetail
 -->
<template>
  <div id="stu-homework-detail">
    <t-card style="margin: 30px" bordered header-bordered :shadow="true">
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
        <p style="margin-right: auto; padding-left: 20px; margin-top: 20px; font-size: x-large">作业详情</p>
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
                    <span>创建时间：</span>
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
                      <t-button shape="circle" variant="text" @click="downloadTchomeworkFile(row)">
                        <t-icon name="download" style="color: #002b9f"></t-icon>
                      </t-button>
                    </t-popup>
                  </template>
                </vxe-column>
              </vxe-table>
            </t-skeleton>
            <t-divider></t-divider>
            <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">学生作业状态</p>
            <t-skeleton :loading="stuHomeworkDetailLoading">
              <t-row>
                <t-col span="6">
                  <div class="teacher-homework-detail-span-left">
                    <span>学生作业状态：</span>
                    <t-tag
                      :theme="homeworkInfo.student_homework_finish_status === 1 ? 'success' : 'danger'"
                      variant="light"
                      >{{ homeworkInfo.student_homework_finish_status === 1 ? '已完成' : '未完成' }}</t-tag
                    >
                  </div>
                </t-col>
                <t-col span="6">
                  <div class="teacher-homework-detail-span-left">
                    <span>作业得分：</span>
                    <t-tag :theme="homeworkInfo.homework_grade === null ? 'danger' : 'success'" variant="light">{{
                      homeworkInfo.homework_grade === null ? '未发布' : homeworkInfo.homework_grade
                    }}</t-tag>
                  </div>
                </t-col>
              </t-row>
            </t-skeleton>
            <t-divider></t-divider>
            <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">
              {{ homeworkInfo.student_homework_finish_status === 1 ? '更新作业' : '提交作业' }}
            </p>
            <t-form style="margin-top: 30px">
              <t-form-item label="作业留言">
                <t-textarea v-model="homeworkMessage"></t-textarea>
              </t-form-item>
              <t-form-item label="作业附件">
                <vxe-table style="width: 100%" :data="homeworkInfo.student_homework_oss">
                  <vxe-column type="seq" width="60"></vxe-column>
                  <vxe-column field="path" title="文件名称" :formatter="formatFileName"></vxe-column>
                  <vxe-column title="操作" width="110px">
                    <template #default="{ row }">
                      <t-popup content="下载">
                        <t-button shape="circle" variant="text" @click="downloadTHomeworkFile(row)">
                          <t-icon name="download" style="color: #002b9f"></t-icon>
                        </t-button>
                      </t-popup>
                      <t-popup content="删除">
                        <t-button shape="circle" variant="text" @click="deleteHomeworkFile(row)">
                          <t-icon name="delete" style="color: red"></t-icon>
                        </t-button>
                      </t-popup>
                    </template>
                  </vxe-column>
                </vxe-table>
              </t-form-item>
              <t-form-item label="上传文件">
                <t-upload
                  v-model="files_"
                  placeholder="支持批量上传文件，文件格式不限，最多只能上传 10 份文件"
                  theme="file-flow"
                  multiple
                  :auto-upload="false"
                  :max="10"
                  :request-method="filesUpload"
                  style="margin-left: 20px; width: 100%"
                ></t-upload>
              </t-form-item>
              <t-button style="width: 200px; display: inline; margin-top: 20px" @click="submitHomework">{{
                homeworkInfo.student_homework_finish_status === 1 ? '更新作业' : '提交作业'
              }}</t-button>
            </t-form>
          </div>
        </div>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StuHomeworkDetail',
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  getHomeworkInfo,
  stuGetHomeworkOssPath,
  stuPushHomework,
  stuGetHomeworkFileUrl,
  stuDeleteHomeworkFile,
} from '@/apis/homework/studentHomework'
import { getTeacherHomeworkFile } from '@/apis/homework/teacherHomework'
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
import XEUtils from '_xe-utils@3.5.4@xe-utils'
import { RequestMethodResponse, MessagePlugin } from 'tdesign-vue-next'
import { getUploadSTS } from '@/apis/oss/sts'
import OSS from 'ali-oss'
import { VxeColumnPropTypes } from 'vxe-table'

const stuHomeworkDetailLoading = ref(false)
const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
const homeworkInfo = ref({})
const skeletonLoading = ref(false)
const sts = ref({
  token: '',
  ak: '',
  as: '',
})
const files_ = ref([])
const homeworkMessage = ref('')
interface Props {
  teacherHomeworkId?: string
}

const props = withDefaults(defineProps<Props>(), {
  teacherHomeworkId: '',
})
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
const filesUpload = async (file) => {
  let fileInfo
  let uploadFlag = false
  // @ts-ignore
  await stuGetHomeworkOssPath(homeworkInfo.value.student_homework_id, chooseRole.value.roleId, file.name).then(
    async (resp) => {
      // @ts-ignore
      fileInfo = resp.data.data
    },
  )
  const oss = new OSS({
    accessKeyId: sts.value.ak,
    accessKeySecret: sts.value.as,
    stsToken: sts.value.token,
    region: 'oss-cn-chengdu',
    bucket: 'e-homework',
    refreshSTSTokenInterval: 360000,
  })
  await oss
    .put(fileInfo.oss_path, file.raw)
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

const formatFileName: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = cellValue.lastIndexOf('/')
  return cellValue.substring(item + 1, cellValue.length)
}

const downloadTHomeworkFile = function (row) {
  stuGetHomeworkFileUrl(row.id)
}

const downloadTchomeworkFile = function (row) {
  getTeacherHomeworkFile(row.id)
}

const submitHomework = function () {
  // @ts-ignore
  stuPushHomework(chooseRole.value.roleId, homeworkInfo.value.student_homework_id, homeworkMessage.value).finally(
    () => {
      getHomeworkInfo_()
      files_.value = []
    },
  )
}

const getHomeworkInfo_ = function () {
  stuHomeworkDetailLoading.value = true
  // @ts-ignore
  getHomeworkInfo(chooseRole.value.roleId, chooseClass.value.class_id, props.teacherHomeworkId)
    .then((resp) => {
      // @ts-ignore
      homeworkInfo.value = resp.data.data
      // @ts-ignore
      if (homeworkInfo.value.student_homework_finish_status === 1) {
        // @ts-ignore
        homeworkMessage.value = homeworkInfo.value.student_homework_message
      }
      // if (homeworkInfo.value) {
      //
      // }
    })
    .finally(() => {
      stuHomeworkDetailLoading.value = false
    })
}

const deleteHomeworkFile = function (row) {
  stuDeleteHomeworkFile(row.id)
    .catch(() => {
      MessagePlugin.error('失败！')
    })
    .finally(() => {
      getHomeworkInfo_()
    })
}

onMounted(() => {
  stuHomeworkDetailLoading.value = true
  // @ts-ignore
  getHomeworkInfo_()
  handleUploadBegin()
})
</script>

<style scoped lang="less">
@import '../../style/variables';
#stu-homework-detail {
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
