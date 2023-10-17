<script lang="ts" setup>
import { reqGetHospitalByName } from '@/api/home';
import type { SearchResponseData } from '@/api/home/type';
import { ref } from 'vue';
import router from '@/router';
defineOptions({
    name: 'Search',
})
let searchKeyword = ref<string>('')
const querySearchAsync = async (queryString: string, cb: (arg: any) => void) => {
    let result: SearchResponseData = await reqGetHospitalByName(queryString)
    if (result.data.length > 0) {
        cb(result.data.map((item) => {
            return {
                value: item.hosname,
                hoscode: item.hoscode
            }
        }))
    }
}
const handleSelect = (item: any) => {
    // item为cb的数据
    router.push({
        path: `/hospital/register`, query: {
            hoscode: item.hoscode
        }
    })
}
</script>
<template>
    <div class="search">
        <el-autocomplete v-model="searchKeyword" :fetch-suggestions="querySearchAsync" placeholder="请输入医院名称"
            @select="handleSelect" size="large" :trigger-on-focus="false" :fit-input-width="true" />
        <el-button type="primary" size="large" @click="" icon="search"></el-button>
    </div>
</template>

<style lang="scss" scoped>
.search {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;

    :deep(.el-input__wrapper) {
        width: 650px;
    }
}
</style>