<template>
  <div class="card_item">
    <div class="card_header">
      <div class="left_desc">
        <el-tag class="tag">
          <span v-if="item.isInsure === 1">医保</span>
          <span v-if="item.isInsure === 0">自费</span>
        </el-tag>
        <span class="name">{{ item.name }}</span>
      </div>
      <!-- 防止冒泡 -->
      <div class="btns">
        <el-button type="primary" icon="Edit" circle class="right_btn" @click="editPatient"/>
        <el-button type="danger" icon="Delete" circle class="right_btn" @click="removePatient"/>
      </div>
    </div>
    <div class="card_content">
      <ul class="infolist">
        <li><span class="info_title">证件类型:</span><span class="info_value">{{ item.param.certificatesTypeString }}</span>
        </li>
        <li><span class="info_title">证件号码:</span><span class="info_value">{{ item.certificatesNo }}</span></li>
        <li><span class="info_title">用户性别:</span><span class="info_value" v-text="item.sex === 0 ? '女' : '男'"></span></li>
        <li><span class="info_title">出生日期:</span><span class="info_value">{{ item.birthdate }}</span></li>
        <li><span class="info_title">手机号码:</span><span class="info_value">{{ item.phone }}</span></li>
        <li><span class="info_title">婚姻状况:</span><span class="info_value" v-text="item.isMarry === 0 ? '未婚' : '已婚'"></span></li>
        <li><span class="info_title">当前住址:</span><span class="info_value">{{ item.param.provinceString }}{{
          item.param.cityString }}{{ item.param.districtString }}</span></li>
        <li><span class="info_title">详细地址:</span><span class="info_value">{{ item.param.fullAddress }}</span></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PatientData } from '@/api/hospital/type'
defineOptions({
  name: 'PatientCardItem',
})
const emit = defineEmits(['edit','remove'])
const props = defineProps({
  item: {
    type: Object as () => PatientData,
    required: true
  }
})
const editPatient = ()=>{
  emit('edit',props.item.id)
}
const removePatient = ()=>{
  emit('remove',props.item.id)
}
</script>

<style lang="scss" scoped>
.card_item {
  width: 100%;
  box-shadow: 0 0 5px grey;
  border-radius: 5px;
  margin-bottom: 15px;
  overflow: hidden;

  .card_header {
    background-color: #ccc;
    padding: 15px;
    display: flex;
    justify-content: space-between;

    .left_desc {
      display: flex;
      align-items: center;

      .tag {
        background-color: white;
        color: #000;
        margin-right: 8px;
      }

      .name {
        color: #7f7f7f;
        font-size: 15px;
      }
    }
  }

  .card_content {
    padding: 10px 15px;
    font-size: 12px;

    .infolist {
      display: flex;
      flex-direction: column;

      li {
        height: 16px;
        margin: 10px 0;

        .info_title {
          // font-weight: 900;
          margin-right: 8px;
          line-height: 16px;
        }

        .info_value {
          line-height: 16px;
        }
      }
    }
  }
}</style>