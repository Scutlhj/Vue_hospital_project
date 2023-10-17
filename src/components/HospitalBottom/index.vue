<template>
  <div class="container">
    <div class="bottom">
      <div class="left">
        <span>京ICP备</span>
        <span>13018369号</span>
        <span>电话挂号010-56253825</span>
      </div>
      <div class="right">
        <a href="mailto:cslhj@mail.scut.edu.cn">联系我们</a>
        <a href="#">合作伙伴</a>
        <a href="#">用户协议</a>
        <a href="#">隐私协议</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'HospitalBottom',
})
</script>

<style lang="scss" scoped>
.container {
  height: 50px;
  width: 100%;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;

  .bottom {
    height: 100%;
    width: 1200px;
    color: grey;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      span {
        margin: 0 3px;
      }
    }

    .right {
      a {
        text-decoration: none;
        color: grey;
        margin: 0 3px;
      }
    }
  }
}
</style>
    