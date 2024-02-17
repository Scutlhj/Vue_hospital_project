<template>
    <div>
        <OrderDetail v-if="$route.query.id" />
        <div v-else class="order">
            <el-card class="order_card">
                <template #header>
                    <div class="header">
                        <span>挂号订单</span>
                    </div>
                </template>
                <el-form :inline="true" label-width="80px" class="order_form">
                    <el-form-item label="就诊人">
                        <el-select placeholder="请选择就诊人" v-model="selectedId" @change="getOrderPager()">
                            <el-option v-for="(item, index) in patientList" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-select placeholder="请选择订单状态" v-model="selectedStatus" @change="getOrderPager()">
                            <el-option v-for="(item, index) in statusList" :key="item.status" :label="item.comment"
                                :value="item.status" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="default" @click="reset" :disabled="!selectedId && !Number.isInteger(selectedStatus)"
                            class="resetbtn">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="orderPager" border class="order_table">
                    <el-table-column prop="reserveDate" label="就诊时间" align="center" :resizable="false" />
                    <el-table-column prop="hosname" label="医院" width="150px" align="center" :resizable="false" />
                    <el-table-column prop="depname" label="科室" width="200px" align="center" :resizable="false" />
                    <el-table-column prop="title" label="医生" align="center" :resizable="false" />
                    <el-table-column prop="amount" label="服务费" width="80px" align="center" :resizable="false" />
                    <el-table-column prop="patientName" label="就诊人" width="80px" align="center" :resizable="false" />
                    <el-table-column prop="param.orderStatusString" label="订单状态" width="140px" align="center"
                        :resizable="false" />
                    <el-table-column label="操作" width="80px" align="center" :resizable="false">
                        <template #="{ row, column, $index }">
                            <el-button type="text" @click="goDetail(row.id)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[6, 8, 10, 12]"
                    background layout="prev, pager, next, jumper,->,sizes,total" :total="total"
                    @size-change="getOrderPager()" @current-change="getOrderPager" />
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import OrderDetail from "./detail/index.vue";
import { onMounted, ref } from "vue";
import { reqGetOrderPager, reqGetOrderStatusList } from "@/api/user";
import type { OrderPagerData, OrderPagerResponseData, StatusData, StatusResponseData } from "@/api/user/type";
import type { PatientData, PatientResponseData } from "@/api/hospital/type";
import { reqGetAllPatient } from "@/api/hospital";
import { ElMessage } from "element-plus";
defineOptions({
    name: 'OrderView',
})
let $route = useRoute()
let $router = useRouter()
let pageNo = ref<number>(1)
let pageSize = ref<number>(6)
let total = ref<number>(0)
let orderPager = ref<OrderPagerData[]>([])
let statusList = ref<StatusData[]>([])
let patientList = ref<PatientData[]>([])
let selectedId = ref<string>('')
let selectedStatus = ref<string>('')
const getOrderPager = async (pager = 1) => {
    pageNo.value = pager
    let result: OrderPagerResponseData = await reqGetOrderPager(pageNo.value, pageSize.value, selectedId.value, selectedStatus.value)
    if (result.code === 200) {
        total.value = result.data.total
        orderPager.value = result.data.records
    }
}
const getAllPatient = async () => {
    let result: PatientResponseData = await reqGetAllPatient()
    if (result.code === 200) {
        patientList.value = result.data
    } else {
        ElMessage.error('获取就诊人数据失败')
    }
}
const getAllStatus = async () => {
    let result: StatusResponseData = await reqGetOrderStatusList()
    if (result.code === 200) {
        statusList.value = result.data
    } else {
        ElMessage.error('获取订单状态数据失败')
    }
}
const goDetail = (orderId: number) => {
    $router.push({
        path: '/user/order',
        query: {
            id: orderId
        }
    })
}
const reset = () => {
    selectedId.value = ''
    selectedStatus.value = ''
    getOrderPager()
}
onMounted(() => {
    getOrderPager()
    getAllPatient()
    getAllStatus()
})
</script>

<style lang="scss" scoped>
.order {
    margin-top: 50px;
    margin-left: 20px;

    .order_card {
        .header {
            font-size: 18px;
            font-weight: 900;
        }

        .order_form {
            // :deep(.el-form-item:nth-child(3)){
            //     margin-right: 0;
            // }
            // .resetbtn{
            //     margin-left: 212px;
            // }
        }

        .order_table {
            margin: 10px 0 20px 0;
        }
    }
}
</style>