<template>
  <div class="clnotice">
    <div class="title">{{ hospitalStore.hospitalDetail.hospital?.hosname }}停诊信息</div>
    <div class="content">
      <el-empty description="暂无信息" />
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import useHospitalStore from '@/stores/modules/hospital';
defineOptions({
  name: 'ClnoticeView',
})
let hospitalStore = useHospitalStore()
</script>
  
<style lang="scss" scoped>
.clnotice{
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