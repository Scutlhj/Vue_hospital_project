<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import InfoList from './infolist/index.vue'
import Card from './card/index.vue'
import News from './news/index.vue'
import { reqGetPagers, reqGetLevelOrRegion } from '@/api/home'
import { ElMessage } from 'element-plus'
import type { HospitalData, HospitalResponseData, DictData, DictResponseData } from '@/api/home/type'
defineOptions({
    name: 'Home',
})
let pageNo = ref<number>(1)
let pageSize = ref<number>(6)
let total = ref<number>(0)
let hospitalData = ref<HospitalData[]>([])
let levelData = ref<DictData[]>([])
let regionData = ref<DictData[]>([])
let levelSelected = ref<string>('')
let regionSelected = ref<string>('')
const getPagers = async (pager = 1) => {
    pageNo.value = pager
    let result: HospitalResponseData = await reqGetPagers(pageNo.value, pageSize.value,levelSelected.value,regionSelected.value)
    if (result.code === 200) {
        ElMessage.success('获取医院分页数据成功')
        total.value = result.data.totalElements
        hospitalData.value = result.data.content
    }
}
const getLevel = async()=>{
    let result:DictResponseData = await reqGetLevelOrRegion('hostype')
    if(result.code===200){
        levelData.value = result.data
    }
}
const getRegion = async()=>{
    let result:DictResponseData = await reqGetLevelOrRegion('Beijin')
    if(result.code===200){
        regionData.value = result.data
    }
}
const changeLevel = (levelValue:string)=>{
    levelSelected.value = levelValue
    getPagers()
}
const changeRegion = (regionValue:string)=>{
    regionSelected.value = regionValue
    getPagers()
}
onMounted(() => {
    getPagers()
    getLevel()
    getRegion()
})
</script>

<template>
    <div class="home">
        <Carousel />
        <Search />
        <el-row :gutter="30">
            <el-col :span="19">
                <InfoList :title="'医院'" />
                <InfoList :title="'等级'"
                    :content="levelData" @changeDict="changeLevel"/>
                <InfoList :title="'地区'"
                    :content="regionData" @changeDict="changeRegion"/>
                <div class="cards" v-if="hospitalData.length>0">
                    <Card v-for="(item, index) in hospitalData" :key="item.id" :hospital-name="item.hosname || '无数据'"
                        :hospital-level="item.param.hostypeString || '无数据'"
                        :hospital-time="item.bookingRule?.releaseTime || '8:00'" :hospital-url="item.logoData" :hoscode="item.hoscode"/>
                </div>
                <el-empty description="暂无数据" v-else/>
                <el-pagination v-model:currentPage="pageNo" v-model:page-size="pageSize" :page-sizes="[6, 8, 10, 12]"
                    layout="prev, pager, next, jumper, ->, sizes,total" :total="total" background style="margin: 20px 0;"
                    @size-change="getPagers()" @current-change="getPagers">
                </el-pagination>

            </el-col>
            <el-col :span="5"><News /></el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.home {
    width: 1200px;

    .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}
</style>