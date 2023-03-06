import { ref } from 'vue'
import { useGlobalStore } from '@/store/global'
import { instance } from '@/service'
import { isWeiXin } from '@/utils/utils'
export default function useLogin() {
  const globalStore = useGlobalStore()
  const showBottom = ref(false)
  const userInfo = {}
  const wechatLogin = () => {
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
  }
  const h5Login = () => {
    console.log('h5')
  }
  const checkLoginHandle = () => {
    isWeiXin() ? wechatLogin() : h5Login()
  }
  return { showBottom, checkLoginHandle }
}
