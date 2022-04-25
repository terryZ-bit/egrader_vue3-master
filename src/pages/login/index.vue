<template>
  <div id="login-page">
    <t-layout style="height: 100%">
      <t-header>
        <HomePageHeader v-if="props.showHeader === 'login'"></HomePageHeader>
        <PublicHeader v-else></PublicHeader>
      </t-header>
      <t-content>
        <ChooseRuleArea v-if="props.showHeader === 'login'"></ChooseRuleArea>
        <LoginArea v-else></LoginArea>
      </t-content>
      <t-footer>
        <PublicFooter></PublicFooter>
      </t-footer>
    </t-layout>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginPage',
  data() {
    return {}
  },
}
</script>
<script setup lang="ts">
import PublicHeader from '@/components/header/PublicHeader.vue'
import PublicFooter from '@/components/footer/PublicFooter.vue'
import LoginArea from '@/pages/login/components/loginArea.vue'
import HomePageHeader from '@/components/header/HomePageHeader.vue'
import ChooseRuleArea from '@/pages/login/components/chooseRuleArea.vue'
import { watch } from 'vue'
import { useRoleStore, useCourseStore } from '@/store'
interface Props {
  showHeader?: string
}
const props = withDefaults(defineProps<Props>(), {
  showHeader: 'NotLogin',
})
const roleStore = useRoleStore()
const courseStore = useCourseStore()
watch(
  () => props.showHeader,
  async (newVal) => {
    if (newVal === 'login') {
      await roleStore.flashRoles()
      await courseStore.flashCourse()
    }
  },
)
</script>

<style scoped lang="less">
#login-page {
  height: 100%;
  width: 100%;

  .t-layout {
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
    background-repeat: no-repeat;
  }
}
</style>
