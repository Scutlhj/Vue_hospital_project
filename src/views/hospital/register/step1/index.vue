<template>
  <div class="step">
    <div class="header">
      <span class="hosname" @click="goHospital">{{ baseMap.hosname }}</span>
      <span class="sep">|</span>
      <span>{{ baseMap.bigname }}</span>
      <span class="sep">·</span>
      <span>{{ baseMap.depname }}</span>
    </div>
    <div class="content">
      <span class="date">{{ baseMap.workDateString }}</span>
      <div class="reglist">
        <div class="regbox" v-for="(item, index) in bookingScheduleList" :key="item.workDate"
          :class="{ 'no_access': item.status === -1 || item.status === 0 && item.availableNumber <= 0 || item.status === 1, 'has_access': item.status === 0 && item.availableNumber > 0, 'active': actDate === item.workDate }"
          @click="changeActDate(item)">
          <div class="topdate" v-text="`${item.workDate} ${item.dayOfWeek}`">
          </div>
          <div class="bottomstatus">
            <span v-if="item.status === -1">停止挂号</span>
            <span v-if="item.status === 0 && item.availableNumber > 0">有号</span>
            <span v-if="item.status === 0 && item.availableNumber <= 0">无号</span>
            <span v-if="item.status === 1">即将放号</span>
          </div>
        </div>
      </div>
      <el-pagination layout="prev, pager, next" :total="total" v-model:page-size="pageSize" v-model:current-page="pageNo"
        @current-change="getRegisterPager" />
    </div>
    <el-collapse class="collapse">
      <el-collapse-item name="morning">
        <template #title>
          <svg t="1694523383206" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4662" width="16" height="16">
            <path
              d="M513.123 795.991c-76.156 0-147.753-29.658-201.603-83.508-53.849-53.849-83.504-125.444-83.504-201.596 0-76.153 29.657-147.749 83.504-201.598 53.85-53.851 125.446-83.508 201.603-83.508 76.147 0 147.742 29.658 201.593 83.508 53.853 53.852 83.511 125.447 83.511 201.598s-29.659 147.747-83.511 201.597c-53.852 53.85-125.445 83.507-201.593 83.507zM513.123 272.352c-131.529 0-238.534 107.007-238.534 238.535s107.006 238.533 238.534 238.533 238.533-107.005 238.533-238.533c0-131.529-107.006-238.535-238.533-238.535z"
              fill="#1296db" p-id="4663"></path>
            <path
              d="M513.123 149.007c-12.861 0-23.285-10.426-23.285-23.285v-91.359c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.358c0 12.862-10.426 23.286-23.285 23.286z"
              fill="#1296db" p-id="4664"></path>
            <path
              d="M513.123 1010.674c-12.861 0-23.285-10.426-23.285-23.285v-91.346c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.346c0 12.861-10.426 23.285-23.285 23.285z"
              fill="#1296db" p-id="4665"></path>
            <path
              d="M240.764 261.825c-5.959 0-11.919-2.274-16.466-6.821l-64.592-64.591c-9.094-9.093-9.094-23.838 0-32.931 9.093-9.094 23.838-9.094 32.931 0l64.593 64.592c9.094 9.093 9.094 23.838 0 32.931-4.546 4.545-10.507 6.82-16.467 6.82z"
              fill="#1296db" p-id="4666"></path>
            <path
              d="M850.050 871.111c-5.958 0-11.919-2.272-16.467-6.82l-64.593-64.593c-9.093-9.094-9.093-23.839 0-32.932 9.094-9.094 23.839-9.094 32.932 0l64.593 64.593c9.093 9.094 9.093 23.839 0 32.932-4.546 4.545-10.507 6.82-16.466 6.82z"
              fill="#1296db" p-id="4667"></path>
            <path
              d="M36.59 534.183c-12.861 0.001-23.286-10.423-23.289-23.283-0.001-12.861 10.423-23.286 23.283-23.289l91.348-0.011c12.861-0.001 23.286 10.423 23.289 23.283 0.001 12.861-10.423 23.286-23.283 23.289l-91.348 0.011z"
              fill="#1296db" p-id="4668"></path>
            <path
              d="M989.613 534.173h-91.346c-12.861 0-23.285-10.426-23.285-23.285s10.426-23.285 23.285-23.285h91.346c12.861 0 23.285 10.426 23.285 23.285s-10.426 23.285-23.285 23.285z"
              fill="#1296db" p-id="4669"></path>
            <path
              d="M176.173 871.122c-5.959 0-11.919-2.272-16.466-6.82-9.094-9.094-9.094-23.839 0-32.932l64.593-64.593c9.094-9.094 23.838-9.094 32.931 0s9.094 23.839 0 32.932l-64.593 64.593c-4.546 4.546-10.506 6.82-16.466 6.82z"
              fill="#1296db" p-id="4670"></path>
            <path
              d="M785.457 261.825c-5.959 0-11.918-2.272-16.467-6.821-9.094-9.094-9.093-23.838 0.001-32.931l64.593-64.592c9.094-9.093 23.838-9.094 32.931 0s9.093 23.838-0.001 32.931l-64.593 64.592c-4.545 4.546-10.506 6.821-16.465 6.821z"
              fill="#1296db" p-id="4671"></path>
          </svg>
          <span class="title">上午号源</span>
        </template>
        <div class="docdata">
          <div class="docitem" v-for="(item, index) in morningDocArr" :key="item.id">
            <div class="left">
              <div class="docinfo">
                <span>{{ item.title }}</span>
                <span class="sep">|</span>
                <span>{{ item.docname }}</span>
              </div>
              <span class="docdesc">
                {{ item.skill }}
              </span>
            </div>
            <div class="right">
              <span class="price">￥{{ item.amount }}</span>
              <el-button type="primary" style="width: 90px;height: 35px;" @click="goStep2(item.id)">剩余{{ item.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Feedback" name="afternoon">
        <template #title>
          <svg t="1694523334771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="3351" width="16" height="16">
            <path
              d="M642.218667 280.874667a182.272 182.272 0 0 0-168.362667 92.928l37.632 20.992a138.282667 138.282667 0 0 1 128.256-70.784c36.650667 2.133333 70.272 18.474667 94.72 45.952 24.405333 27.52 36.693333 62.933333 34.56 99.712-0.725333 12.714667-3.157333 25.173333-7.253333 36.992l40.704 14.08c5.376-15.573333 8.576-31.914667 9.514666-48.597334a180.224 180.224 0 0 0-45.397333-130.901333 179.114667 179.114667 0 0 0-124.373333-60.373333zM959.530667 459.093333l-70.954667-4.138666a21.589333 21.589333 0 1 0-2.474667 43.136l70.954667 4.138666 1.237333 0.042667a21.546667 21.546667 0 0 0 21.461334-20.352 21.504 21.504 0 0 0-20.224-22.826667zM933.674667 333.653333a21.589333 21.589333 0 0 0-19.285334-38.570666l-63.488 31.957333a21.589333 21.589333 0 0 0 19.285334 38.570667l63.488-31.957334zM823.338667 169.472a21.546667 21.546667 0 0 0-29.824 6.186667l-39.04 59.52a21.589333 21.589333 0 0 0 36.010666 23.68l39.04-59.562667a21.632 21.632 0 0 0-6.186666-29.824zM645.376 226.816a21.546667 21.546667 0 0 0 22.741333-20.309333l4.138667-71.168a21.546667 21.546667 0 0 0-20.224-22.784 21.76 21.76 0 0 0-22.698667 20.309333l-4.138666 71.168a21.461333 21.461333 0 0 0 20.181333 22.784zM516.821333 253.738667a21.632 21.632 0 0 0 19.2-31.274667l-31.872-63.658667a21.461333 21.461333 0 0 0-28.885333-9.6 21.589333 21.589333 0 0 0-9.557333 28.970667l31.914666 63.701333a21.461333 21.461333 0 0 0 19.2 11.861334zM429.653333 302.506667l-59.349333-39.168a21.589333 21.589333 0 0 0-23.637333 36.096l59.349333 39.125333a21.333333 21.333333 0 0 0 29.781333-6.186667 21.546667 21.546667 0 0 0-6.144-29.866666z"
              fill="#1296db" p-id="3352"></path>
            <path
              d="M193.408 664.106667a107.946667 107.946667 0 0 0 0 215.936h572.672a172.672 172.672 0 0 0 172.245333-172.757334 172.714667 172.714667 0 0 0-172.245333-172.757333 170.666667 170.666667 0 0 0-57.856 10.24l-17.792 6.4-8.618667-16.853333a235.904 235.904 0 0 0-210.645333-129.322667c-130.56 0-236.8 106.581333-236.8 237.525333v25.002667l-24.576-2.048a110.72 110.72 0 0 0-16.384-1.365333z m572.672 259.072H193.408A151.125333 151.125333 0 0 1 42.666667 772.053333a151.082667 151.082667 0 0 1 149.418666-151.125333c11.050667-144.725333 131.968-259.114667 279.04-259.114667a278.528 278.528 0 0 1 240.128 136.789334c18.005333-4.821333 36.394667-7.253333 54.826667-7.253334 118.698667 0 215.296 96.853333 215.296 215.893334-0.042667 119.082667-96.597333 215.936-215.296 215.936z"
              fill="#1296db" p-id="3353"></path>
          </svg>
          <span class="title">下午号源</span>
        </template>
        <div class="docdata">
          <div class="docitem" v-for="(item, index) in afternoonDocArr" :key="item.id">
            <div class="left">
              <div class="docinfo">
                <span>{{ item.title }}</span>
                <span class="sep">|</span>
                <span>{{ item.docname }}</span>
              </div>
              <span class="docdesc">
                {{ item.skill }}
              </span>
            </div>
            <div class="right">
              <span class="price">￥{{ item.amount }}</span>
              <!-- id为医生id -->
              <el-button type="primary" style="width: 90px;height: 35px;" @click="goStep2(item.id)">剩余{{
                item.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { reqGetAllDoctors, reqGetRegisterPager } from '@/api/hospital';
import type { BaseMap, BookingScheduleData, DoctorData, AllDoctorsResponseData, RegisterPagerResponseData } from '@/api/hospital/type';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
defineOptions({
  name: 'RegisterStep1',
})
let $route = useRoute()
let $router = useRouter()
let total = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let actDate = ref<string>('')
let doctArr = ref<DoctorData[]>([])
let bookingScheduleList = ref<BookingScheduleData[]>([])
let baseMap = ref<BaseMap>({
  workDateString: '',
  releaseTime: '',
  bigname: '',
  stopTime: '',
  depname: '',
  hosname: ''
})
const getRegisterPager = async (pager = 1) => {
  pageNo.value = pager
  let result: RegisterPagerResponseData = await reqGetRegisterPager(pageNo.value, pageSize.value, $route.query.hoscode as string, $route.query.depcode as string)
  if (result.code === 200) {
    ElMessage.success('获取分页数据成功')
    total.value = result.data.total
    bookingScheduleList.value = result.data.bookingScheduleList
    baseMap.value = result.data.baseMap
  } else {
    ElMessage.error('获取分页数据失败')
  }
}
const changeActDate = (item: BookingScheduleData) => {
  // 可挂号的item
  if (item.status === 0 && item.availableNumber >= 0) {
    actDate.value = item.workDate
  }
}
const getDoctorData = async () => {
  let result: AllDoctorsResponseData = await reqGetAllDoctors($route.query.hoscode as string, $route.query.depcode as string, actDate.value)
  if (result.code === 200) {
    doctArr.value = result.data
    ElMessage.success('获取排班数据成功')
  } else {
    ElMessage.error('获取排班数据失败')
  }
}
const morningDocArr = computed(() => {
  return doctArr.value.filter(item => item.workTime == 0)
})
const afternoonDocArr = computed(() => {
  return doctArr.value.filter(item => item.workTime == 1)
})
const goHospital = () => {
  $router.push({
    path: '/hospital/register/data',
    query: {
      hoscode: $route.query.hoscode
    }
  })
}
const goStep2 = (scheduleId: string) => {
  console.log('跳转到2')
  $router.push({
    path: '/hospital/register/step2',
    query: {
      scheduleId:scheduleId
    }
  })
}
onMounted(() => {
  getRegisterPager()
})
watch(() => actDate.value, () => {
  getDoctorData()
})
</script>

<style lang="scss" scoped>
.step {
  margin-left: 20px;
  font-size: 12px;

  .header {
    margin-top: 60px;
    color: grey;

    .sep {
      margin: 0 10px;
    }

    .hosname {
      cursor: pointer;

      &:hover {
        color: aqua;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    .date {
      color: #7f7f7f;
      font-weight: 900;
      margin-bottom: 20px;
    }

    .reglist {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding-right: 80px;
      margin-bottom: 20px;

      .regbox {
        width: 14%;
        height: 80px;

        &.no_access {
          border: 1px grey solid;
          cursor: not-allowed;

          .topdate {
            background-color: rgb(204, 204, 204);
            color: grey;
          }
        }

        &.has_access {
          border: 1px skyblue solid;
          cursor: pointer;
          transition: all 0.2s;

          &.active {
            transform: scale(1.1);
          }

          .topdate {
            color: skyblue;
            background-color: #8dff8d;
          }
        }

        .topdate {
          height: 40%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 900;
        }

        .bottomstatus {
          width: 100%;
          height: 60%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .collapse {
    .title {
      margin-left: 5px;
      font-size: 12px;
      font-weight: 900;
      color: #7f7f7f;
      letter-spacing: 1px;
    }

    .docitem {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: grey 1px solid;

      .left {
        display: flex;
        flex-direction: column;

        .docinfo {
          font-size: 14px;
          color: #0073ff;
          margin-bottom: 8px;

          .sep {
            margin: 0 10px;
          }
        }

        .docdesc {
          font-size: 12px;
          color: #7f7f7f;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .price {
          margin-right: 40px;
        }
      }
    }
  }
}</style>