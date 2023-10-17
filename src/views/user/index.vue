<script lang="ts" setup>
import router from '@/router';
import { useRoute } from 'vue-router';
defineOptions({
  name: 'UserCenter',
})
let $route = useRoute()
const goRouter = (url: string) => {
  router.push({
    path: url,
    // query:{
    //   hoscode:$route.query.hoscode || hospitalStore.hospitalDetail.hospital.hoscode
    // }
  })
}
// onBeforeMount(() => {
//   // 获取医院详情
//   hospitalStore.getHospitalDetail($route.query.hoscode as string)
//   // 获取医院部门详情
//   hospitalStore.getHospitalDepartments($route.query.hoscode as string)
// })
</script>

<template>
  <div class="user">
    <el-row>
      <el-col :span="4">
        <div class="menu">
          <el-breadcrumb separator-icon="ArrowRight" class="navigation">
            <el-breadcrumb-item :to="{ path: '/' }"><el-icon>
                <HomeFilled />
              </el-icon><span class="desc">首页</span></el-breadcrumb-item>
            <el-breadcrumb-item>
              <el-icon><UserFilled /></el-icon>
              <span class="desc">会员中心</span></el-breadcrumb-item>
          </el-breadcrumb>
          <el-menu :default-active="`/${$route.path.split('/')[1]}/${$route.path.split('/')[2]}`" class="el_menu">
            <el-menu-item index="/user/certification" @click="goRouter('/user/certification')">
              <template #title>
                <el-icon><Postcard /></el-icon>
                <span>实名认证</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/user/order" @click="goRouter('/user/order')">
              <el-icon><Memo /></el-icon>
              <span>挂号订单</span>
            </el-menu-item>
            <el-menu-item index="/user/patient" @click="goRouter('/user/patient')">
              <el-icon><User /></el-icon>
              <span>就诊人管理</span>
            </el-menu-item>
            <el-menu-item index="/user/profile" @click="goRouter('/user/profile')">
              <el-icon><Document /></el-icon>
              <span>账号信息</span>
            </el-menu-item>
            <el-menu-item index="/user/feedback" @click="goRouter('/user/feedback')">
              <el-icon><ChatDotRound /></el-icon>
              <span>意见反馈</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.user {
  .menu {
    .navigation {
      height: 20px;
      margin: 15px 0 10px 20px;

      :deep(.el-breadcrumb__item) {
        height: 20px;
      }

      :deep(.el-breadcrumb__inner) {
        height: 100%;
        display: flex;
        align-items: center;
      }

      .desc {
        margin-left: 3px;
        font-weight: 900;
      }
    }
  }
}
</style>