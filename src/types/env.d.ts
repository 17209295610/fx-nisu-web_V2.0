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