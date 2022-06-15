<template>
  <div id="home-page-header">
    <div class="logo-area" style="text-align: center; display: flex; align-items: center">
      <img src="../../assets/logo/img.png" alt="404" style="height: 40px; width: 120px; margin-left: 30px" />
    </div>
    <div class="navigation-area">
      <t-button theme="default" variant="text">课程列表</t-button>
    </div>
    <div class="sign-up-area" style="margin-left: 20px">
      <t-button theme="default" size="medium" variant="text">
        {{ userName }}
      </t-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePageHeader',
}
</script>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const userName = ref('')
const store = useUserStore()
const { userInfo } = storeToRefs(store)
watch(
  userInfo.value,
  (newValue, oldValue) => {
    userName.value = newValue.email
  },
  { immediate: true },
)
</script>

<style lang="less" scoped>
#home-page-header {
  display: flex;
  height: 100%;
  width: 100%;

  .logo-area {
    height: 100%;
    width: 20%;
  }

  .navigation-area {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .sign-up-area {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
