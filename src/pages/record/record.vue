<script setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
import navBar from '@/components/navBar.vue'
import { useGlobalStore } from '@/store/global'
import { instance } from '@/service'
import { useRouter } from 'vue-router'
const globalStore = useGlobalStore()
const router = useRouter()
const records = ref([])
instance.get(`/wechat/getUserAgentInfo?openid=${globalStore.openid}`).then((res) => {
  records.value = res.data
  console.log('records data:' + records.value.balance + ' ' + records.value.invitemoney + ' ' + records.value.invitenum)
})
const applyHandle = () => {
  router.push({
    name: 'withdraw'
  })
}
</script>
<template>
  <navBar title="推广记录" />
  <div class="body">
    <div class="mas"></div>
    <div class="content">
      <div class="tabs">
        <div class="tab">
          <div class="text">佣金总计</div>
          <div class="num">{{ records.invitemoney }}</div>
        </div>
        <div class="tab">
          <div class="text">可提现余额</div>
          <div class="num">{{ records.balance }}</div>
        </div>
        <div class="tab">
          <div class="text">直接佣金</div>
          <div class="num">0</div>
        </div>
        <div class="tab">
          <div class="text">间接佣金</div>
          <div class="num">0</div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="header">
        <div class="item">佣金记录（{{ records.invitenum }}人）</div>
        <div class="border"></div>
        <div class="item" style="color: #999">浏览记录</div>
      </div>
      <div class="box">
        <div class="flex">
          <div>昵称</div>
          <div>金额</div>
        </div>
      </div>
      <div class="btn" @click="applyHandle">提现申请</div>
      <div class="text">暂无更多</div>
      <div class="foot-text">不足100元无法提现，请继续努力</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.body {
  position: relative;
  .mas {
    position: absolute;
    left: 0;
    right: 0;
    height: 240px;
  }
  .content {
    position: absolute;
    top: 40px;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 11111;
    padding: 0 10px;
    box-sizing: border-box;
    .tabs {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 16px;
        margin-top: 50px;
        .text {
          font-size: 12px;
          color: #527eb0;
          margin-bottom: 12px;
        }
      }
    }
  }
  .list {
    position: absolute;
    left: 20px;
    right: 20px;
    top: 120px;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px 12px;
    box-shadow: 0vw 0vw 1vw #dac1c182;
    min-height: 220px;
    .foot-text {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      bottom: -60px;
      font-size: 18px;
      color: #999;
    }
    .text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
      font-size: 12px;
      color: #999;
    }
    .btn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 40px;
      width: 80px;
      height: 24px;
      border-radius: 12px;
      background-color: red;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
      color: #fff;
      background-image: linear-gradient(to bottom, #5376ea, #70aced);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 16px;
      .item {
        flex: 1;
        text-align: center;
      }
    }
    .border {
      height: 24px;
      width: 1px;
      background-color: #f5f5f5;
    }
    .box {
      margin-top: 20px;
      .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
