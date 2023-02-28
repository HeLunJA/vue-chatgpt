import { defineStore } from 'pinia'
export const useGlobalStore = defineStore({
  id: 'global',
  state: () => {
    return {
      tabIndex: 0
    }
  },
  actions: {
    updateTabIndex(value) {
      this.tabIndex = value
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['tabIndex']
      }
    ]
  }
})
