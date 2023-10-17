<template>
  <div class="login_container">
    <el-dialog v-model="userStore.showLoginDialog" title="用户登录" width="40%" @open="cleanForm">
      <div class="content">
        <div class="left">
          <div class="phone_login" v-show="switchScene === 0">
            <!-- 表单校验必须form中指定model,rules,每个item也需要设置prop -->
            <el-form :inline="false" size="default" ref="form" :model="loginForm" :rules="checkLoginRules">
              <el-form-item prop="phone">
                <el-input placeholder="请输入手机号码" prefix-icon="User" v-model="loginForm.phone"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input placeholder="请输入手机验证码" prefix-icon="Lock" v-model="loginForm.code"></el-input>
              </el-form-item>
              <el-form-item>
                <!-- 这里需要做一个点击后禁用5s按钮的效果 -->
                <el-button @click="getCode" :disabled="!phoneCheck || waitTime !== 0"><span>获取验证码</span><span
                    v-if="waitTime !== 0">({{ waitTime }})</span></el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%;" :disabled="!loginFormCheck" @click="Login">用户登录</el-button>
              </el-form-item>
            </el-form>
            <div class="switch_login" @click="changeScene(1)">
              <p class="des">微信扫码登录</p>
              <svg t="1694248653205" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4170" width="30" height="30">
                <path
                  d="M571.648 511.94c-10.257 0-20.517 9.525-20.517 21.25 0 9.527 10.255 19.053 20.517 19.053 15.393 0 26.385-9.527 26.385-19.053 0-11.724-10.99-21.25-26.385-21.25zM504.225 413c16.123 0 26.385-10.257 26.385-25.651 0-16.123-10.261-25.649-26.385-25.649-15.39 0-30.048 9.527-30.048 25.649-0.001 15.396 14.659 25.651 30.048 25.651z m8.062-350.508c-248.427 0-449.813 201.386-449.813 449.813 0 248.425 201.386 449.812 449.813 449.812 248.425 0 449.812-201.386 449.812-449.812 0.001-248.427-201.385-449.813-449.812-449.813z m-85.012 563.773c-27.119 0-46.906-4.394-72.556-11.725L280.7 651.92l21.257-63.031c-52.035-36.64-82.818-82.811-82.818-139.243 0-99.67 93.808-175.889 208.137-175.889 101.135 0 191.279 60.097 208.867 145.113-7.328-1.469-13.926-2.199-19.788-2.199-99.67 0-176.619 74.75-176.619 164.894 0 15.388 2.199 29.313 5.863 43.972-5.863 0.728-12.461 0.728-18.324 0.728z m305.607 71.82l14.655 52.77-55.697-31.512c-21.252 4.394-41.773 10.99-63.025 10.99-98.206 0-175.889-67.422-175.889-150.968 0-83.547 77.685-150.97 175.889-150.97 93.072 0 176.619 67.423 176.619 150.97 0 46.9-31.512 88.673-72.552 118.721zM359.117 361.7c-15.39 0-31.512 9.527-31.512 25.649 0 15.395 16.122 25.656 31.512 25.656 14.66 0 26.385-10.261 26.385-25.656 0-16.122-11.725-25.649-26.385-25.649z m327.595 150.24c-10.995 0-20.522 9.525-20.522 21.25 0 9.527 9.527 19.053 20.522 19.053 14.655 0 25.649-9.527 25.649-19.053 0-11.724-10.994-21.25-25.649-21.25z m0 0z"
                  fill="#1afa29" p-id="4171"></path>
              </svg>
            </div>
          </div>
          <div class="chat_login" v-show="switchScene === 1">
            <div id="wx_login"></div>
            <div class="switch_login" @click="changeScene(0)">
              <p class="des">手机短信验证码登录</p>
              <svg t="1694434052241" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="39501" width="30" height="30">
                <path
                  d="M556.420187 718.431559c0-24.452925-19.833721-44.339858-44.313252-44.339858-24.478508 0-44.312228 19.887956-44.312228 44.339858 0 24.451902 19.833721 44.339858 44.312228 44.339858C536.586466 762.771417 556.420187 742.882438 556.420187 718.431559z"
                  fill="#1afa29" p-id="39502"></path>
                <path
                  d="M511.999488 66.861804c-245.853407 0-445.138196 199.258183-445.138196 445.138196s199.284789 445.138196 445.138196 445.138196 445.138196-199.258183 445.138196-445.138196S757.852896 66.861804 511.999488 66.861804zM684.305833 746.577596c0 24.452925-19.887956 44.339858-44.313252 44.339858l-258.323417 0c-24.424272 0-44.313252-19.887956-44.313252-44.339858L337.355913 274.488585c0-24.397666 19.888979-44.285622 44.313252-44.285622l258.323417 0c24.425296 0 44.313252 19.888979 44.313252 44.285622L684.305833 746.577596z"
                  fill="#1afa29" p-id="39503"></path>
                <path
                  d="M639.992581 258.023588l-258.323417 0c-9.101285 0-16.491603 7.390317-16.491603 16.464997l0 381.888663 291.307645 0L656.485207 274.488585C656.484184 265.412882 649.09489 258.023588 639.992581 258.023588z"
                  fill="#1afa29" p-id="39504"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="codes">
            <div class="wechat_login">
              <img src="@/assets/images/code_login_wechat.png">
              <svg t="1694249727584" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4935" width="16" height="16">
                <path
                  d="M867.070366 806.431799c55.782467-43.961234 90.918709-107.727537 90.918709-178.635493 0-132.683928-122.893958-240.247736-274.39751-240.247736-151.503553 0-274.39751 107.563808-274.39751 240.247736 0 132.704394 122.812093 240.267179 274.356578 240.267179 43.838438 0 85.295642-9.010211 122.073266-25.01779l72.693626 40.862663c1.807159 2.771113 4.967128 4.618181 8.497535 4.618181 5.664 0 10.178827-4.577249 10.178827-10.220782 0-2.133593-0.656963-4.145413-1.806135-5.786797l2.052752-3.571339L867.070366 806.431799zM592.097758 581.823252c-22.452361 0-40.636512-18.327414-40.636512-40.903595s18.184151-40.903595 40.636512-40.903595c22.410406 0 40.636512 18.327414 40.636512 40.903595S614.509187 581.823252 592.097758 581.823252zM785.182334 581.823252c-22.452361 0-40.636512-18.327414-40.636512-40.903595s18.184151-40.903595 40.636512-40.903595 40.636512 18.327414 40.636512 40.903595S807.634696 581.823252 785.182334 581.823252z"
                  p-id="4936" fill="#bfbfbf"></path>
                <path
                  d="M383.743406 131.949194c-176.788425 0-320.123948 125.890198-320.123948 281.150308 0 91.165326 49.378617 172.171268 125.973086 223.561705l-30.703279 80.287581c-2.298346 1.888-3.816932 4.740978-3.816932 7.983835 0 5.644557 4.556783 10.220782 10.17985 10.220782 3.28379 0 6.198166-1.559519 8.004301-3.961218l88.661296-57.999972c37.59934 13.586436 78.68713 21.098527 121.868605 21.098527 4.88424 0 9.809413-0.081864 14.653745-0.287549-6.239098-21.138436-9.604752-43.304272-9.604752-66.166979 0-143.992485 131.965567-260.708743 294.716278-260.708743 5.418406 0 10.79588 0.122797 16.131399 0.369414C674.889369 233.929844 542.841937 131.949194 383.743406 131.949194zM266.883885 367.127472c-22.452361 0-40.636512-18.327414-40.636512-40.903595s18.184151-40.903595 40.636512-40.903595c22.452361 0 40.677445 18.327414 40.677445 40.903595S289.336246 367.127472 266.883885 367.127472zM510.824733 367.127472c-22.493294 0-40.677445-18.327414-40.677445-40.903595s18.184151-40.903595 40.677445-40.903595c22.411429 0 40.636512 18.327414 40.636512 40.903595S533.237185 367.127472 510.824733 367.127472z"
                  p-id="4937" fill="#bfbfbf"></path>
              </svg>
              <span>微信扫一扫关注</span>
              <span>'快速预约挂号'</span>
            </div>
            <div class="app_login">
              <img src="@/assets/images/code_app.png">
              <svg t="1694250031452" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="6255" width="16" height="16">
                <path
                  d="M599.765333 51.562667 367.893333 51.562667c-82.048 0-148.778667 64.170667-148.778667 143.04l0 609.92c0 78.869333 66.752 143.04 148.778667 143.04l231.872 0c82.048 0 148.778667-64.170667 148.778667-143.04L748.544 194.581333C748.565333 115.712 681.813333 51.562667 599.765333 51.562667zM707.84 804.522667c0 56.426667-48.490667 102.314667-108.053333 102.314667L367.893333 906.837333c-59.584 0-108.053333-45.888-108.053333-102.314667L259.84 766.933333l448 0L707.84 804.522667zM707.84 732.8l-448 0L259.84 247.829333l448 0L707.84 732.8zM707.84 213.696l-448 0L259.84 194.581333c0-56.405333 48.469333-102.314667 108.053333-102.314667l231.872 0c59.584 0 108.053333 45.888 108.053333 102.314667L707.818667 213.696z"
                  p-id="6256" fill="#bfbfbf"></path>
                <path
                  d="M586.56 133.226667 586.56 133.12 382.506667 133.12l0 0.192c-0.32-0.021333-0.576-0.192-0.896-0.192-11.776 0-21.333333 9.557333-21.333333 21.333333 0 11.776 9.557333 21.333333 21.333333 21.333333 0.32 0 0.576-0.170667 0.896-0.192L382.506667 175.786667l204.032 0L586.538667 175.701333c11.541333-0.277333 20.842667-9.621333 20.842667-21.226667C607.381333 142.848 598.101333 133.504 586.56 133.226667z"
                  p-id="6257" fill="#bfbfbf"></path>
                <path
                  d="M483.84 888c23.530667 0 42.666667-19.136 42.666667-42.666667s-19.136-42.666667-42.666667-42.666667-42.666667 19.136-42.666667 42.666667S460.309333 888 483.84 888zM483.84 817.514667c15.338667 0 27.818667 12.48 27.818667 27.818667s-12.48 27.818667-27.818667 27.818667-27.818667-12.48-27.818667-27.818667S468.501333 817.514667 483.84 817.514667z"
                  p-id="6258" fill="#bfbfbf"></path>
              </svg>
              <span>扫一扫下载</span>
              <span>'预约挂号'APP</span>
            </div>
          </div>
          <div class="des">
            <p>林灏均官方指定平台</p>
            <p>快速挂号 安全放心</p>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">关闭窗口</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/stores/modules/user';
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { watch } from 'vue';
import type { LoginForm, WxLoginResponseData } from '@/api/home/type';
import { reqWxLogin } from '@/api/home';
import { validatorCode, validatorPhone } from '@/utils/validator';
defineOptions({
  name: 'Login',
})
let userStore = useUserStore()
const form = ref<HTMLFormElement>()
// 打开前清空表单以及clearValidate
const cleanForm = () => {
  loginForm.phone = ''
  loginForm.code = ''
  form.value?.clearValidate()
  switchScene.value = 0
}
const handleClose = ()=>{
  userStore.setShowLoginDialog(false)
}
let switchScene = ref<number>(0)
let waitTime = ref<number>(0)
let timer: number
const loginForm = reactive<LoginForm>({
  phone: '',
  code: ''
})
const phoneCheck = computed(() => {
  let reg = /^1[3456789]\d{9}$/
  return reg.test(loginForm.phone)
})
const loginFormCheck = computed(() => {
  let regPhone = /^1[3456789]\d{9}$/
  let regCode = /^\d{6}$/
  return regPhone.test(loginForm.phone) && regCode.test(loginForm.code)
})
const changeScene = async (scene: number) => {
  // scene:1微信登录,scene:0正常登录
  switchScene.value = scene
  if (scene === 1) {
    // 微信登录配置对象,向服务器发请求获取appid等一些必须参数
    // 配置redirectUri,到时候后台服务器会将用户的数据通过query传回这个Uri
    let redirectUri = encodeURIComponent(window.location.origin + '/wxLogin')
    let result: WxLoginResponseData = await reqWxLogin(redirectUri)
    // @ts-ignore
    new WxLogin({
      self_redirect: true,
      id: 'wx_login',
      appid: result.data.appid,
      scope: 'snsapi_login',
      redirect_uri: result.data.redirectUri,
      state: result.data.state,
      style: 'black',
      href: ''
    })
    // 清理一下表单数据以及表单校验
    loginForm.phone = ''
    loginForm.code = ''
    form.value?.clearValidate()
  }
}
const getCode = async () => {
  // 点击按钮要禁用按钮五秒,开启定时器,将时间设置为5
  waitTime.value = 5
  timer = setInterval(() => {
    waitTime.value = waitTime.value - 1
  }, 1000)
  try {
    await userStore.getCode(loginForm.phone)
    ElMessage.success('获取验证码成功')
  } catch {
    ElMessage.error('获取验证码失败')
  }
  loginForm.code = userStore.code
}
const checkLoginRules = {
  phone: [
    { required: true, trigger: 'blur', message: '手机号码不能为空' },
    { trigger: 'blur', validator: validatorPhone },
  ],
  code: [
    { required: true, trigger: 'blur', message: '验证码不能为空' },
    { trigger: 'blur', validator: validatorCode },
  ]
}
// 隐藏自身
const hideDialog = () => {
  userStore.setShowLoginDialog(false)
}
// Login函数
const Login = async () => {
  // 校验表单
  try {
    await form.value?.validate()
  } catch (err) {
    ElMessage.error(err as Error)
  }
  // 发送请求获取name与token
  try {
    await userStore.Login(loginForm)
    ElMessage.success('登录成功')
    // 关闭dialog
    hideDialog()
  } catch {
    ElMessage.error('登录失败')
  }
}
// 监控waitTime如果变为0取消定时器
watch(() => waitTime.value, (newVal: number, oldVal: number) => {
  if (newVal === 0) {
    clearInterval(timer)
  }
})
// 切换微信登录后提醒仓库获取
watch(() => switchScene.value, (newVal: number, oldVal: number) => {
  if (newVal === 1) {
    userStore.refreshLogin()
  }
})
</script>

<style lang="scss" scoped>
.login_container {
  :deep(.el-dialog__body) {
    border-bottom: 1px #ccc solid;
    border-top: 1px #ccc solid;
  }

  .content {
    display: flex;

    .left {
      flex: 1;
      padding: 20px;
      border-radius: 5px;
      border: 1px #ccc solid;

      .switch_login {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;

        .des {
          margin-bottom: 5px;
        }
      }

      .chat_login {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;

        .des {
          margin-bottom: 5px;
        }
      }
    }

    .right {
      flex: 1;
      padding: 0 20px;
      display: flex;
      flex-direction: column;

      .codes {
        display: flex;
        justify-content: space-between;

        .wechat_login,
        .app_login {
          display: flex;
          flex-direction: column;
          align-items: center;

          img {
            height: 120px;
            width: 120px;
          }

          span {
            font-size: 12px;
            color: #7f7f7f;
            margin-top: 5px;
          }
        }
      }

      .des {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 20px;
        font-style: italic;
        font-weight: 900;
        margin-top: 10px;

        p {
          margin-top: 20px;
        }
      }
    }
  }
}</style>