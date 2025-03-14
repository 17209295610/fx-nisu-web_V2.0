import { createApp } from '@vue/runtime-dom'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'  // Element Plus 样式
import '@/styles/element.scss'  // Element Plus 主题
import '@/assets/main.css'  // 自定义样式

import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { setupPlugins } from './plugins'
import { validateEnv } from './utils/env'
import './utils/errorBoundary'

// 强制响应式系统优先加载
import '@vue/reactivity'
import '@vue/runtime-core'

// 验证环境变量
validateEnv()

const app = createApp(App)

// 注册 Element Plus
app.use(ElementPlus, {
  size: 'default',
  zIndex: 3000
})

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

// 设置插件
setupPlugins(app)

app.mount('#app') 