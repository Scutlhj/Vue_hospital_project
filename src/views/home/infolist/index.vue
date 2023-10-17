<script lang="ts" setup>
import type { DictData } from '@/api/home/type';
import { ref } from 'vue';
defineOptions({
    name: 'InfoList',
})
defineProps({
    title: {
        required: true,
        type: String
    },
    content: {
        type: Array<DictData>,
        default: []
    },
})
const emits = defineEmits(['changeDict'])
let activeValue = ref<string>('')
const changeActive = (active:string)=>{
    activeValue.value = active
    emits('changeDict',active)
}
</script>
<template>
    <div class="infolist">
        <div class="left">{{ title }}:</div>
        <div class="right">
            <ul>
                <li :class="{'active':activeValue===''}" @click="changeActive('')">全部</li>
                <li v-for="(item, index) in content" :key="index" :class="{'active':activeValue===item.value}" @click="changeActive(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.infolist {
    width: 100%;
    display: flex;
    color: #7f7f7f;
    font-size: 14px;
    margin-bottom: 10px;

    .left {
        margin-right: 10px;
        white-space: nowrap;
    }

    .right {
        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                margin: 0 10px 10px;
                cursor: pointer;

                &.active {
                    color: skyblue
                }
            }

            li:hover {
                color: skyblue
            }
        }
    }
}</style>