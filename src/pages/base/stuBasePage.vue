<!--
    @author: Terry_z
    @date: 2022/7/21 - 8:58
    @fileName: stuBasePage
 -->
<template>
  <div id="stu-base-page">
    <t-card title="概览台" style="margin: 30px" bordered header-bordered :shadow="true">
      <div class="stu-base-page-main">
        <t-calendar>
          <template #head>作业日程</template>
        </t-calendar>
        <div class="stu-base-page-right">
          <div>
            <p style="font-weight: bolder; color: #002b9e; float: left">TODO:</p>
          </div>
          <div>
            <t-list :split="true">
              <t-list-item>
                <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
              </t-list-item>
              <t-list-item>
                <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
              </t-list-item>
              <t-list-item>
                <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
              </t-list-item>
            </t-list>
          </div>
        </div>
      </div>
    </t-card>
  </div>
</template>
<script lang="ts" setup></script>

<style scoped lang="less">
#stu-base-page {
  height: 100%;
  width: 100%;
  .stu-base-page-main {
    display: flex;
    flex-direction: row;
    .stu-base-page-right {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      width: 300px;
    }
  }
}
</style>
