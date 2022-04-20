<template>
  <div id="index-aside">
    <t-menu
      theme="light"
      value="dashboard"
      style="margin-right: 50px"
      height="550px"
    >
      <t-menu-item value="dashboard">
        <template #icon>
          <t-icon name="desktop" />
        </template>
        工作台
      </t-menu-item>
      <t-menu-item value="homework">
        <template #icon>
          <t-icon name="books" />
        </template>
        作业
      </t-menu-item>
    </t-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IndexAside',
}
</script>

<style scoped lang="less">
#index-aside {
}
</style>
