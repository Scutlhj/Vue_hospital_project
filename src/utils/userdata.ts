import type { LoginData } from "@/api/home/type"
// 封装本地存储的方法
export const SET_USERDATA = (userData: LoginData) => {
    localStorage.setItem('userData', JSON.stringify(userData))
  }
  export const GET_USERDATA = ():LoginData => {
    return JSON.parse(localStorage.getItem('userData') as string)
  }
  export const DELETE_USERDATA = () => {
    localStorage.removeItem('userData')
  }