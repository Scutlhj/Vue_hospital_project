<template>
  <div class="feedback">
    <div class="title">意见反馈</div>
    <div class="content">
      <el-empty description="暂无信息" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-top: 50px;
    font-size: 25px;
    color: black;
    font-weight: 900;
  }
}
</style>

<script lang="ts" setup>
defineOptions({
  name: 'FeedbackView',
})
</script>