<template>
  <div class="certification">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <span class="cer_title">实名信息</span>
      </template>
      <div class="cer_body">
        <span class="tips"><el-icon>
            <Warning />
          </el-icon>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span>
        <el-descriptions :column="1" size="small" border v-show="userInfo.authStatus === 1">
          <el-descriptions-item width="0px" label-align="center">
            <template #label>
              <div class="cell-item">
                用户ID
              </div>
            </template>
            {{ userInfo.id }}
          </el-descriptions-item>
          <el-descriptions-item width="0px" label-align="center">
            <template #label>
              <div class="cell-item">
                用户姓名
              </div>
            </template>
            {{ userInfo.name }}
          </el-descriptions-item>
          <el-descriptions-item width="0px" label-align="center">
            <template #label>
              <div class="cell-item">
                证件类型
              </div>
            </template>
            {{ userInfo.certificatesType === "10" ? '身份证' : '户口本' }}
          </el-descriptions-item>
          <el-descriptions-item width="0px" label-align="center">
            <template #label>
              <div class="cell-item">
                证件号码
              </div>
            </template>
            {{ userInfo.certificatesNo }}
          </el-descriptions-item>
          <el-descriptions-item width="0px" label-align="center">
            <template #label>
              <div class="cell-item">
                手机号码
              </div>
            </template>
            {{ userInfo.phone }}
          </el-descriptions-item>
        </el-descriptions>
        <el-form ref="form" label-width="80px" :inline="false" size="default" class="form" :model="certForm"
          :rules="checkRules" v-show="userInfo.authStatus === 0">
          <el-form-item label="用户姓名" prop="name">
            <el-input placeholder="请输入用户姓名" v-model="certForm.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificatesType">
            <el-select placeholder="请选择证件类型" style="width: 100%;" v-model="certForm.certificatesType">
              <el-option v-for="item of certInfo" :key="item.id" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificatesNo">
            <el-input placeholder="请输入证件号码" v-model="certForm.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="证件照片" prop="certificatesUrl">
            <el-upload action="/api/oss/file/fileUpload?fileHost=userAuah" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :limit="1" :on-exceed="handleExceed"
              :on-success="handleSuccess" ref="elupload" :before-upload="beforeAvatarUpload">
              <img src="@/assets/images/auth_example.png" style="width: 100%; height: 100%; border-radius: 6px;" />
            </el-upload>
            <el-dialog v-model="dialogVisible" title="照片预览" width="30%">
              <img w-full :src="certForm.certificatesUrl" style="width: 100%; height: 100%;" />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" @click="submit">提交</el-button>
            <el-button size="default" @click="reset">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>

<script lang="ts" setup>
import type { CertificatesFormData, DictData } from '@/api/user/type';
import { reqGetCerType, reqGetUserInfo, reqPostCertificate } from '@/api/user';
import type { DictResponseData, UserInfo, UserInfoResponseData } from '@/api/user/type';
import { ElMessage, type UploadProps } from 'element-plus';
import { ref, onBeforeMount } from 'vue';
import { validatorName, validatorType } from '@/utils/validator';
defineOptions({
  name: 'CertificationView',
})
let certInfo = ref<DictData[]>([])
let elupload = ref()
let form = ref()
let userInfo = ref<UserInfo>({
  id: 0,
  createTime: '',
  updateTime: '',
  isDeleted: 0,
  param: {},
  openid: null,
  nickName: null,
  phone: '',
  name: '',
  certificatesType: '',
  certificatesNo: '',
  certificatesUrl: null,
  authStatus: 0,
  status: 0
})
let dialogVisible = ref<boolean>(false)
let certForm = ref<CertificatesFormData>({
  certificatesNo: '',
  certificatesType: '',
  certificatesUrl: '',
  name: ''
})
const validatorNo = (rule: any, value: any, callback: any) => {
  if (certForm.value.certificatesType === '') {
    callback(new Error('请先输入证件类型'))
  } else if (certForm.value.certificatesType === '10') {
    // 身份证校验
    let regNo = /^([1-9]\d{5})(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (regNo.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的身份证号码!'))
    }
  } else if (certForm.value.certificatesType === '20') {
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
      required: true, trigger: 'blur', message: '姓名不能为空'
    },
    {
      trigger: 'blur', validator: validatorName
    }
  ],
  certificatesType: [
    {
      required: true, trigger: 'blur', message: '证件类型不能为空'
    },
    {
      trigger: 'change', validator: validatorType
    }
  ],
  certificatesNo: [
    {
      required: true, trigger: 'blur', message: '证件号码不能为空'
    },
    {
      trigger: 'blur', validator: validatorNo
    }
  ],
  certificatesUrl: [
    {
      required: true, message: '请上传证件照片'
    },
  ],
}
const getUserInfo = async () => {
  let result: UserInfoResponseData = await reqGetUserInfo()
  if (result.code === 200) {
    ElMessage.success('获取用户信息成功')
    userInfo.value = result.data
  } else {
    ElMessage.error('获取用户信息失败')
  }
}
const getCerType = async () => {
  let result: DictResponseData = await reqGetCerType()
  if (result.code === 200) {
    certInfo.value = result.data
  } else {
    ElMessage.error('获取数据字典信息失败')
  }
}
// 上传图片前的校验,防止其传其他文件或者过大的文件
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('上传格式必须为jpg、png或gif!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文件大小不可超过2MB!')
    return false
  }
  return true
}
const handleExceed: UploadProps['onExceed'] = () => {
  ElMessage.error('最多上传一张图片')
}
const handlePictureCardPreview: UploadProps['onPreview'] = (file) => {
  dialogVisible.value = true
}
const handleRemove: UploadProps['onRemove'] = (file, fileList) => {
  certForm.value.certificatesUrl = ''
}
const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  certForm.value.certificatesUrl = response.data
  form.value.clearValidate(['certificatesUrl'])
}
const reset = () => {
  Object.assign(certForm.value, {
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
  })
  elupload.value.clearFiles()
  form.value.clearValidate()
}
const submit = async () => {
  try {
    await form.value.validate()
  } catch {
    ElMessage.error('表单校验未通过!')
    return
  }
  let result = await reqPostCertificate(certForm.value)
  if (result.code === 200) {
    ElMessage.success('实名认证成功')
    getUserInfo()
  } else {
    ElMessage.error('实名认证失败')
  }
}
onBeforeMount(() => {
  getUserInfo()
  getCerType()
})
</script>

<style lang="scss" scoped>
.certification {
  margin-top: 50px;
  margin-left: 20px;

  .cer_title {
    font-size: 18px;
    font-weight: 900;
  }

  .cer_body {
    .tips {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      font-size: 12px;
      color: #7f7f7f;
    }

    .form {
      width: 60%;
      margin: 0 auto;
    }
  }
}
</style>