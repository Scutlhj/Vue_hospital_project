// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqGetDepartment, reqGetHospitalDetail } from '@/api/hospital'
import type { DepartmentData, DepartmentResponseData, HospitalDetailData, HospitalDetailResponseData } from '@/api/hospital/type'
import type { HospitalState } from './types/type'
const useHospitalStore = defineStore('Hospital', {
    state: (): HospitalState => {
        return {
            hospitalDetail: {} as HospitalDetailData,
            hospitalDepartments: [] as DepartmentData[]
        }
    },
    actions: {
        async getHospitalDetail(hoscode: string) {
            let result: HospitalDetailResponseData = await reqGetHospitalDetail(hoscode)
            if (result.code === 200) {
                this.hospitalDetail = result.data
            }
        },
        async getHospitalDepartments(hoscode: string){
            let result:DepartmentResponseData = await reqGetDepartment(hoscode)
            if(result.code===200){
                this.hospitalDepartments = result.data
            }
        }
    }
})
export default useHospitalStore