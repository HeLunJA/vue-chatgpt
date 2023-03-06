<script setup>
import navBar from '@/components/navBar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleTg = (path) => {
  router.push({
    path
  })
}
</script>
<template>
  <navBar title="关于我们" />
  <div class="body">
    <div class="box">
      <img class="logo" src="@/assets/version.png" alt="" />
    </div>
  </div>
  <div class="footer">
    <div @click="handleTg('/shopAgr')">服务使用协议</div>
    <div class="border"></div>
    <div @click="handleTg('/ys')">隐私协议</div>
  </div>
  <div class="foot">Copyright AI魔盒</div>
</template>
<style lang="less" scoped>
.box {
  margin-top: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    width: 180px;
    height: 170px;
  }
  .title {
    font-weight: bold;
    margin-top: 20px;
  }
  .btn {
    border-radius: 22px;
    border: 1px solid #333;
    padding: 6px 12px;
    margin-top: 12px;
  }
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 58px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  .border {
    width: 1px;
    height: 18px;
    background-color: #333;
    margin: 0 12px;
  }
}
.foot {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
