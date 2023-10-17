import type { LoginData } from "@/api/home/type";
import type { DepartmentData, HospitalDetailData } from "@/api/hospital/type";
export interface HospitalState{
    hospitalDetail:HospitalDetailData,
    hospitalDepartments: DepartmentData[],
}
export interface UserState{
    showLoginDialog:boolean,
    code:string,
    userData:LoginData
}