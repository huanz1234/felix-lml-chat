import axios from 'axios'
import { useSettingStore } from '@/stores/setting'

// 创建axios实例
const httpClient = axios.create({
  baseURL: 'https://api.siliconflow.cn/v1',
  timeout: 60000, // 60秒超时
})

// 请求拦截器 - 自动注入认证信息
httpClient.interceptors.request.use(
  (config) => {
    const settingStore = useSettingStore()
    
    // 自动注入API Key
    if (settingStore.settings.apiKey) {
      config.headers.Authorization = `Bearer ${settingStore.settings.apiKey}`
    }
    
    // 设置默认Content-Type
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器 - 集中处理错误
httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 集中处理网络错误和业务异常
    if (error.response) {
      // 服务器响应了错误状态码
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          console.error('API Key无效或已过期')
          throw new Error('API Key无效或已过期，请检查设置')
        case 403:
          console.error('API访问被拒绝')
          throw new Error('API访问被拒绝，请检查权限')
        case 429:
          console.error('API请求频率超限')
          throw new Error('请求过于频繁，请稍后重试')
        case 500:
          console.error('服务器内部错误')
          throw new Error('服务器内部错误，请稍后重试')
        default:
          console.error(`API错误 ${status}:`, data)
          throw new Error(data?.error?.message || `请求失败 (${status})`)
      }
    } else if (error.request) {
      // 网络错误
      console.error('网络连接错误:', error.request)
      throw new Error('网络连接失败，请检查网络连接')
    } else {
      // 其他错误
      console.error('请求配置错误:', error.message)
      throw new Error('请求配置错误: ' + error.message)
    }
  }
)

export default httpClient
