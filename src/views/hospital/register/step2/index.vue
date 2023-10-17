<template>
  <div class="step2">
    <el-card class="patient_card">
      <template #header>
        <div class="header">
          <span class="tips">请选择就诊人</span>
          <el-button type="success" icon="User" class="btn" @click="goAddPatient">添加就诊人</el-button>
        </div>
      </template>
      <div class="content">
        <PatientCardItem v-for="(item, index) in patientArr" class="item" :item="item" :key="item.id" :actId="actPatientId" @click="switchActId(item.id)"></PatientCardItem>
      </div>
    </el-card>
    <el-card class="doctor_card">
      <template #header>
        <div class="card_header">
          <span>挂号信息</span>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期</div>
          </template>
          {{ doctorData.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院</div>
          </template>
          {{ doctorData.param.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室</div>
          </template>
          {{ doctorData.param.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名</div>
          </template>
          {{ doctorData.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称</div>
          </template>
          {{ doctorData.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长</div>
          </template>
          {{ doctorData.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医师服务费</div>
          </template>
          ￥{{ doctorData.amount }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="confirm">
      <el-button type="primary" size="default" @click="createOrder" class="btn" :disabled="actPatientId===0" :loading="loading">确认挂号</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reqGetAllPatient, reqGetDoctorById } from '@/api/hospital';
import PatientCardItem from './carditem/index.vue'
import type { DoctorData, DoctorResponseData, PatientData, PatientResponseData } from '@/api/hospital/type';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import type { OrderResponseData } from '@/api/user/type';
import { reqPostOrder } from '@/api/user';
defineOptions({
  name: 'RegisterStep2',
})
let $route = useRoute()
let $router = useRouter()
let actPatientId = ref<number>(0)
let loading = ref<boolean>(false)
let patientArr = ref<PatientData[]>([])
let doctorData = ref<DoctorData>({
  id: '',
  createTime: '',
  updateTime: '',
  isDeleted: 0,
  param: {
    dayOfWeek: '',
    depname: '',
    hosname: ''
  },
  hoscode: '',
  depcode: '',
  title: '',
  docname: '',
  skill: '',
  workDate: '',
  workTime: 0,
  reservedNumber: 0,
  availableNumber: 0,
  amount: 0,
  status: 0,
  hosScheduleId: ''
})
const getPatients = async () => {
  let result: PatientResponseData = await reqGetAllPatient()
  if (result.code === 200) {
    ElMessage.success('获取患者信息成功')
    patientArr.value = result.data
  } else {
    ElMessage.error('获取患者信息失败')
  }
}
const getDoctorById = async () => {
  let result: DoctorResponseData = await reqGetDoctorById($route.query.scheduleId as string)
  if (result.code === 200) {
    ElMessage.success('获取医生信息成功')
    doctorData.value = result.data
  } else {
    ElMessage.error('获取医生信息失败')
  }
}
const switchActId = (actId:number)=>{
  actPatientId.value = actId
}
const createOrder = async()=>{
  console.log(doctorData.value.hoscode,doctorData.value.id,actPatientId.value)
  loading.value = true
  let result:OrderResponseData = await reqPostOrder(doctorData.value.hoscode,doctorData.value.id,actPatientId.value)
  loading.value = false
  if(result.code===200){
    ElMessage.success('创建订单成功')
    $router.push({
      path:'/user/order',
      query:{
        id:result.data
      }
    })
  }else{
    ElMessage.error('创建订单失败')
  }
}
const goAddPatient = ()=>{
  $router.push({
    path:'/user/patient',
    query:{
      type:'add'
    }
  })
}
onMounted(() => {
  getPatients()
  getDoctorById()
})
</script>

<style lang="scss" scoped>
.step2 {
  margin-left: 20px;
  margin-top: 50px;

  .patient_card {
    .header {
      display: flex;
      justify-content: space-between;

      .tips {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 900;
      }

      .btn {
        margin-right: 0.83%;
      }
    }

    .content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .item {
        width: 32.5%;
        margin-right: 0.83%;
      }
    }
  }

  .doctor_card {
    margin: 20px 0;

    .card_header {
      font-size: 18px;
      font-weight: 900;
    }
  }

  .confirm {
    display: flex;
    justify-content: center;

    .btn {
      padding-left: 35px;
      padding-right: 35px;
      margin-bottom: 20px;
    }
  }
}</style>