import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import { reqGetCodeByPhone, reqPostLogin } from '@/api/home'
import type { CodeResponseData, LoginData, LoginForm, LoginResponseData } from '@/api/home/type'
import { DELETE_USERDATA, GET_USERDATA, SET_USERDATA } from '@/utils/userdata'
const useUserStore = defineStore('User', {
    state: ():UserState => {
        return {
            showLoginDialog:false,
            code:'',
            // 读取localStorage的数据
            userData:GET_USERDATA()||{}
        }
    },
    actions: {
        setShowLoginDialog(show:boolean){
            this.showLoginDialog = show
        },
        async getCode(phone:string):Promise<string>{
            let result:CodeResponseData = await reqGetCodeByPhone(phone)
            if(result.code===200){
                this.code = result.data
                return Promise.resolve('ok')
            }
            else{
                return Promise.reject('no')
            }
        },
        async Login(loginForm:LoginForm):Promise<string>{
            let result:LoginResponseData = await reqPostLogin(loginForm)
            if(result.code===200){
                this.userData = result.data
                // localStorage.setItem('userData',JSON.stringify(result.data))
                SET_USERDATA(result.data)
                return Promise.resolve('ok')
            }
            else{
                console.log(result)
                return Promise.reject('no')
            }
        },
        refreshLogin(){
            // 轮询获取localStorage
            let timer = setInterval(()=>{
                // 获取为null
                if(GET_USERDATA()){
                    this.showLoginDialog = false
                    this.userData = GET_USERDATA()
                    clearInterval(timer)
                }else{
                    console.log('尚未获取到数据哦!')
                }
            },1500)
        },
        logout(){
            this.userData = {} as LoginData
            this.code = ''
            DELETE_USERDATA()
        }
    },
    getters:{
        hasLogin():boolean{
            return this.userData.hasOwnProperty('name')&&this.userData.hasOwnProperty('token')
        }
    }
})
export default useUserStore