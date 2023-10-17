<template></template>

<script lang="ts" setup>
import { SET_USERDATA } from '@/utils/userdata';
import { useRoute } from 'vue-router'
defineOptions({
    name: 'wxLogin',
})
let $route = useRoute()
// 设置本地存储
SET_USERDATA({
    name: $route.query.name as string,
    token: $route.query.token as string
})
let html = document.getElementsByTagName('html')[0]
html.style.display = 'none'
</script>

<style lang="scss" scoped></style>