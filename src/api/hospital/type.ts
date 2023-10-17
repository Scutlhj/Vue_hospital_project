interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface HospitalDetailData {
    bookingRule: {
        cycle: number,
        releaseTime: string,
        stopTime: string,
        quitDay: number,
        quitTime: string,
        rule: string[]
    },
    hospital: {
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
        route: string
        status: number,
        bookingRule: null
    }
}
export interface HospitalDetailResponseData extends ResponseData {
    data: HospitalDetailData
}

export interface DepartmentData {
    depcode: string,
    depname: string,
    children: DepartmentData[] | null
}
export interface DepartmentResponseData extends ResponseData {
    data: DepartmentData[]
}

export interface BookingScheduleData {
    // 当前日期
    workDate: string,
    // 格式化日期
    workDateMd: string,
    // 星期几
    dayOfWeek: string,
    // 未知数据
    docCount: number,
    // 总号数
    reservedNumber: number,
    // 可用号数
    availableNumber: number,
    // -1停止挂号,0可挂号,1即将放号
    status: number
}
export interface BaseMap {
    // 当前年月
    workDateString: string,
    // 放号时间
    releaseTime: string,
    // 专科名称
    bigname: string,
    // 停号时间
    stopTime: string,
    // 细分科名称
    depname: string,
    // 医院名称
    hosname: string
}
export interface RegisterPagerResponseData extends ResponseData {
    data: {
        total: number,
        bookingScheduleList: BookingScheduleData[],
        baseMap: BaseMap
    }
}
export interface DoctorData {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        dayOfWeek: string,
        depname: string,
        hosname: string
    },
    hoscode: string,
    depcode: string,
    title: string,
    docname: string,
    skill: string,
    workDate: string,
    // 0上午 1下午
    workTime: number,
    reservedNumber: number,
    availableNumber: number,
    amount: number,
    status: number,
    hosScheduleId: string
}
export interface AllDoctorsResponseData extends ResponseData {
    data: DoctorData[]
}
export interface DoctorResponseData extends ResponseData {
    data: DoctorData
}
export interface PatientData {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        certificatesTypeString: string,
        contactsCertificatesTypeString: null,
        cityString: string,
        fullAddress: string,
        districtString: string,
        provinceString: string
    },
    userId: number,
    name: string,
    certificatesType: string,
    certificatesNo: string,
    sex: number,
    birthdate: string,
    phone: string,
    isMarry: number,
    provinceCode: string,
    cityCode: string,
    districtCode: string,
    address: string,
    isInsure: number,
    cardNo: null,
    status: string
}
export interface PatientResponseData extends ResponseData {
    data: PatientData[]
}