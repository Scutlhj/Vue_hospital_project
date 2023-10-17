interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface OrderResponseData extends ResponseData {
    // OrderId为number
    data: number
}

export interface OrderDetailData {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": -1
}
export interface OrderDetailResponseData extends ResponseData {
    data: OrderDetailData
}

// 请求微信扫码接口返回的数据
export interface PayInfo {
    "codeUrl": string,
    "orderId": number,
    "totalFee": number,
    "resultCode": string
}
export interface PayInfoResponseData extends ResponseData {
    data: PayInfo
}
export interface OrderStatusResponseData extends ResponseData {
    data: boolean
}
export interface UserInfo {
    "id": number
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {}
    "openid": null
    "nickName": null,
    "phone": string,
    "name": string,
    "certificatesType": string,
    "certificatesNo": string;
    "certificatesUrl": null,
    "authStatus": number
    "status": number
}
export interface UserInfoResponseData extends ResponseData {
    data: UserInfo
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
export interface CertificatesFormData {
    "certificatesNo": string,
    "certificatesType": string,
    "certificatesUrl": string,
    "name": string
}
export interface OrderPagerData {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": null,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}
export interface OrderPagerResponseData extends ResponseData {
    data: {
        records: OrderPagerData[]
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "hitCount": boolean,
        "searchCount": boolean,
        "pages": number
    }
}
export interface StatusData {
    "comment": string,
    "status": number
}
export interface StatusResponseData extends ResponseData {
    data: StatusData[]
}

export interface PatientFormData {
    id?: string,
    name: string,
    certificatesType: string,
    certificatesNo: string,
    sex: number | string,
    birthdate: string,
    phone: string,
    isMarry: number | string,
    isInsure: number | string,
    addressSelected: string[],
    address: string,
    contactsName: string,
    contactsCertificatesType: string,
    contactsCertificatesNo: string,
    contactsPhone: string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
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
    "contactsName": string,
    "contactsCertificatesType": string,
    "contactsCertificatesNo": string,
    "contactsPhone": string,
    status: string
}
export interface OnePatientResponseData extends ResponseData {
    data: PatientData
}