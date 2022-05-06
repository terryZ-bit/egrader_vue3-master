<template>
  <div id="index-main">
    <t-layout style="height: 100vh">
      <t-header>
        <index-header></index-header>
      </t-header>
      <t-layout>
        <t-aside :width="asideWidthThisPage">
          <stu-aside v-if="chooseRole.roleType === 'stu'"></stu-aside>
          <index-aside v-else></index-aside>
        </t-aside>
        <t-content>
          <router-view v-slot="{ Component }">
            <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <component :is="Component" v-if="showNav" style="animation-duration: 200ms" />
            </transition>
          </router-view>
        </t-content>
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
import { getChooseStore, useStyleStore } from '@/store'
import { ref, watch } from 'vue'
import router from '@/router'

const chooseStore = getChooseStore()
const styleStore = useStyleStore()
// eslint-disable-next-line no-unused-vars
const { chooseCourse, chooseClass, chooseRole } = storeToRefs(chooseStore)
const { asideWidth } = storeToRefs(styleStore)
const asideWidthThisPage = ref('232px')
const showNav = ref(true)
watch(
  () => asideWidth.value,
  (newVal) => {
    asideWidthThisPage.value = newVal
  },
)
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    showNav.value = false
    setTimeout(() => {
      showNav.value = true
    }, 200)
  },
  { immediate: true },
)
</script>

<style scoped lang="less">
@import 'animate.css';
#index-main {
  height: 100%;
  width: 100%;
  transition {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .fade-box-leave-to {
    animation: bounceOutRight 0.8s;
  }
}
</style>
