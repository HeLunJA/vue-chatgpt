import axios from 'axios'
import { baseURL, TIME_OUT } from './config'

const config = {
  baseURL: baseURL,
  timeout: TIME_OUT
}

const instance = axios.create(config)
// 请求拦截器
instance.interceptors.request.use((config) => {
  const token = ''
  return token ? { ...config, headers: { token: globalStore.token } } : config
})
// 响应拦截器
instance.interceptors.response.use((config) => {
  return config
})
export { instance }
