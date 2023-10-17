<template>
  <div class="register">
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
          <div class="rules">
            <span class="title">挂号规则</span>
            <div class="content">
              <div class="time">
                <span class="cycle">预约周期:<span class="number">{{ hospitalStore.hospitalDetail.bookingRule?.cycle
                }}天</span></span>
                <span class="release_time">放号时间:<span class="number">{{
                  hospitalStore.hospitalDetail.bookingRule?.releaseTime }}</span></span>
                <span class="stop_time">停挂时间:<span class="number">{{ hospitalStore.hospitalDetail.bookingRule?.stopTime
                }}</span></span>
              </div>
              <span class="location">具体地址:<span class="number">{{ hospitalStore.hospitalDetail.hospital?.param.fullAddress
              }}</span></span>
              <span class="route">规划路线:<span class="number">{{ hospitalStore.hospitalDetail.hospital?.route
              }}</span></span>
              <span class="quit_time">退号时间:<span class="number">就诊前{{
                Math.abs(hospitalStore.hospitalDetail.bookingRule?.quitDay) }}工作日{{
    hospitalStore.hospitalDetail.bookingRule?.quitTime }}前取消</span></span>
            </div>
          </div>
          <div class="rules">
            <span class="title">医院预约规则</span>
            <ol class="content">
              <li v-for="(item, index) in hospitalStore.hospitalDetail.bookingRule?.rule" v-text="`${index + 1}.${item}`"
                class="rule">
              </li>
            </ol>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="hosdepartment">
      <div class="nav">
        <ul>
          <li v-for="(item, index) in hospitalStore.hospitalDepartments" :key="item.depcode"
            :class="{ 'active': (index === activeNumber) }" @click="changeActive(index)">{{ item.depname }}</li>
        </ul>
      </div>
      <div class="content" ref="content">
        <div class="department_item" v-for="(item, index) in hospitalStore.hospitalDepartments" :key="item.depcode">
          <div class="item_title">
            {{ item.depname }}
          </div>
          <ul>
            <li v-for="(itemChidren, index) in item.children" :key="itemChidren.depcode"
              @click="goStep(itemChidren.depcode)">{{ itemChidren.depname }}</li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
  
<script lang="ts" setup>
import useHospitalStore from '@/stores/modules/hospital';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
defineOptions({
  name: 'RegiserData',
})
let hospitalStore = useHospitalStore()
let activeNumber = ref<number>(0)
let content = ref()
let $router = useRouter()
let $route = useRoute()
const changeActive = (index: number) => {
  activeNumber.value = index
  // 使用scrollIntoView,该方法会滚动父元素的滚动条使得调用该方法的元素在顶部
  let departments = document.getElementsByClassName('department_item')
  departments[index].scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
const changeHeight = (height: number) => {
  content.value.style.height = height + 'px'
}
const goStep = (depcode: string) => {
  $router.push({
    path: '/hospital/register/step1',
    query: {
      hoscode: $route.query.hoscode,
      depcode: depcode
    }
  })
}
watch(() => hospitalStore.hospitalDepartments.length, (newValue, oldValue) => {
  // 40是nav的li的高度
  console.log('我改变了', newValue, oldValue)
  changeHeight(newValue * 40)
}, {
  immediate: false
})
onMounted(() => {
  if(hospitalStore.hospitalDepartments.length>0){
    changeHeight(hospitalStore.hospitalDepartments.length * 40)
  }
})
</script>
  
<style lang="scss" scoped>
.register {
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

    .rules {
      font-size: 14px;
      color: #7f7f7f;
      display: flex;
      flex-direction: column;

      .title {
        color: black;
        margin: 15px 0 10px 0;
      }

      .content {
        display: flex;
        flex-direction: column;

        .time,
        .location,
        .route,
        .quit_time,
        .rule {
          line-height: 25px;

          .number {
            margin: 0 6px;
          }
        }
      }
    }
  }

  .hosdepartment {
    display: flex;
    flex-direction: row;
    margin: 30px 0;

    .nav {
      flex: 1;
      background-color: rgb(230, 230, 230);

      li {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #7f7f7f;
        cursor: pointer;

        &.active {
          background-color: white;
          color: red;
          border-left: 2px solid red;
        }
      }
    }

    .content {
      flex: 9;
      display: flex;
      flex-direction: column;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .department_item {
        display: flex;
        flex-direction: column;
        color: #7f7f7f;

        .item_title {
          background-color: rgba(230, 230, 230, 0.5);
          font-size: 12px;
          font-weight: 900;
          height: 30px;
          line-height: 30px;
          text-indent: 10px;
        }

        ul {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          li {
            width: 33.33%;
            font-size: 12px;
            height: 40px;
            display: flex;
            align-items: center;
            text-indent: 15px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>