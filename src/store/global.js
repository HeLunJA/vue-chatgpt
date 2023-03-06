import { defineStore } from 'pinia'
export const useGlobalStore = defineStore({
  id: 'global',
  state: () => {
    return {
      tabIndex: 0, // 底部导航栏index
      openid: 'odkSp5lbodtZutkIK2AXHffCSJBs', // 用户唯一id
      apiKey: '', // 发起聊天卡券key
      coupons: [], // 卡券列表
      modeType: 1, // 聊天模型类型
      hotKeys: [], // 关键词
      defChatTypeIndex: 0,
      defPreChatTypeIndex: 0
    }
  },
  actions: {
    updateTypeIndex(value) {
      this.defChatTypeIndex = value
    },
    updatePreTypeIndex(value) {
      this.defPreChatTypeIndex = value
    },
    updateHotKeys(value) {
      this.hotKeys = value
    },
    updateModeType(value) {
      this.modeType = value
    },
    updateKey(value) {
      this.apiKey = value
    },
    updateTabIndex(value) {
      this.tabIndex = value
    },
    updateOpenid(value) {
      this.openid = value
    },
    updateCoupons(value) {
      this.coupons = value
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['tabIndex', 'openid', 'coupons', 'defChatTypeIndex', 'defPreChatTypeIndex', 'modeType', 'apiKey']
      }
    ]
  }
})
