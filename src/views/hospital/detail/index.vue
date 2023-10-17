<template>
  <div class="detail">
    <div class="header">
      <!-- 这里不加?马上报错,可能是仓库的时机问题,就是父组件beforeMount会获取数据并赋值给仓库,在此之前仓库数据为空,直接获取hospital为undifine -->
      <h3 class="hosname">{{ hospitalStore.hospitalDetail.hospital?.hosname }}</h3>
      <div class="hostype">
        <el-icon class="hosicon">
          <Medal />
        </el-icon>
        <span class="hosttype_level">{{ hospitalStore.hospitalDetail.hospital?.param.hostypeString }}</span>
      </div>
    </div>
    <div class="hosdesc">
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="img_box">
            <img :src="`data:image/png;base64,${hospitalStore.hospitalDetail.hospital?.logoData}`">
          </div>
        </el-col>
        <el-col :span="21">
          <div class="positions">
            <div class="content">
              <span class="location">具体地址:<span class="number">{{ hospitalStore.hospitalDetail.hospital?.param.fullAddress
              }}</span></span>
              <span class="route">规划路线:<span class="number">{{ hospitalStore.hospitalDetail.hospital?.route
              }}</span></span>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="desc">
        <h3 class="title">医院介绍</h3>
        <p>{{ hospitalStore.hospitalDetail.hospital?.intro }}</p>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import useHospitalStore from '@/stores/modules/hospital';
defineOptions({
  name: 'DetailView',
})
let hospitalStore = useHospitalStore()
</script>
  
<style lang="scss" scoped>
.detail {
  margin-left: 20px;

  .header {
    display: flex;
    margin-top: 50px;
    align-items: center;
    height: 50px;

    .hosname {
      font-size: 20px;
      height: 100%;
      line-height: 50px;
    }

    .hostype {
      color: #7f7f7f;
      font-size: 14px;
      display: flex;
      align-items: center;
      height: 100%;

      .hosicon {
        margin: 0 5px 0 15px;
        vertical-align: top;
      }
    }
  }

  .hosdesc {
    .img_box {
      display: flex;
      justify-content: center;
      margin-top: 15px;

      img {
        height: 80px;
        width: 80px;
      }
    }

    .positions {
      font-size: 14px;
      color: #7f7f7f;
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      .content {
        display: flex;
        flex-direction: column;

        .location,
        .route{
          line-height: 25px;

          .number {
            margin: 0 6px;
          }
        }
      }
    }
    .desc{
      margin-top: 30px;
      color: #7f7f7f;
      font-size: 14px;
      .title{
        color: black;
        margin-bottom: 10px;
        font-weight: 500;
      }
      p{
        line-height: 25px;
      }
    }
  }
}</style>