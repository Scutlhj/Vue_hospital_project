interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface HospitalData {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        hostypeString: string,
        fullAddress: string
    },
    hoscode: string,
    hosname: string,
    hostype: string,
    provinceCode: string,
    cityCode: string,
    districtCode: string,
    address: string,
    logoData: string,
    intro: string,
    route: string,
    status: number,
    bookingRule: {
        cycle: number,
        releaseTime: string,
        stopTime: string,
        quitDay: number,
        quitTime: string,
        rule: string[]
    }
}
export interface HospitalResponseData extends ResponseData {
    data: {
        content: HospitalData[],
        totalElements: number,
    }
}
export interface DictData {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: Object,
    parentId: number,
    name: string,
    value: string,
    dictCode: string | null,
    hasChildren: boolean
}
export interface DictResponseData extends ResponseData {
    data: DictData[]
}

export interface SearchResponseData extends ResponseData {
    data: HospitalData[]
}
export interface CodeResponseData extends ResponseData {
    data: string
}

export interface LoginForm {
    phone:string,
    code:string
}
export interface LoginData{
    name:string,
    token:string
}
export interface LoginResponseData extends ResponseData{
    data:LoginData
}

export interface WxLoginData{
    redirectUri: string,
    appid: string,
    scope: string,
    state: string
}

export interface WxLoginResponseData extends ResponseData{
    data:WxLoginData
}