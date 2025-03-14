import type { App } from 'vue'

/**
 * Vue 插件接口定义
 */
export interface Plugin {
  /** 插件安装方法 */
  install: (app: App) => void
}

/**
 * Vue 全局属性扩展
 */
declare module 'vue' {
  interface ComponentCustomProperties {
    /** Element Plus 消息提示方法 */
    $message: typeof import('element-plus')['ElMessage']
    /** Element Plus 加载提示方法 */
    $loading: typeof import('element-plus')['ElLoading']
  }
} 