<script setup lang="ts">

</script>

<template>
    <div class="main_bar">
        <HospitalTop />
        <div class="main">
            <router-view />
        </div>
        <HospitalBottom />
        <Login />
    </div>
</template>

<style scoped>
.main_bar{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main {
    min-height: 800px;
    width: 1200px;
    margin-top: 70px;
}
</style>
