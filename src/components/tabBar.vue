<script setup>
import syIcon from '@/assets/sy-icon.png'
import syActive from '@/assets/sy-active.png'
import jqrActive from '@/assets/jqr-active.png'
import jqrIcon from '@/assets/jqr-icon.png'
import userActive from '@/assets/user-active.png'
import userIcon from '@/assets/user-icon.png'
import { useRouter,useRoute } from 'vue-router'
import { ref,watch } from 'vue'
import { useGlobalStore } from '@/store/global'
const router = useRouter()
const route = useRoute()
const globalStore = useGlobalStore()
const active = ref(globalStore.tabIndex)
const tabOptions = ref([
  { label: '首页', icon: syIcon, selectIcon: syActive, name: 'home' },
  { label: 'AI魔盒', icon: jqrIcon, selectIcon: jqrActive, name: 'robot' },
  { label: '我的', icon: userIcon, selectIcon: userActive, name: 'user' }
])
const clickTab = (index) => {
  globalStore.updateTabIndex(index)
  const name = tabOptions.value[index].name
  globalStore.defPreChatTypeIndex = globalStore.defChatTypeIndex
  router.replace({
    name
  })
}
watch(
  route,
  (data) => {
    const name = data.name
    let index
    if (name === 'home') {
      index = 0
    }
    if (name === 'robot') {
      index = 1
    }
    if (name === 'user') {
      index = 2
    }
    globalStore.updateTabIndex(index)
    
	active.value = index
  },
  { immediate: true }
)
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
