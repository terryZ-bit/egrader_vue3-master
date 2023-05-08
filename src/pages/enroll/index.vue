<template>
  <div id="EnrollPage">
    <enroll-area v-if="$props.showArea === 'enroll'"></enroll-area>
    <change-password-area v-else></change-password-area>
  </div>
</template>

<script lang="ts">
import EnrollArea from '@/pages/enroll/components/enrollArea.vue'
import ChangePasswordArea from '@/pages/enroll/components/changePasswordArea.vue'
export default {
  name: 'EnrollPage',
  components: { ChangePasswordArea, EnrollArea },
  props: {
    showArea: {
      type: String,
      default: 'enroll',
    },
  },
}
</script>
<script lang="ts" setup></script>
<style scoped lang="less">
#EnrollPage {
  height: 100%;
  width: 100%;

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
</style>
