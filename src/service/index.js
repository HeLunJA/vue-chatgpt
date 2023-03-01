import axios from 'axios'
import { baseURL, baseURL_K, TIME_OUT } from './config'
import Qs from 'qs'
const config = {
  baseURL: baseURL,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
}

const instance = axios.create(config)
// 请求拦截器
instance.interceptors.request.use((config) => {
  const token = ''
  return token ? { ...config, headers: { token: globalStore.token }, data: Qs.stringify(config.data) } : config
})
// 响应拦截器
instance.interceptors.response.use((config) => {
  return config
})
const config2 = {
  baseURL: baseURL,
  timeout: TIME_OUT
}

const instance2 = axios.create(config2)
// 请求拦截器
instance2.interceptors.request.use((config) => {
  const token = ''
  return token ? { ...config, headers: { token: globalStore.token } } : config
})
// 响应拦截器
instance2.interceptors.response.use((config) => {
  console.log(config)
  return config
})
export { instance, instance2 }
