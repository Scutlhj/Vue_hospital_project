<template>
  <div class="patient">
    <el-card class="patient_card">
      <template #header>
        <div class="header">
          <span>就诊人管理</span>
          <el-button class="button" type="success" icon="User" v-if="scene === 0" @click="addPatient">添加就诊人</el-button>
          <el-button class="button" icon="ArrowLeft" v-if="scene === 1" @click="goBack">返回</el-button>
        </div>
      </template>
      <div class="patient_boxes" v-if="scene === 0">
        <PatientCardItem v-for="(item, index) in patientArr" class="item" :item="item" :key="item.id" @edit="getOneInfo"
          @remove="removePatientById">
        </PatientCardItem>
      </div>
      <PatientForm v-if="scene === 1" @goBack="goBack" :selectid="selectid"></PatientForm>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { PatientData, PatientResponseData } from '@/api/hospital/type';
import PatientCardItem from './patientitem/index.vue'
import PatientForm from './patientform/index.vue'
import { reqGetAllPatient } from '@/api/hospital';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { reqDeletePatient } from '@/api/user';
defineOptions({
  name: 'PatientView',
})
let $route = useRoute()
let $router = useRouter()
let patientArr = ref<PatientData[]>([])
let scene = ref<number>(0)
let selectid = ref<number>(-1)
const getPatientInfo = async () => {
  let result: PatientResponseData = await reqGetAllPatient()
  if (result.code === 200) {
    ElMessage.success('获取就诊人信息成功')
    patientArr.value = result.data
  } else {
    ElMessage.error('获取就诊人信息失败')
  }
}
const addPatient = () => {
  selectid.value = -1
  scene.value = 1
}
const checkRoute = () => {
  if ($route.query.type === 'add') {
    addPatient()
  }
  if ($route.query.type === 'update' && $route.query.id) {
    getOneInfo($route.query.id as unknown as number)
  }
}
const goBack = () => {
  if ($route.query.type === 'add' || $route.query.type === 'update') {
    $router.back()
  } else {
    scene.value = 0
    getPatientInfo()
  }
}
const getOneInfo = (itemId: number) => {
  selectid.value = itemId
  scene.value = 1
}
const removePatientById = (itemId: number) => {
  ElMessageBox.confirm(
    '确认删除就诊人?',
    '确认操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await reqDeletePatient(itemId as unknown as string)
      if(result.code===200){
        ElMessage.success('删除就诊人成功')
      }else{
        ElMessage.error('删除就诊人失败')
      }
      getPatientInfo()
    })
    .catch(() => {
      ElMessage.info('取消操作')
    })
}
onMounted(() => {
  getPatientInfo()
  checkRoute()
})

</script>

<style lang="scss" scoped>
.patient {
  margin-top: 50px;
  margin-left: 20px;

  .patient_card {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 18px;
        font-weight: 900;
      }
    }
  }

  .patient_boxes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .item {
      width: 32.5%;
      margin-right: 0.83%;
    }
  }
}
</style>