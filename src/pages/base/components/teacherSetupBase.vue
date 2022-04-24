<template>
  <div id="teacher-setup-base" style="margin: 30px 30px">
    <t-card title="新建班级" subtitle="因为您选择的课程还没有创建班级，请先创建班级" header-bordered bordered>
      <div class="card-form-loop">
        <t-form v-for="index in newClassList" :key="index.id" @submit="newClassSubmit">
          <t-form-item label="班级名称">
            <t-input v-model="index.class_name"></t-input>
          </t-form-item>
          <t-form-item label="班级简介">
            <t-textarea v-model="index.class_introduction"></t-textarea>
          </t-form-item>
        </t-form>
        <t-button style="width: 200px" @click="newClassSubmit">提交</t-button>
        <div class="card-form-button-area" style="display: flex; justify-content: space-around">
          <t-button shape="circle" theme="primary" @click="pushNewClassList">
            <template #icon>
              <t-icon name="add" />
            </template>
          </t-button>
          <t-button shape="circle" theme="primary" variant="outline" @click="popNewClassList">
            <template #icon>
              <t-icon name="minus-circle" />
            </template>
          </t-button>
        </div>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeacherSetupBase',
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { useChooseStore, useCourseStore } from '@/store'
import { storeToRefs } from 'pinia'
import { createClass } from '@/apis/course'
import { MessagePlugin } from 'tdesign-vue-next'

const chooseStore = useChooseStore()
const courseStore = useCourseStore()
const { chooseCourse } = storeToRefs(chooseStore)
const INIT_CLASS_FORM = {
  course_id: '',
  class_name: '',
  class_introduction: '',
}
const newClassList = ref([])
newClassList.value.push(INIT_CLASS_FORM)
const newClassSubmit = async function () {
  for (const item of newClassList.value) {
    item.course_id = chooseCourse.value.id
    await createClass(item.course_id, item.class_name, item.class_introduction)
      .then((resp) => {
        MessagePlugin.success('新建班级成功！')
        console.log(resp)
      })
      .catch((error) => {
        MessagePlugin.error('创建班级失败！')
        console.log(error)
      })
  }
  await courseStore.flashRoles()
  await chooseStore.flushChooseClass()
}
const pushNewClassList = function () {
  newClassList.value.push({ course_id: '', class_name: '', class_introduction: '' })
}
const popNewClassList = function () {
  newClassList.value.pop()
}
</script>

<style scoped></style>
