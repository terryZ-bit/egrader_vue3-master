<template>
  <div id="index-main">
    <t-layout style="height: 100vh">
      <t-header>
        <index-header></index-header>
      </t-header>
      <t-layout>
        <t-aside>
          <index-aside></index-aside>
          <stu-aside v-if="chooseRole.roleType === 'teacher'"></stu-aside>
        </t-aside>
        <t-content></t-content>
      </t-layout>
    </t-layout>
  </div>
</template>

<script lang="ts">
import IndexHeader from '@/layouts/components/header.vue'
import IndexAside from '@/layouts/components/aside.vue'
import StuAside from '@/layouts/components/stuAside.vue'
export default {
  name: 'IndexMain',
  components: { StuAside, IndexAside, IndexHeader },
  data() {
    return {}
  },
}
</script>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChooseStore } from '@/store'

const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
</script>

<style scoped lang="less">
#index-main {
  height: 100%;
  width: 100%;
}
</style>
