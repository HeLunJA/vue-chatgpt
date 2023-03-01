<script setup>
import syIcon from '@/assets/sy-icon.png'
import syActive from '@/assets/sy-active.png'
import jqrActive from '@/assets/jqr-active.png'
import jqrIcon from '@/assets/jqr-icon.png'
import userActive from '@/assets/user-active.png'
import userIcon from '@/assets/user-icon.png'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useGlobalStore } from '@/store/global'
const router = useRouter()
const globalStore = useGlobalStore()
const active = ref(globalStore.tabIndex)
const tabOptions = ref([
  { label: '首页', icon: syIcon, selectIcon: syActive, name: 'home' },
  { label: '机器人', icon: jqrIcon, selectIcon: jqrActive, name: 'robot' },
  { label: '我的', icon: userIcon, selectIcon: userActive, name: 'user' }
])
const clickTab = (index) => {
  globalStore.updateTabIndex(index)
  const name = tabOptions.value[index].name
  router.replace({
    name
  })
}
</script>
<template>
  <van-tabbar v-model="active">
    <van-tabbar-item v-for="(item, index) in tabOptions" :icon="item.icon" :key="index" @click="clickTab(index)">
      <span>{{ item.label }}</span>
      <template #icon="props">
        <img :src="props.active ? item.selectIcon : item.icon" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<style lang="less" scoped></style>
