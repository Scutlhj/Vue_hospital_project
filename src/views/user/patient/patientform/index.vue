<template>
    <el-form ref="form" :inline="false" size="default" label-width="250px" class="patientform" :model="patientForm"
        :rules="checkRules">
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form-item label="用户姓名" prop="name">
            <el-input placeholder="请你输入用户姓名" v-model="patientForm.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="certificatesType">
            <el-select placeholder="请你选择证件的类型" v-model="patientForm.certificatesType">
                <el-option v-for="(item, index) in certInfo" :key="item.id" :label="item.name"
                    :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificatesNo">
            <el-input placeholder="请你输入证件号码" v-model="patientForm.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="用户性别" prop="sex">
            <el-radio-group v-model="patientForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthdate">
            <el-date-picker type="date" placeholder="请你选择日期" size="default" value-format="YYYY-MM-DD"
                v-model="patientForm.birthdate" :editable="false" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <el-input placeholder="请你输入手机号码" v-model="patientForm.phone"></el-input>
        </el-form-item>
        <el-divider content-position="left">建档信息(完善后部分医院首次就诊不排队建档)</el-divider>
        <el-form-item label="婚姻状况" prop="isMarry">
            <el-radio-group v-model="patientForm.isMarry">
                <el-radio :label="1">已婚</el-radio>
                <el-radio :label="0">未婚</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保" prop="isInsure">
            <el-radio-group v-model="patientForm.isInsure">
                <el-radio :label="1">医保</el-radio>
                <el-radio :label="0">自费</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="所在地区" prop="addressSelected">
            <el-cascader :props="props" v-model="patientForm.addressSelected" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
            <el-input placeholder="请你输入用户详细地址" v-model="patientForm.address"></el-input>
        </el-form-item>
        <el-divider content-position="left">联系人信息 (选填)</el-divider>
        <el-form-item label="用户姓名">
            <el-input placeholder="请你输入用户姓名" v-model="patientForm.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
            <el-select placeholder="请你选择证件的类型" v-model="patientForm.contactsCertificatesType">
                <el-option v-for="(item, index) in certInfo" :key="item.id" :label="item.name"
                    :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
            <el-input placeholder="请你输入证件号码" v-model="patientForm.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
            <el-input placeholder="请你输入手机号码" v-model="patientForm.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="submit">提交</el-button>
            <el-button size="default" @click="reset">重写</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reqAddOrUpdatePatient, reqGetCerType, reqGetCityData, reqGetPatientById } from '@/api/user'
import type { DictData, DictResponseData, PatientFormData } from '@/api/user/type';
import { validatorName, validatorPhone, validatorType } from '@/utils/validator';
import { ElMessage, type CascaderProps } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
defineOptions({
    name: 'PatientForm',
})
const prop = defineProps(['selectid'])
const emit = defineEmits(['goBack'])
let certInfo = ref<DictData[]>([])
let form = ref()
let patientForm = reactive<PatientFormData>({
    name: '',
    certificatesType: '',
    certificatesNo: '',
    sex: '',
    birthdate: '',
    phone: '',
    isMarry: '',
    isInsure: '',
    addressSelected: [],
    address: '',
    contactsName: '',
    contactsCertificatesType: '',
    contactsCertificatesNo: '',
    contactsPhone: '',
    provinceCode: '',
    cityCode: '',
    districtCode: ''
})
const validatorNo = (rule: any, value: any, callback: any) => {
    if (patientForm.certificatesType === '') {
        callback(new Error('请先输入证件类型'))
    } else if (patientForm.certificatesType === '10') {
        // 身份证校验
        let regNo = /^([1-9]\d{5})(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (regNo.test(value)) {
            callback()
        } else {
            callback(new Error('请输入正确的身份证号码!'))
        }
    } else if (patientForm.certificatesType === '20') {
        let regNo = /^\d{9}$/
        if (regNo.test(value)) {
            callback()
        } else {
            callback(new Error('请输入正确的9位户号'))
        }
    }
}
const checkRules = {
    name: [
        {
            required: true, trigger: 'blur', message: '姓名不能为空!'
        },
        {
            trigger: 'blur', validator: validatorName
        },
    ],
    certificatesType: [
        {
            required: true, message: '请选择证件类型!'
        },
        {
            trigger: 'change', validator: validatorType
        },
    ],
    certificatesNo: [
        {
            required: true, trigger: 'blur', message: '证件号码不能为空!'
        },
        {
            trigger: 'blur', validator: validatorNo
        }
    ],
    sex: [
        {
            required: true, message: '请选择用户性别!'
        }
    ],
    birthdate: [
        {
            required: true, message: '请选择出生日期!'
        }
    ],
    phone: [
        {
            required: true, trigger: 'blur', message: '电话号码不能为空!'
        },
        {
            trigger: 'blur', validator: validatorPhone
        }
    ],
    isMarry: [
        {
            required: true, message: '请选择婚姻状况!'
        }
    ],
    isInsure: [
        {
            required: true, message: '请选择自费或医保!'
        }
    ],
    addressSelected: [
        {
            required: true, message: '请选择所在地区!'
        }
    ],
    address: [
        {
            required: true, trigger: 'blur', message: '详细地址不能为空!'
        }
    ],
}
const getCertType = async () => {
    let result: DictResponseData = await reqGetCerType()
    if (result.code === 200) {
        certInfo.value = result.data
    } else {
        ElMessage.error('获取证件类型失败')
    }
}
const props: CascaderProps = {
    lazy: true,
    async lazyLoad(node, resolve) {
        // node:当前选中的节点,resolve:node下的数据
        let result = await reqGetCityData(node.data!.id as string || '86')
        if (result.code === 200) {
            resolve(result.data.map((item) => {
                return {
                    id: item.id,
                    label: item.name,
                    value: item.value,
                    leaf: !item.hasChildren
                }
            }))
        }
    },
}
const submit = async () => {
    try {
        await form.value.validate()
    } catch {
        ElMessage.error('表单校验未通过!')
        return
    }
    patientForm.provinceCode = patientForm.addressSelected[0]
    patientForm.cityCode = patientForm.addressSelected[1]
    patientForm.districtCode = patientForm.addressSelected[2]
    let result = await reqAddOrUpdatePatient(patientForm)
    if (result.code === 200) {
        if (prop.selectid === -1) {
            ElMessage.success('添加成功')
        }else{
            ElMessage.success('修改成功')
        }
    } else {
        if (prop.selectid === -1) {
            ElMessage.success('添加失败')
        }else{
            ElMessage.success('修改失败')
        }
    }
    emit('goBack')
}
const reset = () => {
    Object.assign(patientForm, {
        name: '',
        certificatesNo: '',
        sex: '',
        birthdate: '',
        phone: '',
        addressSelected: [],
        address: '',
        provinceCode: '',
        cityCode: '',
        districtCode: ''
    })
    form.value.clearValidate()
}
onMounted(async () => {
    getCertType()
    if (prop.selectid !== -1) {
        let result = await reqGetPatientById(prop.selectid)
        if (result.code === 200) {
            Object.assign(patientForm, {
                id: result.data.id,
                name: result.data.name,
                certificatesType: result.data.certificatesType,
                certificatesNo: result.data.certificatesNo,
                sex: result.data.sex,
                birthdate: result.data.birthdate,
                phone: result.data.phone,
                isMarry: result.data.isMarry,
                isInsure: result.data.isInsure,
                addressSelected: [result.data.provinceCode, result.data.cityCode, result.data.districtCode],
                address: result.data.address,
                contactsName: result.data.contactsName,
                contactsCertificatesType: result.data.contactsCertificatesType,
                contactsCertificatesNo: result.data.contactsCertificatesNo,
                contactsPhone: result.data.contactsPhone,
                provinceCode: result.data.provinceCode,
                cityCode: result.data.cityCode,
                districtCode: result.data.districtCode
            })
        } else {
            ElMessage.error('获取就诊人信息失败!')
        }
    }
})
</script>

<style lang="scss" scoped>
.patientform {
    :deep(.el-input) {
        width: 300px;
    }

    :deep(.el-form-item) {
        margin-bottom: 20px;
    }

    :deep(.el-divider) {
        margin: 35px 0;
    }

    :deep(.el-divider:nth-child(1)) {
        margin-top: 15px;
    }
}
</style>