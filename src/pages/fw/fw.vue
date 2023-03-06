<script setup>
import navBar from '@/components/navBar.vue'
</script>
<template>
  <navBar title="服务使用协议" />
  <iframe
    src="/static/fw.html"
    ref="iframe"
    style="transform-origin: left top; transform: scale(0.535, 0.525)"
    scrolling="no"
  ></iframe>
</template>
<style lang="less" scoped>
iframe {
  width: 750px;
  height: 1334px;
}
</style>
