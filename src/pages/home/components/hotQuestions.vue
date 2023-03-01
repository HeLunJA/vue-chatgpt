<script setup>
import { ref, defineEmits } from 'vue'
import svgIcon from '@/components/svgIcon.vue'
const emits = defineEmits(['change'])
const hots = ref([
  '有男朋友遇到更好的男生怎么办？',
  '男朋友不想和我结婚也不分手是什么心态？',
  '怎样看出一个海王对你动了真心？'
])
const clickItem = (value) => {
  emits('change', value)
}
</script>
<template>
  <div class="header flex-center-between">
    <div class="lf-box flex-center">
      <svg-icon size="20px" name="hot" />
      <span>热门提问</span>
    </div>
    <div class="rg-box flex-center">
      <span>换一批</span>
      <div style="color: red">
        <svg-icon size="12px" name="sx" color="red" />
      </div>
    </div>
  </div>
  <div class="context">
    <div class="item" v-for="item in hots" :key="item" @click="clickItem(item)">{{ item }}</div>
  </div>
  <div class="all">
    <div class="border"></div>
    <span>查看更多></span>
    <div class="border"></div>
  </div>
</template>
<style lang="less" scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-center-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header {
  padding: 10px;
  .lf-box {
    & > span {
      font-weight: bold;
    }
  }
  .rg-box {
    font-size: 12px;
    color: #999;
    & > span {
      margin-right: 4px;
    }
  }
}
.context {
  padding: 10px;
  font-size: 14px;
  .item {
    background-color: #f6f7fb;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 6px;
    width: 100%;
    color: @theme-color;
  }
}
.all {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #d0c2c2;
  width: 100%;
  .border {
    width: 80px;
    height: 1px;
    background-color: #f5f5f5;
  }
  & > span {
    margin: 0 16px;
  }
}
</style>
