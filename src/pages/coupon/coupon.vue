<script setup>
import navBar from '@/components/navBar.vue'
import { showLoadingToast, showSuccessToast, showFailToast } from 'vant'
import { useRouter } from 'vue-router'
import img1 from '@/assets/A1_01.jpg'
import img2 from '@/assets/A1_02.jpg'
import img3 from '@/assets/A1_03.jpg'
import img4 from '@/assets/A1_04.jpg'
import img5 from '@/assets/A1_05.jpg'
import img6 from '@/assets/A1_06.jpg'
import img7 from '@/assets/A1_07.jpg'
import coverImg from '@/assets/151.jpg'
import { ref } from 'vue'
import { getRandomInt } from '@/utils/utils'
import { useGlobalStore } from '@/store/global'
import { instance } from '@/service'
const globalStore = useGlobalStore()
const router = useRouter()
const timeNum = getRandomInt(53000000, 54000000)
function onBridgeReady(props) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    {
      appId: props.appId, //公众号ID，由商户传入
      timeStamp: props.timeStamp, //时间戳，自1970年以来的秒数
      nonceStr: props.nonceStr, //随机串
      package: props.packAge,
      signType: 'MD5', //微信签名方式：
      paySign: props.paySign //微信签名
    },
    function (res) {
      if (res.err_msg == 'get_brand_wcpay_request:ok') {
        instance.get(`/pay/getApikey?openid=${globalStore.openid}`).then((res) => {
          const apiKey = res.data?.apikey
          globalStore.updateKey(apiKey)
          router.replace({
            name: 'home'
          })
        })
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        showSuccessToast('支付成功')
      } else {
        showFailToast('支付失败')
      }
    }
  )
}
const coupons = ref(globalStore.coupons)
const active = ref(0)
// instance.get('/buyer/order/getProducts').then((res) => {
//   coupons.value = res.data
// })
const changeActive = (index) => {
  active.value = index
}
const pay = () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  })
  const items = coupons.value[active.value]
  instance
    .post('/buyer/order/create', {
      openid: globalStore.openid,
      name: '微信用户',
      address: '默认地址',
      phone: '18179501104',
      items: JSON.stringify({
        productId: items.id,
        productName: items.name,
        productPrice: items.price
      }),
      prodcattegory: items.cagid,
      prodid: items.id,
      price: items.price,
      inviteid: localStorage.getItem('share_id')
    })
    .then((res) => {
      const orderId = res.data?.data?.orderId
      instance
        .post('/pay/create', {
          orderId,
          returnUrl: 'http://ai.jxzw.cn',
          openId: globalStore.openid,
          prodcattegory: items.cagid
        })
        .then((res) => {
          if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            }
          } else {
            onBridgeReady(res.data)
          }
        })
    })
}
const scrollTags = ref([
  {
    img: coverImg,
    name: '小北**~',
    num: 5,
    vipText: '30天会员'
  },
  {
    img: coverImg,
    name: 'ヽ妖娆',
    num: 4,
    vipText: '30天会员'
  },
  {
    img: coverImg,
    name: '客**凉',
    num: 2,
    vipText: '7天会员'
  },
  {
    img: coverImg,
    name: 'super',
    num: 1,
    vipText: '1天会员'
  },
  {
    img: coverImg,
    name: 'Zzz',
    num: 8,
    vipText: '7天会员'
  },
  {
    img: coverImg,
    name: '墨**客',
    num: 6,
    vipText: '30天会员'
  },
  {
    img: coverImg,
    name: '微信用户',
    num: 9,
    vipText: '30天会员'
  }
])
</script>
<template>
  <navBar title="会员中心" />
  <div class="header-img">
    <div class="scroll-view">
      <div class="views">
        <div class="item-view" v-for="(item, index) in scrollTags" :key="index">
          <img :src="coverImg" alt="" />
          <span>{{ item.name }}</span>
          <span class="ml">于{{ item.num }}分钟前开通{{ item.vipText }}</span>
        </div>
      </div>
    </div>
    <van-image style="display: block" :src="img1" />
  </div>
  <div class="coupon">
    <div class="items">
      <div
        :class="{ item: true, active: index == active }"
        v-for="(item, index) in coupons"
        @click="changeActive(index)"
      >
        <div class="name">
          <strong>{{ item.name }}</strong>
        </div>
        <div class="price"><span class="rmb">¥</span>{{ item.price }}</div>
        <div class="foot-text" v-if="index == 2">最多购买</div>
        <div class="foot-text" v-if="index == 1">推荐套餐</div>
        <div class="old-price">¥{{ item.price * 2 }}</div>
        <div class="text" v-if="index == 0">新人抢先体验</div>
        <div v-else class="pr">{{ (item.price / 30).toFixed(1) }}元/天</div>
      </div>
    </div>
    <van-image style="display: block" :src="img2" />
  </div>
  <div class="btn-box">
    <div class="btn-mas" @click="pay"></div>
    <div class="time">
      <van-count-down :time="timeNum">
        <template #default="timeData">
          <div class="time-box">
            <span>距离优惠结束还剩</span>
            <div class="box" :style="{ color: 'red', fontSize: '16px' }">
              <strong>{{ timeData.hours }}</strong>
            </div>
            <span>时</span>
            <div class="box" :style="{ color: 'red', fontSize: '16px' }">
              <strong>{{ timeData.minutes }}</strong>
            </div>
            <span>分</span>
            <div class="box" :style="{ color: 'red', fontSize: '16px' }">
              <strong>{{ timeData.seconds }}</strong>
            </div>
            <span>秒</span>
          </div>
        </template>
      </van-count-down>
    </div>
    <van-image style="display: block" :src="img3" />
  </div>
  <van-image style="display: block" :src="img4" />
  <van-image style="display: block" :src="img5" />
  <van-image style="display: block" :src="img6" />
  <van-image style="display: block" :src="img7" />
  <!-- 
  <div class="btn" @click="pay">充值</div> -->
</template>
<style lang="less" scoped>
.header-img {
  position: relative;
}
@keyframes marquee {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-100%);
  }
}
.scroll-view {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 6px;
  z-index: 100000000;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  .views {
    display: flex;
    flex-wrap: nowrap;
    animation: marquee 16s linear infinite;
  }
  .item-view {
    font-size: 12px;
    color: #fff;
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 250px;
    height: 30px;
    background-color: rgba(51, 51, 51, 0.203);
    border-radius: 20px;
    margin-right: 12px;
    .ml {
      margin-left: 8px;
    }
    & > img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 6px;
    }
  }
}
.coupon {
  position: relative;
  .items {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    z-index: 100;
    padding-bottom: 6px;
    .item {
      width: 110px;
      height: 154px;
      border-radius: 18px;
      box-shadow: 0vw 0vw 1vw #dac1c182;
      display: flex;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      position: relative;
      .foot-text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -14px;
        font-size: 12px;
        border-radius: 30px;
        color: #83812c;
        background-image: linear-gradient(to right, #bed354, #daf93e85);
        padding: 4px 8px;
        width: 50px;
      }
      .name {
        font-size: 14px;
        margin-top: 24px;
        color: #9a864f;
      }
      .price {
        font-weight: 600;
        margin-top: 20px;
        font-size: 28px;
      }
      .rmb {
        font-weight: normal !important;
        font-size: 20px !important;
      }
      .old-price {
        color: #f4ce66;
        font-size: 12px;
        text-decoration: line-through;
        margin-top: 12px;
      }
      .text {
        font-size: 12px;
        margin-top: 8px;
      }
      .pr {
        font-size: 12px;
        margin-top: 8px;
        color: rgb(203, 185, 185);
      }
    }
    .active {
      border: 2px solid #f9da87;
      background-color: #f9da8738;
    }
  }
}
.btn-box {
  position: relative;
  .btn-mas {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0;
    height: 80px;
    z-index: 2000;
  }
  .time {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 36px;
    height: 40px;
    z-index: 2000;
    .time-box {
      font-size: 14px;
      color: #83812c;
      display: flex;
      align-items: center;
      justify-content: center;
      .box {
        border: 2px solid rgba(153, 153, 153, 0.521);
        height: 24px;
        width: 24px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 2px;
      }
    }
  }
}
</style>
