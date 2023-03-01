<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
const props = defineProps({
  title: String
})
const router = useRouter()
const toHome = () => {
  router.replace({
    name: 'home'
  })
}
const onClickLeft = () => {
  router.go(-1)
}
</script>
<template>
  <van-nav-bar :title="props.title" left-text="" left-arrow @click-left="onClickLeft">
    <template #right>
      <van-icon name="home-o" size="18" @click="toHome" />
    </template>
  </van-nav-bar>
</template>
<style lang="less" scoped></style>
