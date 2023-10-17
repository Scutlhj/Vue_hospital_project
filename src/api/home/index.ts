import request from "@/utils/request";
import type { HospitalResponseData, DictResponseData, SearchResponseData, CodeResponseData, LoginForm, LoginResponseData, WxLoginResponseData } from './type'
enum API {
    // 获取分页数据
    GETPAGER_URL = '/hosp/hospital/',
    // 获取地区和等级数据
    GETLEVELORREGION_URL = '/cmn/dict/findByDictCode/',
    // 根据关键字查找相应医院
    GETHOSBYNAME_URL = '/hosp/hospital/findByHosname/',
    // 登录获取验证码
    GETCODE_URL = '/sms/send/',
    // 登录接口
    LOGIN_URL = '/user/login',
    // 获取微信登录参数
    WXLOGIN_URL = '/user/weixin/getLoginParam'
}
export const reqGetPagers = (page: number, limit: number, hostype = '', districtCode = '') => request.get<any, HospitalResponseData>(API.GETPAGER_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
export const reqGetLevelOrRegion = (dictCode: string) => request.get<any, DictResponseData>(API.GETLEVELORREGION_URL + `${dictCode}`)
export const reqGetHospitalByName = (hosname: string) => request.get<any, SearchResponseData>(API.GETHOSBYNAME_URL + `${hosname}`)
export const reqGetCodeByPhone = (phone: string) => request.get<any, CodeResponseData>(API.GETCODE_URL + `${phone}`)
export const reqPostLogin = (loginForm: LoginForm) => request.post<any, LoginResponseData>(API.LOGIN_URL, loginForm)
export const reqWxLogin = (wxRedirectUri:string) => request.get<any,WxLoginResponseData>(API.WXLOGIN_URL+`?wxRedirectUri=${wxRedirectUri}`)