<script setup>
import tabBar from '@/components/tabBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { robotTypes } from './data'
import { useGlobalStore } from '@/store/global'
const globalStore = useGlobalStore()
const router = useRouter()
const tabList = ref(robotTypes)
const activeIndex = ref(globalStore.defChatTypeIndex)
const changeIndex = (index) => {
  activeIndex.value = index
  globalStore.updatePreTypeIndex(globalStore.defChatTypeIndex)
  globalStore.updateTypeIndex(index)
  globalStore.updateModeType(robotTypes[index].value)
  router.replace({
    name: 'home'
  })
}


</script>
<template>
  <div class="body">
    <div class="title">我是您贴心的AI助理</div>
    <div class="text">回答您所有的问题，快选择一个角色和我聊天吧！</div>
    <div class="items">
      <div class="item" v-for="(item, index) in tabList" :key="item.value" @click="changeIndex(index)">
        <div class="tag" v-if="activeIndex == index">使用中</div>
        <div class="img-box">
          <img :src='item.url' alt="" class="rightulliimg"/>
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
      position: relative;
      .tag {
        position: absolute;
        right: -10px;
        top: -10px;
        color: #fff;
        font-size: 12px;
        padding: 4px 8px;
        background-color: red;
        border-radius: 10px 0 10px 0;
      }
      .img-box {
        width: 78px;
        height: 78px;
        border-radius: 50%;
        background-color: @theme-color;
        display: flex;
        align-items: center;
        justify-content: center;
        .rightulliimg {
            max-width: 100%;
            max-height: 200px;
          }
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
