<script setup>
import { ref } from 'vue'
import navBar from '@/components/navBar.vue'
const afterRead = (file) => {}
const isActive = ref(0)
const changeActive = (num) => {
  isActive.value = num
}
</script>
<template>
  <div class="body">
    <navBar title="申请提现" />
    <div class="header-bgc">
      <div class="withdraw">
        <div class="cell">
          <div class="label">可提现金额:</div>
          <div class="money">¥0.00</div>
        </div>
        <div class="cell mt">
          <div class="label">可提现金额:</div>
          <van-field type="number" placeholder="请输入提现金额" />
        </div>
        <div class="flex-end">
          <div class="btn">全部提现</div>
        </div>
      </div>
    </div>
    <div class="remark">最低提现金额100元</div>
    <div class="handle-box">
      <div class="item-box">
        <div :class="{ item: true, active: isActive == 0 }" @click="changeActive(0)">微信</div>
        <div :class="{ item: true, active: isActive == 1 }" @click="changeActive(1)">支付宝</div>
      </div>
      <div class="title">收款二维码</div>
      <van-uploader :after-read="afterRead" />
      <div class="input">
        <van-field type="number" placeholder="请输入姓名" />
      </div>
      <div class="input">
        <van-field type="number" placeholder="请输入联系电话" />
      </div>
      <div class="btn">立即提现</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
::v-deep(.van-cell) {
  width: 150px;
  padding: 0;
}
.body {
  min-height: 100vh;
  background: #f5f5f5;
}
.mt {
  margin-top: 20px;
}
.header-bgc {
  height: 90px;
  background: #5080fa9a;
  position: relative;
  .withdraw {
    position: absolute;
    left: 30px;
    right: 30px;
    top: 60px;
    box-shadow: 0vw 0vw 1vw #dac1c182;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    .cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      .money {
        color: @theme-color;
      }
      ::v-deep(.van-field__control) {
        text-align: right;
      }
    }
    .flex-end {
      margin-top: 6px;
      display: flex;
      justify-content: end;
      .btn {
        background: @theme-color;
        font-size: 12px;
        padding: 4px 12px;
        color: #fff;
        border-radius: 4px;
      }
    }
  }
}
.remark {
  margin-top: 90px;
  text-align: right;
  font-size: 14px;
  color: #999;
  padding-right: 30px;
}
.handle-box {
  position: relative;
  font-size: 14px;
  margin-top: 10px;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
  .item-box {
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #999;
    .active {
      position: relative;
      color: #333;
    }
    .active::before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -10px;
      height: 4px;
      width: 24px;
      border-radius: 4px;
      background: @theme-color;
    }
  }
  .input {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
    margin-top: 8px;
  }
  .title {
    margin: 15px 0;
  }
  .btn {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    line-height: 6px;
    background-color: @theme-color;
    width: 300px;
    height: 36px;
    border-radius: 30px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    margin-top: 18px;
  }
}
</style>
