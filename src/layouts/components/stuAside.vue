<template>
  <div id="stu-aside">
    <t-menu
      id="teacher-aside"
      theme="light"
      value="teacherBasePage"
      style="margin-right: 50px"
      height="550px"
      :collapsed="collapsed"
      @change="menuChange"
    >
      <t-menu-item value="stuDashboard">
        <template #icon>
          <t-icon name="desktop" />
        </template>
        工作台
      </t-menu-item>
      <t-menu-item value="stuHomework">
        <template #icon>
          <t-icon name="books" />
        </template>
        作业
      </t-menu-item>
      <t-menu-item value="stuNotice">
        <template #icon>
          <t-icon name="notification" />
        </template>
        通知管理
      </t-menu-item>
      <t-menu-item @click="router.push({ name: 'chooseRole', params: { showHeader: 'login' } })">
        <template #icon>
          <t-icon name="logout"></t-icon>
        </template>
        返回课程列表
      </t-menu-item>
      <template #operations>
        <t-icon class="t-menu__operations-icon" :name="iconName" @click="changeCollapsed" />
      </template>
    </t-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StuAside',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { computed } from '_vue@3.2.33@vue'
import { useStyleStore } from '@/store'
import router from '@/router'

const collapsed = ref(false)
const styleStore = useStyleStore()
const iconName = computed(() => (collapsed.value ? 'chevron-right' : 'chevron-left'))

const changeCollapsed = () => {
  collapsed.value = !collapsed.value
  styleStore.setAsideWidth(collapsed.value === true ? '64px' : '232px')
}
const menuChange = (menuVal) => {
  console.log(menuVal)
  router.push({ name: menuVal })
}
</script>

<style scoped lang="less"></style>
