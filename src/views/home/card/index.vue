<template>
    <el-card class="box-card" shadow="hover" @click="goHospital">
        <div class="card_body">
            <div class="card_left">
                <div class="title">{{ hospitalName }}</div>
                <div class="tips">
                    <div class="level">
                        <el-icon class="icons">
                            <Star />
                        </el-icon><span>{{ hospitalLevel }}</span>
                    </div>
                    <div class="time">
                        <el-icon class="icons">
                            <Clock />
                        </el-icon><span>每天{{hospitalTime}}放号</span>
                    </div>
                </div>
            </div>
            <div class="card_right">
                <img class="hospital_img" :src="hospitalUrl!=null?`data:image/png;base64,${hospitalUrl}`:'/src/assets/images/logo.png'">
            </div>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import router from '@/router';
defineOptions({
    name: 'Card',
})
const props = defineProps({
    hospitalName: {
        type: String,
        required: true,
    },
    hospitalLevel: {
        type: String,
        required: true,
    },
    hospitalTime: {
        type: String,
        required: true,
    },
    hospitalUrl: {
        type: String,
        required: true,
    },
    hoscode:{
        type:String,
        default:''
    }
})
const goHospital = ()=>{
    router.push({
        path:`/hospital/register`,
        query:{
            hoscode:props.hoscode
        }
    })
}
</script>

<style lang="scss" scoped>
.box-card {
    width: 49%;
    margin-top: 15px;
    cursor: pointer;

    .card_body {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;

        .card_left {
            width: 75%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .title {
                font-size: 20px;
            }

            .tips {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #7f7f7f;
                flex-wrap: nowrap;

                .icons {
                    vertical-align: bottom;
                    font-size: 16px;
                    margin-right: 3px;
                }
            }
        }

        .card_right {
            .hospital_img {
                height: 60px;
                width: 60px;
                vertical-align: top;
            }
        }
    }

}
</style>