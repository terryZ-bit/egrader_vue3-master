<template>
  <div id="index-header">
    <t-head-menu expand-type="popup">
      <template #logo>
        <span v-if="showLogo" class="header-logo-container">
          <img
            src="../../assets/logo/img.png"
            alt="404"
            style="height: 40px; width: 120px; margin-left: 30px; margin-top: 20px"
          />
        </span>
      </template>
      <template #operations>
        <div class="operations-container">
          <!-- 搜索框 -->
          <search></search>

          <!-- 全局通知 -->
          <notice></notice>
          <t-dropdown :min-column-width="135" trigger="click">
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item class="operations-dropdown-container-item" @click="$router.push('/user/base')">
                  <t-icon name="user-circle"></t-icon>个人中心
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleLogout">
                  <t-icon name="poweroff"></t-icon>退出登录
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
            <t-button class="header-user-btn" theme="default" variant="text">
              <template #icon>
                <t-icon class="header-user-avatar" name="user-circle" />
              </template>
              <div class="header-user-account">
                {{ userName }}
                <t-icon name="chevron-down" />
              </div>
            </t-button>
          </t-dropdown>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<script lang="ts">
import Search from '@/layouts/components/Search.vue'
import Notice from '@/layouts/components/Notice.vue'

export default {
  name: 'IndexHeader',
  components: { Search, Notice },
  data() {
    return {
      showLogo: true,
    }
  },
  methods: {
    handleLogout() {
      this.userStore.logout()
      this.$router.push('/login')
    },
  },
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const userName = ref('')
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
watch(
  userInfo.value,
  (newVal, oldVal) => {
    userName.value = newVal.email
  },
  { immediate: true },
)
</script>

<style scoped lang="less">
#index-header {
  .operations-container {
    display: flex;
  }
}
</style>
