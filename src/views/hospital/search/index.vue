<template>
  <div class="search">
    <div class="title">{{ hospitalStore.hospitalDetail.hospital?.hosname }}信息查询</div>
    <div class="content">
      <el-empty description="暂无信息" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useHospitalStore from '@/stores/modules/hospital';
defineOptions({
  name: 'SeachView',
})
let hospitalStore = useHospitalStore()
</script>

<style lang="scss" scoped>
.search{
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    margin-top: 50px;
    font-size: 25px;
    color: black;
    font-weight: 900;
  }
}
</style>