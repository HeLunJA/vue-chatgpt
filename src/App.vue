<script setup>
import { isMobile } from '@/utils/utils'
let isIframe = false
if (!isMobile()) {
  isIframe = true
}
</script>

<template>
  <div v-if="!isIframe">
    <router-view />
  </div>
  <div v-else class="iframe-box">
    <div class="pc-body" style="width: 450px">
      <iframe
        src="http://ai.jxzw.cn/"
        ref="iframe"
        style="width: 100%; height: 98vh; border: 0px; background: #fff"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.iframe-box {
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pc-body {
  min-height: 100vh;
  margin: auto;
  border-left: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
}
</style>
