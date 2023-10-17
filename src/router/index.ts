import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/index.vue'),
            meta:{
                title:'首页'
            }
        },
        {
            path: '/hospital',
            name: 'hospital',
            component: () => import('@/views/hospital/index.vue'),
            redirect: '/hospital/register',
            meta:{
                title:'医院信息'
            },
            children: [
                {
                    path: '/hospital/register',
                    name: 'register',
                    component: () => import('@/views/hospital/register/index.vue'),
                    redirect: '/hospital/register/data',
                    meta:{
                        title:'预约挂号'
                    },
                    children: [
                        {
                            path: '/hospital/register/step1',
                            name: 'register_step1',
                            component: () => import('@/views/hospital/register/step1/index.vue'),
                            meta:{
                                title:'挂号流程一'
                            },
                        },
                        {
                            path: '/hospital/register/step2',
                            name: 'register_step2',
                            component: () => import('@/views/hospital/register/step2/index.vue'),
                            meta:{
                                title:'挂号流程二'
                            },
                        },
                        {
                            path: '/hospital/register/data',
                            name: 'register_data',
                            component: () => import('@/views/hospital/register/data/index.vue'),
                            meta:{
                                title:'预约挂号'
                            },
                        },
                    ]
                },
                {
                    path: '/hospital/detail',
                    name: 'detail',
                    component: () => import('@/views/hospital/detail/index.vue'),
                    meta:{
                        title:'医院详情'
                    },
                },
                {
                    path: '/hospital/renotice',
                    name: 'renotice',
                    component: () => import('@/views/hospital/renotice/index.vue'),
                    meta:{
                        title:'预约通知'
                    },
                },
                {
                    path: '/hospital/clnotice',
                    name: 'clnotice',
                    component: () => import('@/views/hospital/clnotice/index.vue'),
                    meta:{
                        title:'停诊须知'
                    },
                },
                {
                    path: '/hospital/search',
                    name: 'search',
                    component: () => import('@/views/hospital/search/index.vue'),
                    meta:{
                        title:'查询信息'
                    },
                },
            ]
        },
        {
            path: '/wxLogin',
            name: 'wxLogin',
            component: () => import('@/views/wxLogin/index.vue'),
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/user/index.vue'),
            redirect: '/user/certification',
            children:[
                {
                    path: '/user/certification',
                    name: 'certification',
                    component: () => import('@/views/user/certification/index.vue'),
                },
                {
                    path: '/user/order',
                    name: 'order',
                    component: () => import('@/views/user/order/index.vue'),
                },
                {
                    path: '/user/patient',
                    name: 'patient',
                    component: () => import('@/views/user/patient/index.vue'),
                },
                {
                    path: '/user/profile',
                    name: 'profile',
                    component: () => import('@/views/user/profile/index.vue'),
                },
                {
                    path: '/user/feedback',
                    name: 'feedback',
                    component: () => import('@/views/user/feedback/index.vue'),
                },
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ]
})
export default router