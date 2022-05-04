<template>
  <div id="ChooseRuleArea">
    <t-drawer
      v-model:visible="drawerVisibleRight"
      :cancel-btn="{
        content: '取消',
        disable: rightDrawerBtnCancelAble,
      }"
      header="创建课程"
      reset-type="initial"
      size="medium"
      placement="right"
      :size-draggable="true"
      :on-confirm="onInsertCourse"
      :confirm-btn="{
        content: '提交',
        loading: rightDrawerBtnLoading,
        disabled: teacherList === undefined,
      }"
    >
      <div class="drawer-new-role-inputs">
        <div>
          <div v-if="teacherList === undefined" style="margin-top: 30px">
            <t-tag style="margin-bottom: 30px">因为您还未创建过教师角色，请填写以下内容创建教师角色</t-tag>
            <t-form ref="form" :data="newTeacherForm" :colon="true" @reset="onReset">
              <t-form-item label="教师名" name="name">
                <t-input v-model="newTeacherForm.name" placeholder="请输入教师姓名"></t-input>
              </t-form-item>
              <t-form-item label="邮箱" name="email">
                <t-input v-model="newTeacherForm.email" placeholder="请输入邮箱"> </t-input>
              </t-form-item>
              <t-form-item label="QQ" name="qq">
                <t-input v-model="newTeacherForm.qq" placeholder="请输入QQ号"> </t-input>
              </t-form-item>
              <t-form-item label="电话" name="phone">
                <t-input v-model="newTeacherForm.phone" placeholder="请输入电话"> </t-input>
              </t-form-item>
              <t-form-item label="个人介绍" name="teacher_introduction">
                <t-textarea v-model="newTeacherForm.teacher_introduction" placeholder="请输入个人介绍"> </t-textarea>
              </t-form-item>
              <t-button style="width: 200px" :loading="newTeacherLoading" @click="onNewTeacher">下一步</t-button>
            </t-form>
          </div>
          <div v-else>
            <t-form :data="newCourseForm" :colon="true" @reset="onReset">
              <t-form-item label="课程名" name="course_name">
                <t-input v-model="newCourseForm.course_name" placeholder="请输入课程名"></t-input>
              </t-form-item>
              <t-form-item label="课程简介" name="course_introduction">
                <t-textarea v-model="newCourseForm.course_introduction" placeholder="请输入课程简介"> </t-textarea>
              </t-form-item>
              <t-form-item label="教师">
                <t-select v-model="teacherIdSelect">
                  <t-option v-for="item in teacherList" :key="item.id" :value="item.id" :label="item.name">{{
                    item.name
                  }}</t-option>
                </t-select>
              </t-form-item>
            </t-form>
          </div>
        </div>
      </div>
    </t-drawer>
    <t-drawer
      v-model:visible="drawerVisibleLeft"
      :cancel-btn="{
        content: '取消',
        disable: leftDrawerBtnCancelAble,
      }"
      header="加入课程"
      size="medium"
      placement="left"
      :size-draggable="true"
      :confirm-btn="{
        content: '提交',
        loading: leftDrawerBtnLoading,
        disabled: studentList === undefined,
      }"
      :on-confirm="onJoinCourse"
    >
      <div class="drawer-new-role-inputs">
        <div v-if="studentList === undefined" style="margin-top: 30px">
          <t-tag style="margin-bottom: 30px">因为您还未创建过学生角色，请填写以下内容创建学生角色</t-tag>
          <t-form ref="form" :data="newStudentForm" :colon="true" @reset="onReset">
            <t-form-item label="学生名" name="name">
              <t-input v-model="newStudentForm.name" placeholder="请输入学生姓名"></t-input>
            </t-form-item>
            <t-form-item label="学号" name="student_number">
              <t-input v-model="newStudentForm.student_number" placeholder="请输入学号"> </t-input>
            </t-form-item>
            <t-button style="width: 200px" :loading="newStudentLoading" @click="onNewStudent()">下一步</t-button>
          </t-form>
        </div>
        <div v-else>
          <span style="text-align: left; float: left; margin-top: 10px; margin-bottom: 10px">课程码</span>
          <t-input v-model="joinClassCode" placeholder="请输入课程码"></t-input>
          <span style="text-align: left; float: left; margin-top: 10px; margin-bottom: 10px">选择学生角色</span>
          <t-select v-model="studentIdSelect">
            <t-option v-for="item in studentList" :key="item.id" :value="item.id" :label="item.name">{{
              item.name
            }}</t-option>
          </t-select>
        </div>
      </div>
    </t-drawer>
    <t-layout style="height: 100%; width: 100%">
      <t-content class="role-course-main-area">
        <p style="font-size: 25px; text-align: left; padding-left: 60px; margin-top: 40px">
          <span style="color: #0052d9">课程列表</span>
        </p>
        <div class="choose-course-content">
          <div class="join-in-course-content">
            <div>
              <p style="font-size: 25px; text-align: left; margin: 0 0 0 30px">我加入的课程</p>
            </div>
            <div v-for="stu in inCourseList" :key="stu.id">
              <t-button
                theme="default"
                variant="outline"
                style="width: 80%; margin-top: 30px"
                @click="roleLogin(stu)"
                >{{ stu.course_name }}</t-button
              >
            </div>
            <div>
              <t-button style="width: 80%; margin-top: 30px" @click="drawerVisibleLeft = true">
                <t-icon name="arrow-right"></t-icon>
                加入课程</t-button
              >
            </div>
          </div>
          <div class="create-course-content">
            <div>
              <p style="font-size: 25px; text-align: left; margin: 0 0 0 30px">我管理的课程</p>
            </div>
            <div v-for="teacher in createCourseList" :key="teacher.id">
              <t-button
                theme="default"
                variant="outline"
                style="width: 80%; margin-top: 30px"
                @click="roleLogin(teacher)"
                >{{ teacher.course_name }}</t-button
              >
            </div>
            <div>
              <t-button style="width: 80%; margin-top: 30px" @click="drawerVisibleRight = true">
                <t-icon name="add" />
                新建课程</t-button
              >
            </div>
          </div>
        </div>
      </t-content>
    </t-layout>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChooseRuleArea',
  methods: {
    newRole() {
      this.drawer_visible = false
    },
    drawerClose() {},
    onReset() {},
    onSubmit() {},
  },
}
</script>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoleStore, useCourseStore, useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
import { MessagePlugin } from 'tdesign-vue-next'
import { newStudent, newTeacher } from '@/apis/role'
import { createCourse, joinClass } from '@/apis/course'
import { useRouter } from 'vue-router'
const roleStore = useRoleStore()
const courseStore = useCourseStore()
const { studentList, teacherList } = storeToRefs(roleStore)
// eslint-disable-next-line no-unused-vars
const { createCourseList, inCourseList, tutorCourseList, manageClassList } = storeToRefs(courseStore)
const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
const NEW_TEACHER_INIT = {
  name: '',
  email: '',
  qq: '',
  phone: '',
  teacher_introduction: '',
  id: '',
}
const NEW_STUDENT_INIT = {
  name: '',
  student_number: '',
}
const InitNewCourseForm = {
  teacher_id: '',
  course_name: '',
  course_introduction: '',
}
const rightDrawerBtnLoading = ref(false)
const leftDrawerBtnCancelAble = ref(false)
const rightDrawerBtnCancelAble = ref(false)
const leftDrawerBtnLoading = ref(false)
const drawerVisibleLeft = ref(false)
const drawerVisibleRight = ref(false)
const newCourseForm = ref(InitNewCourseForm)
const newTeacherForm = ref(NEW_TEACHER_INIT)
const newStudentForm = ref(NEW_STUDENT_INIT)
const teacherIdSelect = ref('')
const studentIdSelect = ref('')
const newStudentLoading = ref(false)
const newTeacherLoading = ref(false)
const router = useRouter()
const joinClassCode = ref('')
watch(
  () => studentList.value,
  (newVal) => {
    console.log('watch studentList')
    if (newVal === undefined) {
      MessagePlugin.info('还没有默认教师角色！')
    }
  },
)
watch(
  () => studentList.value,
  (newVal) => {
    console.log('watch studentList')
    if (newVal === undefined) {
      MessagePlugin.info('还没有默认学生角色！')
    }
  },
)
const onInsertCourse = async function () {
  rightDrawerBtnLoading.value = true
  rightDrawerBtnCancelAble.value = true
  console.log('1')
  if (teacherList === undefined) {
    await onNewTeacher()
  }
  await createCourse(teacherIdSelect.value, newCourseForm.value.course_name, newCourseForm.value.course_introduction)
    .then(async (resp) => {
      await MessagePlugin.success('创建课程成功')
      courseStore.flashCourse()
    })
    .catch(async (err) => {
      await MessagePlugin.error('创建课程失败!')
      console.log(err)
    })
  rightDrawerBtnLoading.value = false
  rightDrawerBtnCancelAble.value = false
}
const onNewTeacher = async function () {
  rightDrawerBtnCancelAble.value = true
  newTeacherLoading.value = true
  await newTeacher(
    newTeacherForm.value.name,
    newTeacherForm.value.email,
    newTeacherForm.value.phone,
    newTeacherForm.value.qq,
    newTeacherForm.value.teacher_introduction,
  )
    .then(async (resp) => {
      await roleStore.flashRoles()
      await MessagePlugin.success('添加教师角色成功！')
    })
    .catch(async (err) => {
      await MessagePlugin.error(err)
    })
  newTeacherLoading.value = false
}
const onJoinCourse = async function () {
  leftDrawerBtnLoading.value = true
  leftDrawerBtnCancelAble.value = true
  await joinClass(joinClassCode.value, studentIdSelect)
    .then(async () => {
      await MessagePlugin.success('加入班级成功')
    })
    .catch(async () => {
      await MessagePlugin.error('加入班级失败！')
    })
  leftDrawerBtnLoading.value = false
  leftDrawerBtnCancelAble.value = false
  drawerVisibleRight.value = false
}
const onNewStudent = async function () {
  newStudentLoading.value = true
  await newStudent(newStudentForm.value.name, newStudentForm.value.student_number)
    .then(async (resp) => {
      await roleStore.flashRoles()
      await MessagePlugin.success('添加学生角色成功!')
    })
    .catch(async (err) => {
      console.log(err)
      await MessagePlugin.error('添加学生角色出错!')
    })
  newStudentLoading.value = false
}
const roleLogin = async function (course) {
  // eslint-disable-next-line no-prototype-builtins
  if (course.hasOwnProperty('teacher_id')) {
    console.log('教师登录')
    const teacherId = course.teacher_id
    chooseStore.setCourse(course)
    chooseStore.setChooseRole(teacherId, 'teacher')
    console.log(course.id)
    await chooseStore.flushChooseClass()
    // eslint-disable-next-line no-prototype-builtins
  } else if (course.hasOwnProperty('student_id')) {
    console.log('学生登录')
    chooseStore.setCourse(course)
    chooseStore.setChooseRole(course.student_id, 'student')
  }
  await router.push({ name: 'base' })
}
</script>

<style scoped lang="less">
#ChooseRuleArea {
  height: 100%;
  width: 100%;

  .role-course-main-area {
    background-image: linear-gradient(
        112.5deg,
        rgba(232, 232, 232, 0.03) 0%,
        rgba(232, 232, 232, 0.03) 2%,
        rgba(231, 231, 231, 0.03) 2%,
        rgba(231, 231, 231, 0.03) 4%,
        rgba(231, 231, 231, 0.03) 4%,
        rgba(231, 231, 231, 0.03) 11%,
        rgba(2, 2, 2, 0.03) 11%,
        rgba(2, 2, 2, 0.03) 67%,
        rgba(231, 231, 231, 0.03) 67%,
        rgba(231, 231, 231, 0.03) 90%,
        rgba(111, 111, 111, 0.03) 90%,
        rgba(111, 111, 111, 0.03) 100%
      ),
      linear-gradient(
        157.5deg,
        rgba(210, 210, 210, 0.03) 0%,
        rgba(210, 210, 210, 0.03) 17%,
        rgba(254, 254, 254, 0.03) 17%,
        rgba(254, 254, 254, 0.03) 18%,
        rgba(96, 96, 96, 0.03) 18%,
        rgba(96, 96, 96, 0.03) 44%,
        rgba(159, 159, 159, 0.03) 44%,
        rgba(159, 159, 159, 0.03) 70%,
        rgba(24, 24, 24, 0.03) 70%,
        rgba(24, 24, 24, 0.03) 82%,
        rgba(16, 16, 16, 0.03) 82%,
        rgba(16, 16, 16, 0.03) 100%
      ),
      linear-gradient(
        22.5deg,
        rgba(47, 47, 47, 0.03) 0%,
        rgba(47, 47, 47, 0.03) 32%,
        rgba(124, 124, 124, 0.03) 32%,
        rgba(124, 124, 124, 0.03) 40%,
        rgba(200, 200, 200, 0.03) 40%,
        rgba(200, 200, 200, 0.03) 42%,
        rgba(16, 16, 16, 0.03) 42%,
        rgba(16, 16, 16, 0.03) 64%,
        rgba(243, 243, 243, 0.03) 64%,
        rgba(243, 243, 243, 0.03) 94%,
        rgba(93, 93, 93, 0.03) 94%,
        rgba(93, 93, 93, 0.03) 100%
      ),
      linear-gradient(90deg, #ffffff, #ffffff);
  }

  .choose-course-content {
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 50px;

    .join-in-course-content {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 30px;
    }
    .create-course-content {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 30px;
    }
  }
}
</style>
