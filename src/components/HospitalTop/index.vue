<template>
  <div class="container">
    <div class="top">
      <div class="top_left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="hospital_logo">
        <h1 class="title">预约挂号统一平台</h1>
      </div>
      <div class="top_right">
        <span class="help">帮助中心</span>
        <span class="login" @click="showDialog" v-if="!userStore.hasLogin">登录/注册</span>
        <el-dropdown v-else>
          <span class="el-dropdown-link">{{ userStore.userData.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goRouter('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goRouter('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goRouter('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import useUserStore from '@/stores/modules/user';
defineOptions({
  name: 'HospitalTop',
})
let userStore = useUserStore()
const goHome = () => {
  router.push('/home')
}
const showDialog = () => {
  userStore.setShowLoginDialog(true)
}
const logout = ()=>{
  userStore.logout()
  router.push('/home')
}
const goRouter = (path:string)=>{
  router.push(path)
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  user-select: none;

  .top {
    width: 1200px;
    height: 100%;
    // background-color: aqua;
    display: flex;
    justify-content: space-between;

    .top_left {
      display: flex;
      cursor: pointer;
      align-items: center;
      padding: 0 10px;

      img {
        height: 50px;
        width: 50px;
      }

      h1 {
        font-size: 22px;
        color: skyblue;
      }

      .title {
        margin-left: 10px;
      }
    }

    .top_right {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: gray;

      .help {
        margin-right: 10px;
      }

      .login {
        cursor: pointer;
      }
      .el-dropdown-link{
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover{
          color:var(--el-color-primary);
        }
      }
    }
  }
}</style>