<script setup>
import { isWeiXin } from '@/utils/utils'
import { useGlobalStore } from '@/store/global'
import { ref } from 'vue'
import tabBar from '@/components/tabBar.vue'
import hotQuestions from './components/hotQuestions.vue'
import chat from './components/chat.vue'
import svgIcon from '@/components/svgIcon.vue'
import { instance } from '@/service'
const globalStore = useGlobalStore()
function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
if (isWeiXin()) {
  if (!globalStore.openid) {
    const code = getQueryString('code')
    if (code) {
      instance
        .post('/wechat/userInfo', {
          returnUrl: 'http://ai.jxzw.cn',
          code,
          state: 'http://ai.jxzw.cn/'
        })
        .then((res) => {
          const { count, openid, apikey } = res.data
          localStorage.setItem('chat-count', count)
          globalStore.updateKey(apikey)
          globalStore.updateOpenid(openid)
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
          window.open(
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbf55b52391275903&redirect_uri=http://ai.jxzw.cn&response_type=code&scope=snsapi_base&state=http%3A%2F%2Fai.jxzw.cn%2F'
          )
        })
    }
  }
}
if (!globalStore.coupons?.length) {
  instance.get('/buyer/order/getProducts').then((res) => {
    globalStore.updateCoupons(res.data)
  })
}
const hotValue = ref('')
const hotChange = (value) => {
  hotValue.value = value
}
</script>
<template>
  <div class="default-chat mt">
    <div class="logo">
      <img style="width: 100%; height: 100%" src="@/assets/6.jpg" alt="" />
    </div>
    <div class="content">你好，我是人工智能Chat机器人，我可以回答你所有的问题，快来和我聊天吧！</div>
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
  <hot-questions @change="hotChange"></hot-questions>
  <chat :defValue="hotValue" />
  <tab-bar />
  <div class="bt-h"></div>
</template>
<style lang="less" scoped>
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
