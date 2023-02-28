<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useGlobalStore } from '@/store/global'
const router = useRouter()
const globalStore = useGlobalStore()
const active = ref(globalStore.tabIndex)
const tabOptions = ref([
  { label: '首页', icon: 'search', path: '/' }
  // { label: '机器人', icon: 'search', path: '/robot' },
  // { label: '我的', icon: 'search', path: '/user' }
])
const clickTab = (index) => {
  globalStore.updateTabIndex(index)
  const path = tabOptions.value[index].path
  router.push({
    path
  })
}
</script>
<template>
  <van-tabbar v-model="active">
    <van-tabbar-item v-for="(item, index) in tabOptions" :icon="item.icon" :key="index" @click="clickTab(index)">{{
      item.label
    }}</van-tabbar-item>
  </van-tabbar>
</template>
<style lang="less" scoped></style>
