import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { handleError } from './errorHandler'

/**
 * 扩展请求配置接口
 */
type RequestConfig = AxiosRequestConfig & {
  /** 是否显示错误信息 */
  showError?: boolean
}

/**
 * 创建 Axios 实例
 */
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: RequestConfig) => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 添加时间戳防止缓存
    if (config.method?.toLowerCase() === 'get') {
      config.params = { ...config.params, _t: Date.now() }
    }

    return config
  },
  (error: Error) => {
    handleError(error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    return data
  },
  (error: Error) => {
    handleError(error)
    return Promise.reject(error)
  }
)

export default service 