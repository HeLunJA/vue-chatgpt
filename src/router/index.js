import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home/home.vue'
import UserView from '@/pages/user/user.vue'
import Robot from '@/pages/robot/robot.vue'
import recordView from '@/pages/record/record.vue'
import coupon from '@/pages/coupon/coupon.vue'
import aboutUs from '@/pages/aboutUs/aboutUs.vue'
import help from '@/pages/help/help.vue'
import fw from '@/pages/fw/fw.vue'
import ys from '@/pages/ys/ys.vue'
import zw from '@/pages/zw/zw.vue'
import shopAgr from '@/pages/shopAgr/shopAgr.vue'
import withdraw from '@/pages/withdraw/withdraw.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/robot',
      name: 'robot',
      component: Robot
    },
    {
      path: '/record',
      name: 'record',
      component: recordView
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    },
    {
      path: '/ys',
      name: 'ys',
      component: ys
    },
    {
      path: '/zw',
      name: 'zw',
      component: zw
    },
    {
      path: '/fw',
      name: 'fw',
      component: fw
    },
    {
      path: '/shopAgr',
      name: 'shopAgr',
      component: shopAgr
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    }
  ]
})

export default router
