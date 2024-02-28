<template>
  <div class="orderdetail">
    <el-card class="detail_card">
      <template #header>
        <div class="header">
          <span>挂号详情</span>
          <el-button type="primary" @click="goBack">返回</el-button>
        </div>
      </template>
      <div class="status">
        <el-tag class="tag" :type="orderDetail.orderStatus === 1 ? `success` : `info`">
          <el-icon class="icon" v-if="orderDetail.orderStatus === -1">
            <CloseBold />
          </el-icon>
          <el-icon class="icon" v-if="orderDetail.orderStatus === 0">
            <AlarmClock />
          </el-icon>
          <el-icon class="icon" v-if="orderDetail.orderStatus === 1">
            <Select />
          </el-icon>
          {{ orderDetail.param?.orderStatusString }}
        </el-tag>
        <div class="advertise">
          <img src="@/assets/images/code_login_wechat.png" alt="114公众号">
          <div class="adcontent">
            <p>微信关注"114预约挂号"</p>
            <p><svg t="1694686463831" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="4089" width="12" height="12">
                <path
                  d="M1010.8 628c0-141.2-141.3-256.2-299.9-256.2-168 0-300.3 115.1-300.3 256.2 0 141.4 132.3 256.2 300.3 256.2 35.2 0 70.7-8.9 106-17.7l96.8 53-26.6-88.2c70.9-53.2 123.7-123.7 123.7-203.3zM618 588.8c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40c0 22-17.9 40-40 40z m194.3-0.3c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
                  fill="#00C800" p-id="4090"></path>
                <path
                  d="M366.3 106.9c-194.1 0-353.1 132.3-353.1 300.3 0 97 52.9 176.6 141.3 238.4l-35.3 106.2 123.4-61.9c44.2 8.7 79.6 17.7 123.7 17.7 11.1 0 22.1-0.5 33-1.4-6.9-23.6-10.9-48.3-10.9-74 0-154.3 132.5-279.5 300.2-279.5 11.5 0 22.8 0.8 34 2.1C692 212.6 539.9 106.9 366.3 106.9zM247.7 349.2c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z m246.6 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
                  fill="#00C800" p-id="4091"></path>
              </svg>"快速预约挂号"</p>
          </div>
        </div>
      </div>
      <div class="des">
        <div class="leftinfo">
          <el-descriptions class="margin-top" :column="1" size="small" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊人信息
                </div>
              </template>
              <span>{{ orderDetail.patientName }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊日期
                </div>
              </template>
              <span>{{ orderDetail.reserveDate }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊医院
                </div>
              </template>
              <span>{{ orderDetail.hosname }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊科室
                </div>
              </template>
              <span>{{ orderDetail.depname }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  医生职称
                </div>
              </template>
              <span>{{ orderDetail.title }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  医师服务费
                </div>
              </template>
              <span>{{ orderDetail.amount }}元</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂号单号
                </div>
              </template>
              <span>{{ orderDetail.outTradeNo }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂号时间
                </div>
              </template>
              <span>{{ orderDetail.createTime }}</span>
            </el-descriptions-item>
          </el-descriptions>
          <div class="btns">
            <el-button class="cancel" v-if="orderDetail.orderStatus === 0 || orderDetail.orderStatus === 1" @click="confirmCancel">取消预约</el-button>
            <el-button type="primary" class="pay" v-if="orderDetail.orderStatus === 0" @click="payOrder">支付</el-button>
          </div>
        </div>
        <div class="righttips">
          <el-card class="tips_card">
            <template #header>
              <div class="header">
                <span>注意事项</span>
              </div>
            </template>
            <div class="content">
              <p>1.请确认就诊人信息是否准确,若填写措误将无法取号就诊,损失由本人承担;</p>
              <p class="important">2.【取号】就诊当天需在{{ orderDetail.fetchTime }}在医院取号,未取号视为爽约,该号不退不换;</p>
              <p class="important">3.【退号】在{{ orderDetail.quitTime }}前可在线退号,逾期将不可办理退号退费;</p>
              <p>4.北京114预约挂号支持自费患者使用身份证预约,同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日,携带预约挂号所使用的有效身份证件到院取号;</p>
              <p>5.请注意北京市医保患者在住院期问不能使用社保卡在门诊取号。</p>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="dialogVisible" title="微信支付" width="25%">
    <div class="paybox">
      <img :src="payQRCodeImgUrl">
      <p>请使用微信扫一扫</p>
      <p>扫描二维码支付</p>
    </div>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reqGetCancelOrder, reqGetOrderById, reqGetOrderStatus, reqGetQRCode } from '@/api/user';
import type { OrderDetailResponseData, OrderStatusResponseData, PayInfoResponseData } from '@/api/user/type';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// @ts-ignore
import QRCode from 'qrcode'
defineOptions({
  name: 'OrderDetail',
})
let dialogVisible = ref<boolean>(false)
let payQRCodeImgUrl = ref<string>('')
let $route = useRoute()
let $router = useRouter()
let timer: number
let orderDetail = ref<any>({})
const getOrderDetail = async () => {
  let result: OrderDetailResponseData = await reqGetOrderById($route.query.id as unknown as number)
  if (result.code === 200) {
    orderDetail.value = result.data
    ElMessage.success('获取订单信息成功')
  } else {
    ElMessage.error('获取订单信息失败')
  }
}
const cancelOrder = async () => {
  let result = await reqGetCancelOrder($route.query.id as unknown as number)
  if (result.code === 200) {
    ElMessage.success('取消订单成功')
    getOrderDetail()
  } else {
    ElMessage.error('取消订单失败')
  }
}
const confirmCancel = () => {
  ElMessageBox.confirm(
    '确认取消订单?',
    '确认操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      cancelOrder()
    })
    .catch(() => {
      ElMessage.info('取消操作')
    })
}
const payOrder = async () => {
  dialogVisible.value = true
  let result: PayInfoResponseData = await reqGetQRCode($route.query.id as unknown as number)
  if (result.code === 200) {
    ElMessage.success('获取微信支付二维码成功')
    payQRCodeImgUrl.value = await QRCode.toDataURL(result.data.codeUrl)
  } else {
    ElMessage.error('获取微信支付二维码失败')
  }
}
const goBack = ()=>{
  $router.push({
    path:'/user/order'
  })
}
watch(() => dialogVisible.value, (newVal, oldVal) => {
  if (newVal) {
    timer = setInterval(async () => {
      let result: OrderStatusResponseData = await reqGetOrderStatus($route.query.id as unknown as number)
      console.log('等待支付')
      if (result.data) {
        ElMessage.success('支付成功')
        dialogVisible.value = false
        getOrderDetail()
      }
    }, 1000)
  } else {
    clearInterval(timer)
  }
})
onMounted(() => {
  getOrderDetail()
})
</script>

<style lang="scss" scoped>
.paybox {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 200px;
    width: 200px;
  }

  p {
    margin-top: 15px;
  }
}

.orderdetail {
  margin-top: 50px;
  margin-left: 20px;

  .important {
    color: red;
  }

  .detail_card {
    .header {
      span {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 900;
      }

      display: flex;
      justify-content: space-between;
    }

    .status {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #7f7f7f;
      padding-bottom: 15px;

      .tag {
        .icon {
          vertical-align: top;
          cursor: auto;
        }
      }

      .advertise {
        display: flex;

        img {
          height: 40px;
          width: 40px;
          margin-right: 15px;
        }

        .adcontent {
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }

    .des {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .leftinfo {
        width: 42%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .btns {
          .cancel {
            margin-right: 8px;
          }
        }
      }

      .righttips {
        width: 55%;

        .tips_card {
          .header {
            font-size: 16px
          }

          .content {
            font-size: 14px;
            line-height: 26px;
          }
        }
      }
    }
  }
}</style>