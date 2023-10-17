<template>
  <div class="renotice">
    <div class="title">{{ hospitalStore.hospitalDetail.hospital?.hosname }}预约挂号须知</div>
    <div class="contents">
      <div class="content_boxs">
        <p class="box_des">为方便您早日就医康复，请您认真阅读预约挂号须知:</p>
      </div>
      <div class="content_boxs">
        <p class="box_title">一、预约实名制:</p>
        <p class="box_des">统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号(身份证、护照)、性别、手机号码、社保卡号等基本信息。</p>
      </div>
      <div class="content_boxs">
        <p class="box_title">二、预约挂号:</p>
        <p class="box_des">按照北京市卫健委统一平台要求，预约挂号规则如下:</p>
        <p class="box_des">在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源;</p>
        <p class="box_des">在同一自然周，同一就诊人，可以预约最多8个号源;</p>
        <p class="box_des">在同一自然月，同一就诊人，可以预约最多12个号源;</p>
        <p class="box_des">在同一自然季度，同一就诊人，可以预约最多24个号源。</p>
      </div>
      <div class="content_boxs">
        <p class="box_title">三、取消预约:</p>
        <p class="box_des">已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。</p>
      </div>
      <div class="content_boxs">
        <p class="box_title">四、爽约处理:</p>
        <p class="box_des">如预约成功后患者未能按时就诊目不办理取消预约号视为爽约，同一患者在然年内爽约规则如下:</p>
        <p class="box_des">累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号;</p>
        <p class="box_des">累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。</p>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import useHospitalStore from '@/stores/modules/hospital';
defineOptions({
  name: 'RenoticeView',
})
let hospitalStore = useHospitalStore()
</script>
  
<style lang="scss" scoped>
.renotice{
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  .title{
    display: flex;
    justify-content: center;
    font-size: 25px;
    font-weight: 900;
  }
  .contents{
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    .content_boxs{
      margin-top: 20px;
      color: #7f7f7f;
      font-size: 14px;
      .box_title{
        color: black;
        margin-bottom: 15px;
      }
      .box_des{
        line-height: 25px;
      }
    }
  }
}
</style>