<script setup>
import tabBar from '@/components/tabBar.vue'
import { ref } from 'vue'
const tabList = ref([
  { value: 1, label: '智能聊天GPT', url: '' },
  { value: 1, label: '健康助手', url: '' },
  { value: 1, label: '翻译助手', url: '' },
  { value: 1, label: '恋爱聊天', url: '' },
  { value: 1, label: '编程代码', url: '' },
  { value: 1, label: '作文助手', url: '' }
])
</script>
<template>
  <div class="body">
    <div class="title">我是您贴心的UI助理</div>
    <div class="text">回答您所有的问题，快选择一个角色和我聊天吧！</div>
    <div class="items">
      <div class="item" v-for="item in tabList" :key="item.value">
        <div class="img-box">
          <img :src="item.url" alt="" />
        </div>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
  <tab-bar />
</template>
<style lang="less" scoped>
.body {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 30px;
  }
  .text {
    font-size: 14px;
    color: #999;
  }
  .items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      margin-top: 30px;
      width: 33%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .img-box {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: @theme-color;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      & > span {
        font-size: 14px;
        color: @theme-color;
        margin-top: 10px;
      }
    }
  }
}
</style>
