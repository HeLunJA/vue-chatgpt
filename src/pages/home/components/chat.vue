<script setup>
import { showToast } from 'vant'
import { scrollTop } from '@/utils/utils'
import Filter from 'bad-words-chinese'
import { useGlobalStore } from '@/store/global'
import { ref, computed, onMounted, onUpdated, unref, defineProps, watch } from 'vue'
import svgIcon from '@/components/svgIcon.vue'
import { instance, instance2 } from '@/service'
import router from '@/router'
import { robotTypes } from '../../robot/data'
const showBottom = ref(false)
const globalStore = useGlobalStore()
const typeIndex = computed(() => globalStore.defChatTypeIndex)
//const defImg2= ref(robotTypes[typeIndex2.value].url)
//const defImg= ref(robotTypes[typeIndex.value].url)
const filter = new Filter()
const props = defineProps({
  defValue: {
    type: String,
    default: ''
  }
})
const num = ref(5)
const changeCount = () => {
  num.value -= 1
  if (num.value > 0) {
    setTimeout(() => {
      changeCount()
    }, 1000)
  } else {
    num.value = 5
  }
}
const historyList = ref([])
const showLeft = ref(false)
const chatValue = ref()
let keeptext = ''
let chatsStore = localStorage.getItem('chats')
if (chatsStore) {
  chatsStore = JSON.parse(chatsStore)
}
const chats = ref(chatsStore ? chatsStore : [])
const changeShowLeft = () => {
  let chatList = []
  const chatListStore = localStorage.getItem('chat-list')
  if (chatListStore) {
    chatList = JSON.parse(chatListStore)
    chatList = chatList.map((item) => {
      console.log(typeof item)
      let obj = typeof item == 'string' ? JSON.parse(item) : item
      obj.list = JSON.parse(obj.list)
      return obj
    })
    historyList.value = chatList
  }
  showLeft.value = !showLeft.value
}
const send = () => {
  if (localStorage.getItem('showBottomFlag') != 1) {
    showBottom.value = true
    return showToast('您同意协议后，魔盒才能为您提供服务')
  }
  console.log(globalStore)
  if (!chatValue.value) {
    return showToast('请输入聊天内容')
  }
  if (num.value != 5) return
  let count = localStorage.getItem('chat-count')
  const chatKey = localStorage.getItem('chat-key')
  if (globalStore.apiKey || count > 0) {
    if (count > 0) {
      count -= 1
      console.log(count, localStorage.getItem('chat-count'))
      localStorage.setItem('chat-count', count)
    }
    console.log('count:' + count)
    console.log('globalStore.apikey:' + globalStore.apikey)
    console.log('chatKey:' + chatKey)
    if (count < 0 && !globalStore.apiKey && !chatKey) {
      showToast('体验次数已用完2')
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
    changeCount()
    scrollTop(10000, 600)
    if (keeptext.length >= 2048) {
      keeptext = ''
    }
    const cleanPrompt = filter.isProfane(chatValue.value) ? filter.clean(chatValue.value) : chatValue.value
    chatValue.value = ''
    console.log('globalStore.apikey----:' + globalStore.apiKey)
    console.log('chatKey---:' + chatKey)
    instance2
      .post('/api/openai', {
        apikey: globalStore.apiKey || chatKey || '',
        text: cleanPrompt,
        id: 1,
        keep: 1,
        keepText: keeptext,
        type: globalStore.modeType,
        openid: globalStore.openid
      })
      .then((res) => {
        chatValue.value = ''

        //	cleanPrompt =''
        const html = res.data?.html
        console.log('return content :' + html)
        const title = res.data?.title
        if (!html) {
          console.log('return content222 :' + html)
          keeptext = ''
          chats.value.forEach((item) => {
            console.log(item, 'item')
            if (item.isUser === 'loading') {
              item.value = '您的问题我刚不清楚，请再把问题发我一遍'
              item.isUser = false
            }
          })
        } else {
          if (keeptext.lastIndexOf('AI:') > 1) {
            keeptext = ''
          }
          keeptext = 'Human:' + title + ' AI:' + html + ' ' + keeptext
          chats.value.forEach((item) => {
            console.log(item, 'item')
            if (item.isUser === 'loading') {
              item.value = html
              item.isUser = false
            }
          })
        }

        localStorage.setItem('chats', JSON.stringify(unref(chats)))
        scrollTop(10000, 600)
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
  let chatList = []
  keeptext = ''
  if (!chats.value[0]?.value || chats.value[0]?.value.length <= 0) {
    console.log('空，不加记录')
    showLeft.value = false
    return
  }
  const chatListStore = localStorage.getItem('chat-list')
  if (chatListStore) {
    chatList = JSON.parse(chatListStore)
  }
  if (chatList) {
    chatList.push(
      JSON.stringify({
        id: chatList.length,
        list: JSON.stringify(unref(chats)),
        title: chats.value[0]?.value
      })
    )
    localStorage.setItem('chat-list', JSON.stringify(chatList))
    // console.log(localStorage.getItem('chat-list'))
    chats.value = []
    localStorage.setItem('chats', [])
  }
  showLeft.value = false
}
const clickChatItem = (index) => {
  const list = [...historyList.value]
  chats.value = list[index].list
  localStorage.setItem('chats', JSON.stringify(unref(chats)))
  scrollTop(0, 100)
  showLeft.value = false
  list.splice(index, 1)
  list.map((item) => {
    let obj = item
    obj.list = JSON.stringify(obj.list)
    return JSON.stringify(obj)
  })
  list.push(
    JSON.stringify({
      id: list.length,
      list: JSON.stringify(unref(chats)),
      title: chats.value[0]?.value
    })
  )
  localStorage.setItem('chat-list', JSON.stringify(list))
}
const copy = (value) => {
  try {
    let input = document.createElement('input')
    input.value = value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    showToast('复制成功')
  } catch (e) {
    showToast('复制失败')
  }
}
const agreeHandle = () => {
  // console.log(userInfo, 888)

  showBottom.value = false
  localStorage.setItem('showBottomFlag', 1)
  showToast('欢迎来到AI世界,AI魔盒已打开...')
}
const rejectHandle = () => {
  showBottom.value = true

  localStorage.setItem('showBottomFlag', 0)
  showToast('很遗憾，您拒绝了我们协议，AI魔盒已关闭...')
}
watch(
  () => props.defValue,
  (value) => {
    chatValue.value = value
    send()
  }
)

//import { event } from '@utils'

onMounted(() => {
  if (globalStore.defChatTypeIndex != globalStore.defPreChatTypeIndex) {
    console.log('vue3 changed' + globalStore.defChatTypeIndex + '  ' + globalStore.defPreChatTypeIndex)
    openNewChat()
  }
})

let interval = ''
const focusDriverLicenseName = () => {
  window.addEventListener('resize', function () {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      interval = window.setTimeout(function () {
        if ('scrollIntoView' in document.activeElement) {
          document.activeElement.scrollIntoView()
        } else {
          document.activeElement.scrollIntoViewIfNeeded()
        }
      }, 0)
    }
  })
}
//驾驶证姓名失去焦点
const blurDriverLicenseName = () => {
  clearInterval(interval)
}
const focusIpt = () => {
  setTimeout(() => {
    scrollTop(10000, 0)
  }, 500)
}
const blurIpt = () => {
  if (interval) clearInterval(interval)
}
const myFocus = () => {
  let pannel = this.$refs.textarea2
  console.log('focus')
  setTimeout(function () {
    pannel.scrollIntoView(true)
    pannel.scrollIntoViewIfNeeded()
    document.body.scrollTop = document.body.scrollHeight
  }, 100)
}

//   onUpdated(()=>{
//       if(showLeft.value){
//           showLeft.value = false
//       }
//      myFocus()
//     })

const clearHistory = () => {
  localStorage.setItem('chat-count', -1)
  keeptext = ''
  localStorage.setItem('showBottomFlag', 0)
  localStorage.setItem('chat-list', [])
  chats.value = []
  localStorage.setItem('chats', [])
  showLeft.value = false
  globalStore.updateKey('')

  globalStore.updateOpenid('')
}
</script>
<template>
  <div class="chat-list">
    <template v-for="(item, index) in chats" :key="index">
      <div v-if="item.isUser === true" class="item" style="justify-content: flex-end">
        <div class="logo" style="order: 3">
          <img src="@/assets/151.jpg" alt="" />
        </div>
        <div class="content theme" style="order: 2">{{ item.value }}</div>
        <div class="copy" style="order: 1" @click="copy(item.value)">
          <img src="@/assets/copy.png" alt="" />
        </div>
      </div>
      <div v-else class="item">
        <div class="logo">
          <img :src="robotTypes[typeIndex].url" alt="" />
        </div>
        <div class="content">
          <div class="load-text" v-if="item.isUser === 'loading'">
            <span>正在思考中请稍等</span>
            <van-loading size="16px" type="spinner" color="#1989fa" />
          </div>
          <div v-html="item.value"></div>
        </div>
        <div class="copy" @click="copy(item.value)">
          <img src="@/assets/copy.png" alt="" />
        </div>
      </div>
    </template>
  </div>
  <div class="footer">
    <svg-icon size="30px" name="cd" @click="changeShowLeft" />
    <!-- <van-field v-model="chatValue" placeholder="你想和我聊点什么？" /> -->
    <van-cell-group inset>
      <van-field
        id="tinput"
        v-model="chatValue"
        rows="1"
        autosize
        type="textarea"
        placeholder="你想和我聊点什么？"
        ref="textarea2"
        v-on:focus="focusIpt"
        v-on:blur="blurIpt"
      />
    </van-cell-group>
    <div class="send" @click="send">
      <svg-icon v-if="num == 5" size="18px" name="send" />
      <span v-else style="color: #fff">{{ num }}</span>
    </div>
  </div>
  <van-popup v-model:show="showLeft" position="left" :style="{ width: '70%', height: '100%', background: '#fff' }">
    <div class="popup">
      <div class="add-btn" @click="openNewChat">
        <span class="icon">+</span>
        <span class="text">开启新对话</span>
      </div>
      <div class="popup-item" v-for="(item, index) in historyList" :key="index" @click="clickChatItem(index)">
        <div class="line">"{{ item.title }}</div>
        <img src="@/assets/rt2.png" alt="" />
      </div>
    </div>
    <div class="clearbt" @click="clearHistory" position="bottom">
      <span class="icon"> - </span>
      <span class="text"> 清空对话</span>
    </div>
  </van-popup>
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
.theme {
  background-color: @theme-color !important;
  color: #fff !important;
}
.line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
      .load-text {
        display: flex;
        align-items: center;
        & > span {
          margin-right: 4px;
        }
      }
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
.clearbt {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #f5f5f5;
  & > text {
    margin-left: 5px;
  }
  & > .icon {
    margin-right: 5px;
    font-size: 28px;
  }
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: flex-end;
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
    position: relative;
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
  min-height: 36px;
  display: flex;
  align-items: center;
  line-height: normal;
}
::v-deep(.van-cell-group--inset) {
  flex: 1;
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
  border: 1px solid #333;
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
