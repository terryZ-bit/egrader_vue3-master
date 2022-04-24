<template>
  <div id="base-page">
    <teacher-setup-base v-if="chooseClass.length === 0"></teacher-setup-base>
  </div>
</template>

<script lang="ts">
import TeacherSetupBase from '@/pages/base/components/teacherSetupBase.vue'
export default {
  name: 'BasePage',
  components: { TeacherSetupBase },
}
</script>
<script lang="ts" setup>
import { useChooseStore } from '@/store'
import { storeToRefs } from 'pinia'
const chooseStore = useChooseStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
</script>

<style scoped></style>
