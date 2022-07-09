<!--
    @author: shen-la
 -->

<template>
  <div id="teacher-folder-manage">
    <div class="folder-top-card">
      <t-card title="课程文档库" style="margin: 30px 30px" header-bordered bordered> </t-card>
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
              </t-row>
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
  name: 'StudentFolderManage',
}
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
import { studentGetCourseFiles, courseFileDownLoad } from '@/apis/oss/courseFile'
import { MessagePlugin } from 'tdesign-vue-next'

const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseRole, chooseClass } = storeToRefs(chooseStore)

const courseFileList = ref([])

onMounted(() => {
  studentGetCourseFiles(chooseClass.value.class_id)
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
