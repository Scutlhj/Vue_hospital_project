// 二次封装axios
import axios from "axios";
import { ElMessage } from 'element-plus'
import { GET_USERDATA } from "./userdata";
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 设置超时时间
    timeout: 2000,
})
// 添加请求拦截可以携带公共参数
request.interceptors.request.use((config) => {
    const userData = GET_USERDATA()
    if(userData){
        config.headers.token = userData.token
    }
    return config
})
// 配置响应拦截器
request.interceptors.response.use(
    (response) => {
        // 成功回调
        return response.data
    },
    (error) => {
        // 失败回调
        let message = ''
        const status = error.response.status
        switch (status) {
            case 401:
                message = 'TOKEN过期'
                break
            case 403:
                message = '无权访问'
                break
            case 404:
                message = '请求地址错误'
                break
            case 500:
                message = '服务器出现问题'
                break
            default:
                message = '网络出现问题'
                break
        }
        ElMessage({
            type: 'error',
            message,
        })
        // 返回一个promise失败对象
        return Promise.reject(error)
    },
)
export default request