<script setup>
import { isWeiXin } from '@/utils/utils'
import { useGlobalStore } from '@/store/global'
import { ref, computed } from 'vue'
import tabBar from '@/components/tabBar.vue'
import hotQuestions from './components/hotQuestions.vue'
import chat from './components/chat.vue'
import { instance } from '@/service'
import { robotTypes } from '../robot/data'
import router from '@/router'
import { showToast } from 'vant'
const getQueryString = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
const share_id = getQueryString('share_id')
if (share_id) {
  localStorage.setItem('share_id', share_id)
}
const globalStore = useGlobalStore()
const typeIndex = computed(() => globalStore.defChatTypeIndex)
const defRemark = ref(robotTypes[typeIndex.value].remark)
const showBottom = ref(false)
const userInfo = {}
const login = () => {
  if (isWeiXin()) {
    if (!globalStore.openid) {
      const code = getQueryString('code')
      const oldCode = sessionStorage.getItem('code')
      if (code && oldCode !== code) {
        sessionStorage.setItem('code', code)
        instance
          .post('/wechat/userInfo', {
            returnUrl: 'http://ai.jxzw.cn',
            code,
            inviteid: localStorage.getItem('share_id'),
            state: 'http://ai.jxzw.cn/'
          })
          .then((res) => {
            const { count, openid, apikey } = res.data
            if (localStorage.getItem('showBottomFlag') != 1) {
              showBottom.value = true
            }
            localStorage.setItem('chat-count', count)
            globalStore.updateKey(apikey)
            globalStore.updateOpenid(openid)
            userInfo.count = count
            userInfo.openid = openid
            userInfo.apikey = apikey
          })
      } else {
        instance
          .post('/wechat/authorized', {
            returnUrl: 'http://ai.jxzw.cn'
          })
          .then((res) => {
            const { redirect } = res.data
            if (!redirect) return
            // window.open(unescape(redirect))
            let a = document.createElement('a')
            a.href =
              'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbf55b52391275903&redirect_uri=http://ai.jxzw.cn&response_type=code&scope=snsapi_base&state=http%3A%2F%2Fai.jxzw.cn%2F'
            a.click()
          })
      }
    } else {
      if (localStorage.getItem('showBottomFlag') != 1) {
        showBottom.value = true
      }
    }
  } else {
  }
}
login()
const hotValue = ref('')
const hotChange = (value) => {
  hotValue.value = value
}
if (!globalStore.coupons?.length) {
  instance.get('/buyer/order/getProducts').then((res) => {
    globalStore.updateCoupons(res.data)
  })
}
const hotKeys = ref([])
let deepHots = []
if (!globalStore.hotKeys?.length) {
  instance.get('/weixin/getHotQuestions').then((res) => {
    const { data } = res
    hotKeys.value = data
    deepHots = [...data]
    globalStore.updateHotKeys(data)
  })
} else {
  hotKeys.value = globalStore.hotKeys
  deepHots = [...globalStore.hotKeys]
}
const exchange = () => {
  let list = [...deepHots]
  hotKeys.value = list
}
const navgateTo = (path) => {
  router.replace({
    path
  })
}
const agreeHandle = () => {
  // console.log(userInfo, 888)
  localStorage.setItem('chat-count', userInfo.count)
  globalStore.updateKey(userInfo.apikey)
  globalStore.updateOpenid(userInfo.openid)
  showBottom.value = false
  localStorage.setItem('showBottomFlag', 1)
  showToast('欢迎来到AI世界,AI魔盒已打开...')
}
const rejectHandle = () => {
  localStorage.setItem('chat-count', userInfo.count)
  showBottom.value = true
  globalStore.updateKey(userInfo.apikey)
  globalStore.updateOpenid(userInfo.openid)
  localStorage.setItem('showBottomFlag', 0)
  showToast('很遗憾，您拒绝了我们协议，AI魔盒已关闭...')
}
</script>
<template>
  <div class="default-chat mt">
    <div class="logo">
      <img style="width: 100%; height: 100%; border-radius: 50%" :src="robotTypes[typeIndex].url" alt="" />
    </div>
    <div class="content">{{ defRemark }}</div>
  </div>
  <div class="default-chat pt-none" style="justify-content: flex-start">
    <div class="logo" style="background-color: #fff"></div>
    <div class="content f12" style="background-color: #f5f5f5">
      <div>例如：</div>
      <div>1、怎么样才能让自己更美丽</div>
      <div>2、酸菜鱼怎么做</div>
      <div>3、帮我写一份PHP获取最大数的代码</div>
    </div>
  </div>
  <hot-questions :questions="hotKeys" @change="hotChange" @exchange="exchange"></hot-questions>
  <chat :defValue="hotValue" />
  <tab-bar />
  <div class="bt-h"></div>
  <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '57%' }">
    <div class="popup-body">
      <div class="title">为给您提供更好的服务</div>
      <div class="content">
        <p>
          我们禁止用户在知情的情况下产生或利用他人在知情的情况下产生有害内容，包括且不限于仇恨言论、骚扰信息、自我伤害内容、性内容、政治内容、垃圾邮件、诈骗信息等。
        </p>
        <p>特别提示：本网页上产生的所有内容不代表本平台的观点和意见。</p>
        欲了解更多信息，请阅读我们的<span @click="navgateTo('/shopAgr')">《服务使用协议》</span>、<span
          @click="navgateTo('/shopAgr')"
          >《免责声明》</span
        >和<span @click="navgateTo('/ys')">《隐私政策》</span>帮助您了解我们收集、使用、存储和共享个人信息的情况。
      </div>
      <div class="btn" @click="agreeHandle">同意并继续</div>
      <div class="close" @click="rejectHandle">拒绝并退出</div>
    </div>
  </van-popup>
</template>
<style lang="less" scoped>
.popup-body {
  padding: 20px;
  box-sizing: border-box;
  .title {
    font-weight: bold;
  }
  .content {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.5;
    & > span {
      color: @theme-color;
    }
  }
  .btn {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 22px;
    background-color: rgb(40, 148, 10);
    color: #fff;
    margin-top: 24px;
  }
  .close {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    color: #999;
  }
}
.text {
  color: @theme-color;
  font-size: 18px;
}
.bt-h {
  height: 180px;
}
.pt-none {
  padding-top: 0 !important;
}
.mt {
  margin-top: 20px;
}
.f12 {
  font-size: 12px !important;
  flex: 0 0 220px;
}
.default-chat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  .logo {
    align-self: flex-start;
    flex: 0 0 50px;
    height: 50px;
    border-radius: 50%;
    background-color: @theme-color;
    margin-right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    background-color: #f6f7fb;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 8px;
    width: 100%;
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>
