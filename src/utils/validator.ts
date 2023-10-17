export const validatorPhone = (rule: any, value: any, callback: any) => {
    const reg = /^1[3456789]\d{9}$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('手机号码格式错误'))
    }
}
export const validatorCode = (rule: any, value: any, callback: any) => {
    const reg = /^\d{6}$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('验证码格式错误'))
    }
}
export const validatorName = (rule: any, value: any, callback: any) => {
    const regName = /^[\u4e00-\u9fa5]{2,4}$/
    if (regName.test(value)) {
        callback()
    } else {
        callback(new Error('请输入中文姓名!'))
    }
}
export const validatorType = (rule: any, value: any, callback: any) => {
    const valueArr = ['10', '20']
    if (valueArr.indexOf(value) !== -1) {
        callback()
    } else {
        callback(new Error('请选择正确的证件类型!'))
    }
}