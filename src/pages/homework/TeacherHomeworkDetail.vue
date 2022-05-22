<template>
  <div id="teacher-homework-detail">
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
        <p style="margin-right: auto; padding-left: 20px; margin-top: 20px; font-size: x-large">作业详情</p>
        <div class="teacher-homework-detail-area">
          <t-divider></t-divider>
          <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">作业主体</p>
          <t-skeleton animation="flashed" :loading="skeletonLoading">
            <t-row>
              <t-col span="6">
                <div class="teacher-homework-detail-span-left">
                  <span>作业名称：</span>
                  <i>{{ teacherHomeworkDetail.name }}</i>
                </div>
              </t-col>
              <t-col span="6">
                <div class="teacher-homework-detail-span-left">
                  <span>分数上限：</span>
                  <i>{{ teacherHomeworkDetail.score_max }}</i>
                </div>
              </t-col>
            </t-row>
            <t-row>
              <t-col span="6">
                <div class="teacher-homework-detail-span-left">
                  <span>创建时间：</span>
                  <i>{{ XEUtils.toDateString(teacherHomeworkDetail.create_time, 'yyyy-MM-dd HH:ss') }}</i>
                </div>
              </t-col>
              <t-col span="6">
                <div class="teacher-homework-detail-span-left">
                  <span>截止时间：</span>
                  <i>{{ XEUtils.toDateString(teacherHomeworkDetail.end_time, 'yyyy-MM-dd HH:ss') }}</i>
                </div>
              </t-col>
            </t-row>
            <t-row>
              <t-col span="6">
                <div class="teacher-homework-detail-span-left">
                  <span>是否进行互评：</span>
                  <i>{{ teacherHomeworkDetail.rate_each_flag === 1 ? '是' : '否' }}</i>
                </div>
              </t-col>
              <t-col span="6">
                <div class="teacher-homework-detail-span-left">
                  <span>有无评分细则：</span>
                  <i>{{ teacherHomeworkDetail.score_detail_flag === 1 ? '有' : '无' }}</i>
                </div>
              </t-col>
            </t-row>
            <t-row>
              <t-col span="12">
                <div class="teacher-homework-detail-span-left">
                  <span>作业主要内容：</span>
                  <i>{{ teacherHomeworkDetail.homework_introduction }}</i>
                </div>
              </t-col>
            </t-row>
          </t-skeleton>
        </div>
        <t-divider dashed />
        <div style="display: flex; flex-direction: column">
          <div>
            <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">评分细则</p>
            <t-button theme="primary" variant="dashed" style="float: right">
              <template #icon>
                <t-icon name="add" />
              </template>
              添加细则
            </t-button>
          </div>
          <vxe-table
            style="margin-left: 20px; margin-top: 20px"
            :data="teacherHomeworkDetail.score_detail"
            :loading="skeletonLoading"
          >
            <vxe-column type="seq" width="60" field="question_id"></vxe-column>
            <vxe-column field="question_name" title="评分点详情"></vxe-column>
            <vxe-column field="score_max" title="分数上限"></vxe-column>
            <vxe-column title="操作" width="110px">
              <template #default="{ row }">
                <t-popup content="编辑">
                  <t-button shape="circle" variant="text" @click="editHomework(row)">
                    <t-icon name="edit" style="color: #002b9f"></t-icon>
                  </t-button>
                </t-popup>
                <t-popup content="删除">
                  <t-button shape="circle" variant="text" @click="deleteHomework(row)">
                    <t-icon name="delete" style="color: red"></t-icon>
                  </t-button>
                </t-popup>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
        <t-divider dashed />
        <div style="display: flex; flex-direction: column">
          <div>
            <p style="float: left; margin-right: auto; padding-left: 20px; font-size: medium">作业附件</p>
            <t-button theme="primary" variant="dashed" style="float: right">
              <template #icon>
                <t-icon name="add" />
              </template>
              添加附件
            </t-button>
          </div>
          <vxe-table
            style="margin-left: 20px; margin-top: 20px"
            :data="teacherHomeworkDetail.oss_detail"
            :loading="skeletonLoading"
          >
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="oss_url" title="文件名称" :formatter="formatFileName"></vxe-column>
            <vxe-column title="操作" width="110px">
              <template #default="{ row }">
                <t-popup content="下载">
                  <t-button shape="circle" variant="text" @click="downloadTHomeworkFile(row)">
                    <t-icon name="download" style="color: #002b9f"></t-icon>
                  </t-button>
                </t-popup>
                <t-popup content="删除">
                  <t-button shape="circle" variant="text" @click="deleteHomework(row)">
                    <t-icon name="delete" style="color: red"></t-icon>
                  </t-button>
                </t-popup>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherHomeworkDetail',
}
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getTeacherHomeworkDetail, getTeacherHomeworkFile } from '@/apis/homework/teacherHomework'
import XEUtils from '_xe-utils@3.5.4@xe-utils'
import { VxeColumnPropTypes } from '_vxe-table@4.2.3@vxe-table'

const teacherHomeworkDetail = ref({})
const skeletonLoading = ref(false)
interface Props {
  teacherHomeworkId?: string
}

const props = withDefaults(defineProps<Props>(), {
  teacherHomeworkId: '',
})

const formatFileName: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = cellValue.lastIndexOf('/')
  return cellValue.substring(item + 1, cellValue.length)
}

onMounted(() => {
  skeletonLoading.value = true
  getTeacherHomeworkDetail(props.teacherHomeworkId)
    .then((resp) => {
      console.log(resp)
      // @ts-ignore
      teacherHomeworkDetail.value = resp.data.data
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      skeletonLoading.value = false
    })
})
const downloadTHomeworkFile = function (row) {
  getTeacherHomeworkFile(row.id)
}
</script>

<style scoped lang="less">
@import '../../style/variables';
#teacher-homework-detail {
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
