import request from "@/utils/request";
import type { DepartmentResponseData, HospitalDetailResponseData, RegisterPagerResponseData, AllDoctorsResponseData, PatientResponseData, DoctorResponseData } from "./type";
enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    // 根据医院code获取科室
    GETDEPARTMENT_URL = '/hosp/hospital/department/',
    // 获取医院某科室的挂号数据
    GETREGISTERPAGER_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    // 获取某天某医院某科室的排班数据
    GETALLDOCTORDATA_URL = '/hosp/hospital/auth/findScheduleList/',
    // 获取所有就诊人
    GETALLPATIENT_URL = '/user/patient/auth/findAll',
    // 获取医生根据id信息
    GETDOCTORDATABYID_URL = '/hosp/hospital/getSchedule/'
}
export const reqGetHospitalDetail = (hoscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITALDETAIL_URL + `${hoscode}`)
export const reqGetDepartment = (hoscode: string) => request.get<any, DepartmentResponseData>(API.GETDEPARTMENT_URL + `${hoscode}`)
export const reqGetRegisterPager = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, RegisterPagerResponseData>(API.GETREGISTERPAGER_URL + `${page}/${limit}/${hoscode}/${depcode}`)
export const reqGetAllDoctors = (hoscode: string, depcode: string, workDate: string) => request.get<any, AllDoctorsResponseData>(API.GETALLDOCTORDATA_URL + `${hoscode}/${depcode}/${workDate}`)
export const reqGetAllPatient = () => request.get<any, PatientResponseData>(API.GETALLPATIENT_URL)
export const reqGetDoctorById = (scheduleId:string) => request.get<any,DoctorResponseData>(API.GETDOCTORDATABYID_URL+`${scheduleId}`)