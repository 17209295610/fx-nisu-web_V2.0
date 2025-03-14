// 导入Vue类型
import type { App } from 'vue'
import components from './components'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/**
 * 设置全局插件
 * @param app - Vue 应用实例
 */
export function setupPlugins(app: App) {
  // 状态管理
  app.use(createPinia())
  
  // UI 框架
  app.use(ElementPlus)
  
  // 全局组件
  app.use(components)
} 