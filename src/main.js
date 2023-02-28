import { createApp } from 'vue'
import 'normalize.css'
import 'virtual:svg-icons-register'
import router from './router'
import App from './App.vue'
import pinia from './store'
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
