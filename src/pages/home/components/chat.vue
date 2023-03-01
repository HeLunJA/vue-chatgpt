<script setup>
import { showToast } from 'vant'
import axios from 'axios'
import { useGlobalStore } from '@/store/global'
import { ref, unref, defineProps, watch } from 'vue'
import svgIcon from '@/components/svgIcon.vue'
import { instance, instance2 } from '@/service'
import router from '@/router'
const globalStore = useGlobalStore()
const props = defineProps({
  defValue: {
    type: String,
    default: ''
  }
})
const showLeft = ref(false)
const chatValue = ref()
let chatsStore = localStorage.getItem('chats')
if (chatsStore) {
  chatsStore = JSON.parse(chatsStore)
}
const chats = ref(chatsStore ? chatsStore : [])
const changeShowLeft = () => {
  showLeft.value = !showLeft.value
}
const send = () => {
  if (!chatValue.value) {
    return
  }
  let count = localStorage.getItem('chat-count')
  const chatKey = localStorage.getItem('chat-key')
  if (globalStore.apiKey || count > 0) {
    if (count > 0) {
      count -= 1
      console.log(count, localStorage.getItem('chat-count'))
      localStorage.setItem('chat-count', count)
    }
    if (count < 0 && !globalStore.apikey) {
      showToast('体验次数已用完')
      setTimeout(() => {
        router.push({
          path: '/coupon'
        })
      }, 2000)
    }
    chats.value.push({
      isUser: true,
      value: chatValue.value
    })
    chats.value.push({
      isUser: 'loading',
      value: ''
    })
    instance2
      .post('/api/openai', {
        apikey: globalStore.apiKey || chatKey || '',
        text: chatValue.value,
        id: 1,
        keep: 1,
        keepText: chatValue.value,
        type: globalStore.modeType,
        openid: globalStore.openid
      })
      .then((res) => {
        const html = res.data?.html
        chats.value.forEach((item) => {
          console.log(item, 'item')
          if (item.isUser === 'loading') {
            item.value = html
            item.isUser = false
          }
        })
        console.log(chats.value, '数组')
        localStorage.setItem('chats', JSON.stringify(unref(chats)))
        chatValue.value = ''
      })
      .catch((err) => {
        console.log(err, '聊天错误')
      })
  } else {
    showToast('体验次数已用完')
    setTimeout(() => {
      router.push({
        path: '/coupon'
      })
    }, 2000)
  }
}
const openNewChat = () => {
  let chatList = localStorage.getItem('chatList')
  if (chatList) {
    chatList = JSON.parse(chatList)
    chatList = chatList.map((item) => {
      item = JSON.parse(item)
    })
  } else {
    chatList = []
  }
  chatList.push(JSON.stringify(unref(chats)))
  localStorage.setItem('chatList', chatList)
  chats.value = []
  localStorage.setItem('chats', JSON.stringify(unref(chats)))
}
watch(
  () => props.defValue,
  (value) => {
    chatValue.value = value
    send()
  }
)
</script>
<template>
  <div class="chat-list">
    <template v-for="(item, index) in chats" :key="index">
      <div v-if="item.isUser === true" class="item" style="justify-content: flex-end">
        <div class="logo" style="order: 3">
          <img src="@/assets/151.jpg" alt="" />
        </div>
        <div class="content theme" style="order: 2">{{ item.value }}</div>
        <div class="copy" style="order: 1">
          <img src="@/assets/copy.png" alt="" />
        </div>
      </div>
      <div v-else class="item">
        <div class="logo">
          <img src="@/assets/6.jpg" alt="" />
        </div>
        <div class="content">
          <van-loading v-if="item.isUser === 'loading'" size="16px" type="spinner" color="#1989fa" />
          <span v-else>{{ item.value }}</span>
        </div>
        <div class="copy">
          <img src="@/assets/copy.png" alt="" />
        </div>
      </div>
    </template>
  </div>
  <div class="footer">
    <svg-icon size="30px" name="cd" @click="changeShowLeft" />
    <van-field v-model="chatValue" placeholder="你想和我聊点什么？" />
    <div class="send" @click="send">
      <svg-icon size="18px" name="send" />
    </div>
  </div>
  <van-popup v-model:show="showLeft" position="left" :style="{ width: '60%', height: '100%', background: '#fff' }">
    <div class="popup">
      <div class="add-btn" @click="openNewChat">
        <span class="icon">+</span>
        <span class="text">开启新对话</span>
      </div>
      <div class="popup-item">
        <span>"人工智能"的探索之旅</span>
        <img src="@/assets/rt2.png" alt="" />
      </div>
      <div class="popup-item">
        <span>"人工智能"的探索之旅</span>
        <img src="@/assets/rt2.png" alt="" />
      </div></div
  ></van-popup>
</template>
<style lang="less" scoped>
.theme {
  background-color: @theme-color !important;
  color: #fff !important;
}
.chat-list {
  padding: 10px;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .logo {
      flex: 0 0 50px;
      height: 50px;
      background-color: #f5f5f5;
      border-radius: 50%;
      align-self: flex-start;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      background-color: #f6f7fb;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 8px;
      font-size: 14px;
      line-height: 1.5;
      margin: 0 4px;
    }
    .copy {
      flex: 0 0 30px;
      height: 30px;
      background-color: #ecf5fe;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        height: 15px;
        width: 15px;
      }
    }
  }
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #f5f5f5;
  .send {
    flex: 0 0 30px;
    background-color: @theme-color;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .input-box {
    background-color: #f5f5f5;
    border-radius: 12px;
    flex: 1;
    margin: 0 12px;
    height: 30px;
    display: flex;
    align-items: center;
    & > input {
      border: 0px !important;
      width: 100%;
    }
  }
}
.pla {
  background-color: #f5f5f5;
  font-size: 12px !important;
}
::v-deep(.van-cell) {
  background-color: #f5f5f5;
  border-radius: 12px;
  height: 36px;
  display: flex;
  align-items: center;
  line-height: normal;
  margin: 0 12px;
}
.popup {
  padding: 0 20px;
  box-sizing: border-box;
}
.add-btn {
  margin-top: 60px;
  margin-bottom: 40px;
  width: 100%;
  height: 40px;
  border: 1px solid #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 8px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  & > text {
    margin-left: 10px;
  }
  & > .icon {
    margin-right: 10px;
    font-size: 28px;
  }
}
.popup-item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  border-bottom: 1px solid #999;
  font-size: 14px;
  & > img {
    width: 18px;
    height: 18px;
  }
}
</style>
