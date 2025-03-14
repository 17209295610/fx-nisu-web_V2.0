import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * 应用全局状态管理
 * 使用 Pinia 管理全局共享的状态
 * 包括：加载状态、主题设置、错误信息等
 */
export const useAppStore = defineStore('app', () => {
  /**
   * 全局加载状态
   * 用于控制全局loading效果
   * @example loading.value = true // 显示加载中
   */
  const loading: Ref<boolean> = ref(false)

  /**
   * 主题模式
   * 控制应用的主题样式
   * @example theme.value = 'dark' // 切换到暗色主题
   */
  const theme: Ref<string> = ref('light')

  /**
   * 全局错误信息
   * 存储全局错误状态
   * @example error.value = new Error('网络错误')
   */
  const error: Ref<Error | null> = ref(null)

  /**
   * 设置加载状态
   * @param value - true 表示加载中，false 表示加载完成
   */
  function setLoading(value: boolean) {
    loading.value = value
  }

  /**
   * 设置主题模式
   * @param value - 主题名称：'light' | 'dark'
   */
  function setTheme(value: string) {
    theme.value = value
  }

  /**
   * 设置错误信息
   * @param err - 错误对象，null 表示清除错误
   */
  function setError(err: Error | null) {
    error.value = err
  }

  // 返回状态和方法
  return {
    loading,
    theme,
    error,
    setLoading,
    setTheme,
    setError
  }
}) 