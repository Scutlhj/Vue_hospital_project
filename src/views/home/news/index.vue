<template>
  <div class="news">
    <div class="departments">
      <div class="top">
        <span class="title">
          <el-icon class="title_icon">
            <Location />
          </el-icon>常见科室
        </span>
        <span class="detail">
          全部<el-icon class="detail_icon">
            <ArrowRightBold />
          </el-icon>
        </span>
      </div>
      <ul class="content_list">
        <li class="content_item">神经内科</li>
        <li class="content_item">消化内科</li>
        <li class="content_item">呼吸内科</li>
        <li class="content_item">内科</li>
        <li class="content_item">神经外科</li>
        <li class="content_item">妇科</li>
        <li class="content_item">产科</li>
        <li class="content_item">儿科</li>
      </ul>
    </div>
    <div class="announcement">
      <div class="top">
        <span class="title">
          <el-icon class="title_icon">
            <Notification />
          </el-icon>平台公告
        </span>
        <span class="detail">
          全部<el-icon class="detail_icon">
            <ArrowRightBold />
          </el-icon>
        </span>
      </div>
      <ul class="content_list">
        <li class="content_item">关于延长北京大学国际医院放假的通知</li>
        <li class="content_item">北京中医药大学东方医院部分科室医生门诊医生的调整</li>
        <li class="content_item">武警总医院号源暂停更新的通知</li>
      </ul>
    </div>
    <div class="notice">
      <div class="top">
        <span class="title">
          <el-icon class="title_icon">
            <Bell />
          </el-icon>停诊公告
        </span>
        <span class="detail">
          全部<el-icon class="detail_icon">
            <ArrowRightBold />
          </el-icon>
        </span>
      </div>
      <ul class="content_list">
        <li class="content_item">中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告</li>
        <li class="content_item">首都医科大学附属北京篇河医院老年医学科门诊停诊公告</li>
        <li class="content_item">中日友好医院中西医结合心内科门诊停诊公告</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'News',
})
</script>

<style lang="scss" scoped>
.news {
  color: #7f7f7f;

  .departments {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;

      .title {
        display: flex;
        align-items: center;

        .title_icon {
          color: orangered;
          margin-right: 3px;
        }
      }

      .detail {
        display: flex;
        align-items: center;
        cursor: pointer;

        .detail_icon {
          margin-left: 3px;
        }
      }
    }

    .content_list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;

      .content_item {
        width: 50%;
        margin-bottom: 15px;
      }
    }
  }

  .announcement {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;

      .title {
        display: flex;
        align-items: center;

        .title_icon {
          color: blue;
          margin-right: 3px;
        }
      }

      .detail {
        display: flex;
        align-items: center;
        cursor: pointer;

        .detail_icon {
          margin-left: 3px;
        }
      }
    }

    .content_list {
      display: flex;
      width: 100%;
      flex-direction: column;

      .content_item {
        width: 100%;
        margin-bottom: 20px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .notice {
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;

      .title {
        display: flex;
        align-items: center;

        .title_icon {
          color: orange;
          margin-right: 3px;
        }
      }

      .detail {
        display: flex;
        align-items: center;
        cursor: pointer;

        .detail_icon {
          margin-left: 3px;
        }
      }
    }

    .content_list {
      display: flex;
      width: 100%;
      flex-direction: column;

      .content_item {
        width: 100%;
        margin-bottom: 20px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}</style>