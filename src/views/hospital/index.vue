<script lang="ts" setup>
import router from '@/router';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import useHospitalStore from '@/stores/modules/hospital'
defineOptions({
  name: 'Hospital',
})
let $route = useRoute()
let hospitalStore = useHospitalStore()
const goRouter = (url: string) => {
  router.push({
    path: url,
    query:{
      hoscode:$route.query.hoscode || hospitalStore.hospitalDetail.hospital.hoscode
    }
  })
}
onBeforeMount(() => {
  // 获取医院详情
  hospitalStore.getHospitalDetail($route.query.hoscode as string)
  // 获取医院部门详情
  hospitalStore.getHospitalDepartments($route.query.hoscode as string)
})
</script>

<template>
  <div class="hospital">
    <el-row>
      <el-col :span="4">
        <div class="menu">
          <el-breadcrumb separator-icon="ArrowRight" class="navigation">
            <el-breadcrumb-item :to="{ path: '/' }"><el-icon>
                <HomeFilled />
              </el-icon><span class="desc">首页</span></el-breadcrumb-item>
            <el-breadcrumb-item><el-icon><List /></el-icon><span class="desc">医院信息</span></el-breadcrumb-item>
          </el-breadcrumb>
          <el-menu :default-active="`/${$route.path.split('/')[1]}/${$route.path.split('/')[2]}`" class="el_menu">
            <el-menu-item index="/hospital/register" @click="goRouter('/hospital/register')">
              <template #title>
                <el-icon>
                  <Calendar />
                </el-icon>
                <span>预约挂号</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/hospital/detail" @click="goRouter('/hospital/detail')">
              <el-icon>
                <Document />
              </el-icon>
              <span>医院详情</span>
            </el-menu-item>
            <el-menu-item index="/hospital/renotice" @click="goRouter('/hospital/renotice')">
              <el-icon>
                <Bell />
              </el-icon>
              <span>预约须知</span>
            </el-menu-item>
            <el-menu-item index="/hospital/clnotice" @click="goRouter('/hospital/clnotice')">
              <el-icon>
                <Warning />
              </el-icon>
              <span>停诊须知</span>
            </el-menu-item>
            <el-menu-item index="/hospital/search" @click="goRouter('/hospital/search')">
              <el-icon>
                <Search />
              </el-icon>
              <span>查询/取消</span>
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
.hospital {
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
}</style>