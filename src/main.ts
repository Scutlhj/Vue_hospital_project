import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
//引入清除默认样式
import '@/styles/reset.scss'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
import HospitalTop from '@/components/HospitalTop/index.vue'
import HospitalBottom from '@/components/HospitalBottom/index.vue'
import Login from '@/components/Login/index.vue'
import router from './router';
import '@/router/permission'

const app = createApp(App)
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login',Login)
app.use(ElementPlus, {
    locale: zhCn
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia())
app.use(router)

app.mount('#app')
