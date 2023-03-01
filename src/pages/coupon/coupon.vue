<script setup>
import img1 from '@/assets/A1_01.jpg'
import img2 from '@/assets/A1_02.jpg'
import img3 from '@/assets/A1_03.jpg'
import img4 from '@/assets/A1_04.jpg'
import img5 from '@/assets/A1_05.jpg'
import img6 from '@/assets/A1_06.jpg'
import img7 from '@/assets/A1_07.jpg'
import { ref } from 'vue'
import { useGlobalStore } from '@/store/global'
import { instance2, instance } from '@/service'
const globalStore = useGlobalStore()
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
        alert(res)
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
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
      price: items.price
    })
    .then((res) => {
      const orderId = res.data?.data?.orderId
      instance
        .post('/pay/create', {
          orderId,
          returnUrl: 'http://ai.jxzw.cn',
          openId: globalStore.openid
        })
        .then((res) => {
          console.log(res, 6666)
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
</script>
<template>
  <!-- <van-swipe class="my-swipe" :autoplay="800" :duration="8000" indicator-color="white">
    <van-swipe-item>
      <div style="width: 50px; background-color: red; height: 100px">1</div>
    </van-swipe-item>
    <van-swipe-item>
      <div style="width: 50px; background-color: red; height: 100px">2</div>
    </van-swipe-item>
    <van-swipe-item>
      <div style="width: 50px; background-color: red; height: 100px">3</div>
    </van-swipe-item>
  </van-swipe> -->
  <van-image style="display: block" :src="img1" />
  <div class="coupon">
    <div class="items">
      <div
        :class="{ item: true, active: index == active }"
        v-for="(item, index) in coupons"
        @click="changeActive(index)"
      >
        <div class="name">{{ item.name }}</div>
        <div class="price"><span class="rmb">¥</span>{{ item.price }}</div>
        <div class="old-price">¥{{ item.price * 2 }}</div>
        <div class="text" v-if="index == 0">新人抢先体验</div>
        <div v-else class="pr">{{ (item.price / 30).toFixed(1) }}元/天</div>
      </div>
    </div>
    <van-image style="display: block" :src="img2" />
  </div>
  <div class="btn-box">
    <div class="btn-mas" @click="pay"></div>
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
    z-index: 100000000;
    padding-bottom: 14px;
    .item {
      width: 110px;
      height: 154px;
      border-radius: 18px;
      box-shadow: 0vw 0vw 1vw #dac1c182;
      display: flex;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      .name {
        font-size: 12px;
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
}
</style>
