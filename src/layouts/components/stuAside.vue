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
      <template #logo>
        <span v-if="showLogo" class="header-logo-container">
          <img
            src="../../assets/logo/logo_big.png"
            alt="404"
            style="height: 22px; width: 125px; margin-left: 20px; margin-top: 20px; margin-bottom: 9.3px"
          />
        </span>
        <span v-else>
          <img
            alt="404"
            src="../../assets/logo/logo_small.png"
            style="height: 20px; width: 20px; margin-left: 20px; margin-top: 10px"
          />
        </span>
      </template>
      <t-menu-item value="stuBasePage">
        <template #icon>
          <t-icon name="desktop" />
        </template>
        概览台
      </t-menu-item>
      <t-menu-item value="stuHomework">
        <template #icon>
          <t-icon name="books" />
        </template>
        作业
      </t-menu-item>
      <t-menu-item value="studentFolderManage">
        <template #icon>
          <t-icon name="folder-open" />
        </template>
        课程文档库
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
import { ref, computed } from 'vue'
import { useStyleStore } from '@/store'
import router from '@/router'

const collapsed = ref(false)
const styleStore = useStyleStore()
const showLogo = ref(true)
const iconName = computed(() => (collapsed.value ? 'chevron-right' : 'chevron-left'))

const changeCollapsed = () => {
  collapsed.value = !collapsed.value
  showLogo.value = !showLogo.value
  styleStore.setAsideWidth(collapsed.value === true ? '64px' : '232px')
}
const menuChange = (menuVal) => {
  console.log(menuVal)
  router.push({ name: menuVal })
}
</script>

<style scoped lang="less"></style>
