import { createApp } from 'vue'
import 'normalize.css'
import 'vant/lib/index.css'
import 'virtual:svg-icons-register'
import vant from 'vant'
import router from './router'
import App from './App.vue'
import pinia from './store'
const app = createApp(App)

app.use(vant)
app.use(pinia)
app.use(router)
app.mount('#app')
