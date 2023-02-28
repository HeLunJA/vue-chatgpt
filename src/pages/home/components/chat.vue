<script setup>
import { ref } from 'vue'
import svgIcon from '@/components/svgIcon.vue'
const showLeft = ref(false)
const changeShowLeft = () => {
  showLeft.value = !showLeft.value
}
</script>
<template>
  <div class="chat-list">
    <div class="item" style="justify-content: flex-end">
      <div class="logo" style="order: 3"></div>
      <div class="content theme" style="order: 2">chat是付费的吗？</div>
      <div class="copy" style="order: 1">
        <img src="@/assets/copy.png" alt="" />
      </div>
    </div>
    <div class="item">
      <div class="logo"></div>
      <div class="content">我爱的是解放军爱</div>
      <div class="copy">
        <img src="@/assets/copy.png" alt="" />
      </div>
    </div>
  </div>
  <div class="footer">
    <svg-icon size="30px" name="cd" @click="changeShowLeft" />
    <van-field placeholder="你想和我聊点什么？" />
    <div class="send">
      <svg-icon size="18px" name="send" />
    </div>
  </div>
  <van-popup v-model:show="showLeft" position="left" :style="{ width: '60%', height: '100%', background: '#2F2F39' }">
    <div class="popup">
      <div class="add-btn">
        <span class="icon">+</span>
        <span class="text">开启新对话</span>
      </div>
      <div class="popup-item">
        <span>"人工智能"的探索之旅</span>
        <img src="@/assets/rg.png" alt="" />
      </div>
      <div class="popup-item">
        <span>"人工智能"的探索之旅</span>
        <img src="@/assets/rg.png" alt="" />
      </div></div
  ></van-popup>
</template>
<style lang="less" scoped>
.theme {
  background-color: @theme-color !important;
  color: #fff !important;
}
.chat-list {
  padding: 10px;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .logo {
      flex: 0 0 50px;
      height: 50px;
      background-color: @theme-color;
      border-radius: 50%;
      align-self: flex-start;
    }
    .content {
      background-color: #f6f7fb;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 8px;
      font-size: 14px;
      line-height: 1.5;
      margin: 0 4px;
    }
    .copy {
      flex: 0 0 30px;
      height: 30px;
      background-color: #ecf5fe;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        height: 15px;
        width: 15px;
      }
    }
  }
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #f5f5f5;
  .send {
    flex: 0 0 30px;
    background-color: @theme-color;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .input-box {
    background-color: #f5f5f5;
    border-radius: 12px;
    flex: 1;
    margin: 0 12px;
    height: 30px;
    display: flex;
    align-items: center;
    & > input {
      border: 0px !important;
      width: 100%;
    }
  }
}
.pla {
  background-color: #f5f5f5;
  font-size: 12px !important;
}
::v-deep(.van-cell) {
  background-color: #f5f5f5;
  border-radius: 12px;
  height: 36px;
  display: flex;
  align-items: center;
  line-height: normal;
  margin: 0 12px;
}
.popup {
  padding: 0 20px;
  box-sizing: border-box;
}
.add-btn {
  margin-top: 60px;
  margin-bottom: 40px;
  width: 100%;
  height: 40px;
  border: 1px solid #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  & > text {
    margin-left: 10px;
  }
  & > .icon {
    margin-right: 10px;
    font-size: 28px;
  }
}
.popup-item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  border-bottom: 1px solid #999;
  font-size: 14px;
  & > img {
    width: 18px;
    height: 18px;
  }
}
</style>
