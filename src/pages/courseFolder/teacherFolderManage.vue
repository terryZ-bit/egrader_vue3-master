<template>
  <div id="teacher-folder-manage">
    <div class="folder-top-card">
      <t-card title="课程文档库" style="margin: 30px 30px" header-bordered bordered>
        <template #actions>
          <t-button size="small" @click="dialogVisable = true">上传文件</t-button>
        </template>
      </t-card>
      <t-dialog
        v-model:visible="dialogVisable"
        header="上传文件"
        mode="modal"
        draggable
        :close-on-overlay-click="false"
        :on-confirm="handleUploadComplete"
        :confirm-btn="{ content: '确认上传', loading: uploadConfirmBtnLoading }"
        :on-close="
          () => {
            dialogVisable = false
          }
        "
      >
        <template #body>
          <t-form :colon="true">
            <t-form-item label="文件" name="file">
              <t-tag :theme="tagConfig.theme" :variant="tagConfig.variant" style="margin-right: 20px">
                {{ tagConfig.index }}</t-tag
              >
              <input ref="uploadInput" style="display: none" type="file" @change="handleUploadChange" />
              <t-button size="small" :disabled="selectFileBtnDisabled" @click="handleUploadBegin">上传文件</t-button>
            </t-form-item>
            <t-form-item label="文件介绍">
              <t-textarea v-model="fileUploadConfig.fileRemark" placeholder="对文件的简单介绍"></t-textarea>
            </t-form-item>
            <t-form-item label="学生可见">
              <t-radio-group v-model="fileUploadConfig.fileVisitType" default-value="0">
                <t-radio value="1">可见</t-radio>
                <t-radio value="0">不可见</t-radio>
              </t-radio-group>
            </t-form-item>
          </t-form>
        </template>
      </t-dialog>
    </div>
    <div class="list-card-items" style="margin: 30px">
      <t-row :gutter="[16, 12]" justify="space-between">
        <t-col v-for="aFile in courseFileList" :key="aFile.id" :lg="4" :xs="6" :xl="3">
          <t-card :title="aFile.file_name" header-bordered class="list-card-items" :shadow="true">
            <template #footer>
              <t-row align="middle" justify="space-around">
                <t-col flex="auto">
                  <t-button
                    block
                    variant="text"
                    @click="
                      () => {
                        courseFileDownLoad(aFile.id, aFile.file_name)
                      }
                    "
                  >
                    <t-icon name="download" color="#052c9f"></t-icon>
                  </t-button>
                </t-col>
                <t-col flex="none">
                  <t-divider theme="vertical" />
                </t-col>
                <t-col flex="auto">
                  <t-button block variant="text">
                    <t-icon name="edit" color="#052c9f"></t-icon>
                  </t-button>
                </t-col>
                <t-col flex="none">
                  <t-divider theme="vertical" />
                </t-col>
                <t-col flex="auto">
                  <t-popconfirm
                    v-model="aFile.deletePopVisable"
                    content="确认删除文件？"
                    theme="danger"
                    :on-confirm="
                      () => {
                        return deleteCourseFile(aFile.id)
                      }
                    "
                  >
                    <t-button block variant="text">
                      <t-icon name="delete" color="#d75353"></t-icon>
                    </t-button>
                  </t-popconfirm>
                </t-col>
              </t-row>
            </template>
            <template #actions>
              <t-tag
                :theme="aFile.file_visit_type ? 'success' : 'primary'"
                :content="aFile.file_visit_type ? '学生可查看' : '仅教师查看'"
                size="small"
              ></t-tag>
            </template>
            <div class="list-card-main-content">
              <p>{{ aFile.file_remark }}</p>
            </div>
          </t-card>
        </t-col>
      </t-row>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherFolderManage',
}
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUploadSTS } from '@/apis/oss/sts'
import OSS from 'ali-oss'
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
import {
  courseFileUploadSuccess,
  getCourseFileUrl,
  teacherDeleteCourseFile,
  teacherGetCourseFiles,
  courseFileDownLoad,
} from '@/apis/oss/courseFile'
import { MessagePlugin } from 'tdesign-vue-next'

const sts = ref({
  token: '',
  ak: '',
  as: '',
})
const ossUploadConfig = ref({
  bucketName: '',
  url: '',
})
const fileUploadConfig = ref({
  fileName: '',
  fileRemark: '',
  fileVisitType: 0,
})
const uploadInput = ref<HTMLElement | null>(null)
const file_ = ref<File>()
const tagConfig = ref({
  theme: 'default',
  index: '还未选择文件',
  variant: 'dark',
})
const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseRole } = storeToRefs(chooseStore)
const uploadConfirmBtnLoading = ref(false)
const selectFileBtnDisabled = ref(false)
const dialogVisable = ref(false)
const courseFileList = ref([])
const handleUploadChange = async (e: Event) => {
  const input = e.target as HTMLElement
  // @ts-ignore
  const file = input.files
  if (file) {
    tagConfig.value.index = file[0].name
    file_.value = file[0]
    tagConfig.value.theme = 'primary'
    tagConfig.value.variant = 'light'
    console.log(file_.value)
  }
  await getCourseFileUrl(chooseRole.value.roleId, chooseCourse.value.id, file_.value.name)
    .then(async (resp) => {
      // @ts-ignore
      ossUploadConfig.value.url = resp.data.data.url
      // @ts-ignore
      ossUploadConfig.value.bucketName = resp.data.data.bucket_name
    })
    .catch(async (err) => {
      console.log(err)
    })
}
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
  const oBtn = uploadInput.value as unknown as HTMLElement
  oBtn.click()
}
const handleUploadComplete = async function () {
  uploadConfirmBtnLoading.value = true
  selectFileBtnDisabled.value = true
  const oss = new OSS({
    accessKeyId: sts.value.ak,
    accessKeySecret: sts.value.as,
    stsToken: sts.value.token,
    region: 'oss-cn-chengdu',
    bucket: ossUploadConfig.value.bucketName,
    refreshSTSTokenInterval: 360000,
  })
  await oss.put(ossUploadConfig.value.url, file_.value).then(async (resp) => {
    console.log(resp)
    await courseFileUploadSuccess(
      chooseRole.value.roleId,
      file_.value.name,
      fileUploadConfig.value.fileRemark,
      fileUploadConfig.value.fileVisitType,
      chooseCourse.value.id,
    )
      .then(async () => {
        flushCourseFiles()
      })
      .catch(async () => {
        await MessagePlugin.error('上传失败！')
      })
    uploadConfirmBtnLoading.value = false
    selectFileBtnDisabled.value = false
    dialogVisable.value = false
  })
}
const flushCourseFiles = function () {
  teacherGetCourseFiles(chooseCourse.value.id)
    .then((resp) => {
      // @ts-ignore
      courseFileList.value = resp.data.data
      courseFileList.value.forEach((item) => {
        item.deletePopVisable = false
        item.confirmBtnLoading = false
      })
    })
    // eslint-disable-next-line node/handle-callback-err,n/handle-callback-err
    .catch((err) => {
      MessagePlugin.error('获取课程文档库错误！')
    })
}
const deleteCourseFile = async function (fileId) {
  await teacherDeleteCourseFile(fileId)
    .then(async () => {
      await MessagePlugin.success('删除成功！')
      await flushCourseFiles()
    })
    .catch(async (err) => {
      await MessagePlugin.error('删除失败！')
      await console.log(err)
    })
}
onMounted(() => {
  teacherGetCourseFiles(chooseCourse.value.id)
    .then((resp) => {
      // @ts-ignore
      courseFileList.value = resp.data.data
    })
    // eslint-disable-next-line node/handle-callback-err,n/handle-callback-err
    .catch((err) => {
      MessagePlugin.error('获取课程文档库错误！')
    })
})
</script>
<style scoped lang="less">
@import '../../style/variables';
#teacher-folder-manage {
  .folder-top-area {
    width: 100%;
    height: 50px;
    margin: 30px;
  }
  .list-card-items {
    border-radius: @border-radius;
    overflow: hidden;
    color: @text-color-secondary;
    .t-card__title {
      text-align: center;
      text-underline-color: #2c3e50;
    }
  }
}
</style>
