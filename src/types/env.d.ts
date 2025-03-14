/// <reference types="vite/client" />

/**
 * Vite 环境变量类型定义
 */
interface ImportMetaEnv {
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** API基础路径 */
  readonly VITE_API_BASE_URL: string
  /** 静态资源路径 */
  readonly VITE_ASSETS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


// 原始声明
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ASSETS_URL: string
}

// 建议合并 vite-env.d.ts 声明
declare interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ASSETS_URL: string
  // 新增开发模式专用变量
  readonly VITE_DEV_MOCK?: 'true' | 'false'
}


### 2. 环境变量配置检查
在 <mcfile name="env.d.ts" path="h:\ns_web\fengxiang-nisu\fengxiang-nisu\src\types\env.d.ts"></mcfile> 中发现重复声明问题：