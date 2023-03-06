<script setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
import { showToast, showLoadingToast } from 'vant'
import svgIcon from '@/components/svgIcon.vue'
import { shuffle } from '@/utils/utils'
const emits = defineEmits(['change', 'exchange'])
const props = defineProps({
  questions: Array
})
const showBottom = ref(false)
const hotList = computed(() => props.questions)
const hots = computed(() => shuffle(hotList.value)?.slice(0, 3))
const clickItem = (value) => {
  emits('change', value)
  showBottom.value = false
}
const exchange = () => {
  if (hotList.value.length < 4) return showToast('暂无更多关键词')
  emits('exchange')
}
</script>
<template>
  <div class="header flex-center-between">
    <div class="lf-box flex-center">
      <svg-icon size="20px" name="hot" />
      <span>热门提问</span>
    </div>
    <div class="rg-box flex-center" @click="exchange">
      <span>换一批</span>
      <div style="color: red">
        <svg-icon size="12px" name="sx" color="red" />
      </div>
    </div>
  </div>
  <div class="context">
    <div class="item line" v-for="item in hots" :key="item" @click="clickItem(item.question)">
      {{ item.question }}
    </div>
  </div>
  <div v-if="props.questions.length" class="all" @click="showBottom = true">
    <div class="border"></div>
    <span>查看更多></span>
    <div class="border"></div>
  </div>
  <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '60%' }">
    <div class="body">
      <div class="title">热门提问</div>
      <div class="hots">
        <div class="hot line" v-for="(item, index) in props.questions" :key="index" @click="clickItem(item.question)">
          {{ item.question }}
        </div>
      </div>
    </div>
  </van-popup>
</template>
<style lang="less" scoped>
.line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    font-weight: bold;
    margin: 20px 0;
  }
  .hots {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 320px;
    .hot {
      width: 320px;
      padding: 8px;
      float: left;
      text-align: flex-start;
      background-color: #f5f5f5;
      font-size: 12px;
      margin-bottom: 8px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: nowrap;
      word-break: break-all;
    }
  }
}
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
