<template>
  <div class="carousel">
    <el-carousel height="350px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="../../../assets/images/web-banner-1.png">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'Carousel',
  })
</script>

<style lang="scss" scoped>
.carousel{
  width: 100%;
  img{
    height: 350px;
    width: 1200px;
  }
}
</style>