/**
 * Vue 组件类型声明
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * 静态资源类型声明
 */
declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.mp3' {
  const value: string
  export default value
}

declare module '*.mp4' {
  const value: string
  export default value
}

/**
 * Element Plus 图标组件类型声明
 */
declare module '@element-plus/icons-vue' {
  const component: any
  export default component
}

/**
 * 环境变量类型声明
 */
interface ImportMetaEnv {
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** API基础路径 */
  readonly VITE_API_BASE_URL: string
  /** 静态资源路径 */
  readonly VITE_ASSETS_URL: string
}

/**
 * Element Plus 全局组件类型声明
 */
declare module 'vue' {
  export interface GlobalComponents {
    /** Element Plus 按钮组件 */
    ElButton: typeof import('element-plus')['ElButton']
    /** Element Plus 输入框组件 */
    ElInput: typeof import('element-plus')['ElInput']
    /** Element Plus 选择器组件 */
    ElSelect: typeof import('element-plus')['ElSelect']
    /** Element Plus 表单组件 */
    ElForm: typeof import('element-plus')['ElForm']
    /** Element Plus 表单项组件 */
    ElFormItem: typeof import('element-plus')['ElFormItem']
    /** Element Plus 对话框组件 */
    ElDialog: typeof import('element-plus')['ElDialog']
    /** Element Plus 轮播图组件 */
    ElCarousel: typeof import('element-plus')['ElCarousel']
    /** Element Plus 轮播图项组件 */
    ElCarouselItem: typeof import('element-plus')['ElCarouselItem']
    /** Element Plus 图片组件 */
    ElImage: typeof import('element-plus')['ElImage']
    /** Element Plus 骨架屏组件 */
    ElSkeleton: typeof import('element-plus')['ElSkeleton']
    /** Element Plus 结果页组件 */
    ElResult: typeof import('element-plus')['ElResult']
  }
} 