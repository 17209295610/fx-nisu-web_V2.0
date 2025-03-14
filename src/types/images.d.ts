/**
 * 图片资源类型声明文件
 */

/**
 * JPG 图片类型声明
 */
declare module '*.jpg' {
  /** 图片路径 */
  const src: string
  export default src
}

/**
 * PNG 图片类型声明
 */
declare module '*.png' {
  /** 图片路径 */
  const src: string
  export default src
}

/**
 * SVG 图片类型声明
 */
declare module '*.svg' {
  /** SVG 内容 */
  const content: string
  export default content
}

/**
 * WebP 图片类型声明
 */
declare module '*.webp' {
  /** 图片路径 */
  const src: string
  export default src
} 