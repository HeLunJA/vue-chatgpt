<script setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import html2canvas from 'html2canvas'
import { showToast, showLoadingToast } from 'vant'
import { useGlobalStore } from '@/store/global'
import { instance } from '@/service'
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import tabBar from '@/components/tabBar.vue'
const globalStore = useGlobalStore()
const isVipFlag = computed(() => globalStore.apiKey)
const router = useRouter()
const czModel = ref(false)
const gzhModel = ref(false)
const dlModel = ref(false)
const tgModel = ref(false)
const codeText = `http://ai.jxzw.cn?share_id=${globalStore.openid}`
const kmKey = ref('')
const handleClick = () => {
  czModel.value = true
}
const jump = () => {
  window.open('https://work.weixin.qq.com/kfid/kfc18ff070853b73981', '_self')
}
const handleDh = () => {
  if (!kmKey.value) {
    showToast('请输入正确的兑换码，不正确或者不正规的是无法使用服务的')
    return
  }
  showToast('兑换成功')
  localStorage.setItem('chat-key', kmKey.value)
  globalStore.updateKey(kmKey.value)
  setTimeout(() => {
    czModel.value = false
    kmKey.value = ''
  }, 500)
}
const handleTo = (path) => {
  router.push({
    path
  })
}
if (!globalStore.coupons?.length) {
  instance.get('/buyer/order/getProducts').then((res) => {
    globalStore.updateCoupons(res.data)
  })
}
const erweima = ref('')
const shareImg = ref('')
const qrCode = ref()
const openShare = () => {
  showLoadingToast({
    message: '生成中请稍候...',
    forbidClick: true
  })
  tgModel.value = true
  nextTick(() => {
    let node = document.getElementById('mycanvas')
    erweima.value = qrCode.value.$el.src
    nextTick(() => {
      html2canvas(node, {
        width: node.offsetWidth,
        height: node.offsetHeight,
        useCORS: true,
        allowTaint: true
      }).then((canvas) => {
        let url = canvas.toDataURL('image/png')
        shareImg.value = url
        //showToast('生成成功')
      })
    })
  })
}
</script>
<template>
  <vue-qr ref="qrCode" class="vue-qr" :text="codeText" :logoScale="40" :size="190" :margin="10" />
  <div id="er-img"></div>
  <div v-if="tgModel" class="km-popup">
    <div class="mas" @click="tgModel = false"></div>
    <div class="bgCode" id="mycanvas">
      <img style="width: 100%; height: 100%" src="@/assets/share_bgc.png" alt="" />
      <img class="erm" :src="erweima" alt="" />
    </div>
    <img class="share-img" v-if="shareImg" :src="shareImg" alt="" />
  </div>
  <div v-if="dlModel" class="km-popup">
    <div class="mas" @click="dlModel = false"></div>
    <img class="dlpng" src="@/assets/dl.png" alt="" />
  </div>
  <div v-if="czModel" class="km-popup">
    <div class="mas" @click="czModel = false"></div>
    <div class="km-box">
      <div class="title">卡密兑换</div>
      <div class="input-box">
        <van-field v-model="kmKey" placeholder="请输入或粘贴有效的卡密兑换" />
      </div>
      <div class="btns">
        <div class="btn-text" @click="czModel = false">取消</div>
        <div class="btn-text2" @click="handleDh">兑换</div>
      </div>
    </div>
  </div>
  <div v-if="gzhModel" class="gzh-popup">
    <div class="mas" @click="gzhModel = false"></div>
    <div class="gzh-box">
      <div class="title">长按二维码关注公众号</div>
      <div class="title">体验最强智能聊天机器人</div>
      <img src="@/assets/code.png" alt="" />
      <div class="text">长按二维码识别关注公众号</div>
      <div class="text">或保存相册，用微信扫一扫从相册自动识别</div>
    </div>
  </div>
  <div class="body">
    <div class="user-info" v-if="isVipFlag">
      <div class="cover">
        <img src="@/assets/bot.png" alt="" />
      </div>
      <div class="title">
        <span>微信用户</span>
        <img src="@/assets/VIP.png" alt="" />
      </div>
    </div>
    <div :class="{ kt: true, 'kt-h': isVipFlag ? false : true }">
      <div class="header">
        <div class="center">
          <div class="vip">开通VIP</div>
          <span>丨</span>
          <span>畅享无限对话</span>
        </div>
        <div class="btn" @click="handleTo('/coupon')">立即开通</div>
      </div>
      <div class="foot" @click="openShare">
        <div class="lf-box">
          <img class="logo" src="@/assets/tghb.png" alt="" />
          <div class="name-title">推广海报</div>
        </div>
        <div class="text">
          <span>推荐会员充值得30%佣金</span>
          <img src="@/assets/rt2.png" alt="" />
        </div>
      </div>
    </div>
    <div class="items">
      <div class="item" style="margin-top: 0">
        <div class="lf-box">
          <img src="@/assets/kmdh.png" alt="" />
          <div class="name-title">卡密兑换</div>
        </div>
        <div class="rg-box" @click="handleClick">
          <div class="btn2">兑换</div>
          <img src="@/assets/rt2.png" alt="" />
        </div>
      </div>
      <div class="item" @click="gzhModel = true">
        <div class="lf-box">
          <img src="@/assets/gzh.png" alt="" />
          <div class="title title2">关注公众号防走丢</div>
        </div>
        <div class="rg-box">
          <div class="btn2">去关注</div>
          <img src="@/assets/rt2.png" alt="" />
        </div>
      </div>
      <div class="item" @click="handleTo('/help')">
        <div class="lf-box">
          <img src="@/assets/jc.png" alt="" />
          <div class="name-title">使用教程</div>
        </div>
        <div class="rg-box">
          <img src="@/assets/rt2.png" alt="" />
        </div>
      </div>
      <div class="item" @click="dlModel = true">
        <div class="lf-box">
          <img src="@/assets/dlr.png" alt="" />
          <div class="name-title">成为代理人</div>
        </div>
        <div class="rg-box">
          <img src="@/assets/rt2.png" alt="" />
        </div>
      </div>
      <div class="item" @click="handleTo('/record')">
        <div class="lf-box">
          <img src="@/assets/tg.png" alt="" />
          <div class="name-title">推广记录</div>
        </div>
        <div class="rg-box">
          <img src="@/assets/rt2.png" alt="" />
        </div>
      </div>
      <div class="item" @click="jump">
        <div class="lf-box" >
          <img src="@/assets/kf.png" alt="" />
          <div class="name-title">在线客服</div>
        </div>
        <div class="rg-box">
          <img src="@/assets/rt2.png" alt="" />
        </div>
      </div>
      <div class="item" @click="handleTo('/aboutUs')">
        <div class="lf-box">
          <img src="@/assets/gywm.png" alt="" />
          <div class="name-title">关于我们</div>
        </div>
        <div class="rg-box">
          <img src="@/assets/rt2.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <tab-bar />
</template>
<style lang="less" scoped>
.vue-qr {
  position: absolute;
  left: -100%;
  top: -100%;
}
.bgCode {
  position: absolute;
  top: -100%;
  left: -100%;
  height: 420px;
  width: 240px;
  .erm {
    position: absolute;
    bottom: 78px;
    right: 14px;
    width: 110px;
    height: 110px;
  }
}
.share-img {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  height: 460px;
  width: 280px;
}
::v-deep(.van-cell) {
  background-color: #f5f5f500;
}
.title2 {
  font-size: 14px;
  color: #999;
}
.body {
  min-height: 100vh;
  background-image: linear-gradient(to right, #62affb5c, #d4daf959) !important;
  padding: 20px;
  padding-bottom: 80px;
  box-sizing: border-box;
  .user-info {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .cover {
      width: 60px;
      height: 60px;
      border-radius: 20px;
      border: 2px solid #fff;
      box-shadow: 0vw 0vw 1vw #dac1c182;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-weight: bold;
      font-size: 16px;
      margin: 6px 0;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      & > img {
        width: 20px;
        height: 20px;
      }
    }
    .member-text {
      font-size: 14px;
      color: #999;
    }
  }
}
.kt-h {
  height: 130px;
}
.kt {
  margin-top: 6px;
  width: 100%;
  background-color: @theme-color;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 20px;
  position: relative;
  .header {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .vip {
      font-weight: bold;
    }
    .btn {
      color: #333;
      background-color: #f6d997;
      padding: 6px 12px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 14px;
    }
  }
  .foot {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    padding: 0 20px;
    height: 60px;
    width: 100%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .lf-box {
      display: flex;
      align-items: center;
      justify-content: center;
      .logo {
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }
      .name-title {
        font-size: 14px;
      }
    }
    .text {
      color: @theme-color;
      font-size: 14px;
      & > img {
        width: 14px;
        height: 14px;
        margin-left: 12px;
      }
    }
  }
}
.items {
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px 10px;
  background-color: #fff;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 30px;
    .name-title {
      font-size: 15px;
    }
    .lf-box {
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }
    }
    .rg-box {
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        width: 12px;
        height: 12px;
      }
      .btn2 {
        font-size: 12px;
        color: @theme-color;
        padding: 6px 12px;
        background-color: #f6f9fe;
        border-radius: 2px;
        margin-right: 12px;
      }
    }
  }
}
.gzh-popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000000;
  .mas {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #333333db;
  }
  .gzh-box {
    position: absolute;
    top: 30%;
    left: 40px;
    right: 40px;
    background-color: #fff;
    border-radius: 10px;
    z-index: 1000;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0;
    .title {
      font-weight: 600;
      margin-top: 4px;
    }
    .text {
      font-size: 12px;
      color: #999;
      margin-top: 6px;
    }
    & > img {
      width: 180px;
      height: 180px;
      margin-top: 10px;
    }
  }
}
.km-popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  .dlpng {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 200px;
    width: 200px;
    height: 240px;
    z-index: 13;
  }
  .mas {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #333333db;
  }
  .km-box {
    position: absolute;
    top: 30%;
    left: 40px;
    right: 40px;
    height: 150px;
    background-color: #fff;
    border-radius: 10px;
    z-index: 1000;
    padding: 0 20px;
    .btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      font-size: 14px;
      padding: 0 40px;
      .btn-text2 {
        color: @theme-color;
      }
    }
    .input-box {
      width: 100%;
      height: 40px;
      background-color: #f6f9fe;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      margin: 20px;
    }
  }
}
</style>
