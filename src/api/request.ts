// src/api/request.ts
import axios from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

// 后端统一响应结构（按你后端实际字段改）
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10000,
})

// 请求拦截器：带 token
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器：解包 data + 统一错误处理
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // HTTP 错误
    const status = error.response?.status
    if (status === 401) {
      // 未登录：清 token、跳登录页
    }
    console.error(error.message)
    return Promise.reject(error)
  },
)

// 核心方法：泛型直接拿到 data 的类型
export const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> =>
  instance.request(config) as Promise<T>

// 便捷方法
export const get = <T = unknown>(
  url: string,
  params?: object,
  config?: AxiosRequestConfig,
): Promise<T> => request({ url, method: 'GET', params, ...config })

export const post = <T = unknown>(
  url: string,
  data?: object,
  config?: AxiosRequestConfig,
): Promise<T> => request({ url, method: 'POST', data, ...config })
