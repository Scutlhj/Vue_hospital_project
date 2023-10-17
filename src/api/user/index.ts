import request from "@/utils/request";
import type { OrderDetailResponseData, OrderResponseData, PayInfoResponseData, OrderStatusResponseData, UserInfoResponseData, DictResponseData, CertificatesFormData, OrderPagerResponseData, StatusResponseData, PatientFormData, OnePatientResponseData } from "./type";
enum API {
    // 生成订单的接口(目前这个文件的接口用不了)
    POSTORDER_URL = '/order/orderInfo/auth/submitOrder/',
    // 根据id获取订单
    GETORDERBYID_URL = '/order/orderInfo/auth/getOrderInfo/',
    // 取消订单
    GETCANCELORDER_URL = '/order/orderInfo/auth/cancelOrder/',
    // 生成二维码
    GETQRCODE_URL = '/order/weixin/createNative/',
    // 查询订单支付状态
    GETORDERSTATUS_URL = '/order/weixin/queryPayStatus/',
    // 查询用户信息
    GETUSERINFO_URL = '/user/auth/getUserInfo',
    // 获取数据字典
    GETCERTIFICATETYPE_URL = '/cmn/dict/findByDictCode/',
    // 实名认证接口
    POSTCERTIFICATE_URL = '/user/auth/userAuah',
    // 获取订单分页
    GETORDERPAGER_URL = '/order/orderInfo/auth/',
    // 获取订单状态列表
    GETORDERSTATULIST_URL = '/order/orderInfo/auth/getStatusList',
    // 获取省市数据
    GETCITY_URL = '/cmn/dict/findByParentId/',
    // 新增就诊人
    POSTPATIENT_URL = '/user/patient/auth/save',
    // 修改就诊人
    PUTPATIENT_URL = '/user/patient/auth/update',
    // 根据id获取某一个就诊人数据
    GETPATIENTBYID_URL = '/user/patient/auth/get/',
    // 删除就诊人
    DELETEPATIENT_URL = '/user/patient/auth/remove/'
}
export const reqPostOrder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, OrderResponseData>(API.POSTORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)
export const reqGetOrderById = (orderId: number) => request.get<any, OrderDetailResponseData>(API.GETORDERBYID_URL + `${orderId}`)
// 成功data为true,失败为null
export const reqGetCancelOrder = (orderId: number) => request.get<any, any>(API.GETCANCELORDER_URL + `${orderId}`)
export const reqGetQRCode = (orderId: number) => request.get<any, PayInfoResponseData>(API.GETQRCODE_URL + `${orderId}`)
export const reqGetOrderStatus = (orderId: number) => request.get<any, OrderStatusResponseData>(API.GETORDERSTATUS_URL + `${orderId}`)
export const reqGetUserInfo = () => request.get<any, UserInfoResponseData>(API.GETUSERINFO_URL)
export const reqGetCerType = (dictCode = 'CertificatesType') => request.get<any, DictResponseData>(API.GETCERTIFICATETYPE_URL + `${dictCode}`)
export const reqPostCertificate = (certificatesForm: CertificatesFormData) => request.post<any, any>(API.POSTCERTIFICATE_URL, certificatesForm)
export const reqGetOrderPager = (page: number, limit: number, patientId: string, orderStatus: string) => request.get<any, OrderPagerResponseData>(API.GETORDERPAGER_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
export const reqGetOrderStatusList = () => request.get<any, StatusResponseData>(API.GETORDERSTATULIST_URL)
export const reqGetCityData = (parentId:string)=>request.get<any,DictResponseData>(API.GETCITY_URL+`${parentId}`)
export const reqGetPatientById = (id:string)=> request.get<any,OnePatientResponseData>(API.GETPATIENTBYID_URL+`${id}`)
export const reqDeletePatient = (id:string) => request.delete<any,any>(API.DELETEPATIENT_URL+`${id}`)
export const reqAddOrUpdatePatient = (data:PatientFormData)=>{
    if(data.id){
        return request.put<any,any>(API.PUTPATIENT_URL,data)
    }else{
        return request.post<any,any>(API.POSTPATIENT_URL,data)
    }
}