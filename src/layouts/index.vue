<template>
  <div id="index-main">
    <t-layout style="height: 100vh">
      <t-header>
        <index-header></index-header>
      </t-header>
      <t-layout>
        <t-aside>
          <index-aside></index-aside>
        </t-aside>
        <t-content></t-content>
      </t-layout>
    </t-layout>
  </div>
</template>

<script lang="ts">
import IndexHeader from '@/layouts/components/header.vue'
import IndexAside from '@/layouts/components/aside.vue'
export default {
  name: 'IndexMain',
  components: { IndexAside, IndexHeader },
  data() {
    return {}
  },
}
</script>

<style scoped lang="less">
#index-main {
  height: 100%;
  width: 100%;
}
</style>
