/**
 * Vite 类型声明文件
 */

/// <reference types="vite/client" />

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
declare module '*.svg' {
  /** SVG 文件内容 */
  const content: string
  export default content
}

/**
 * Markdown 文件类型声明
 */
declare module '*.md' {
  /** Markdown 文件内容 */
  const content: string
  export default content
} 