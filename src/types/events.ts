/**
 * 全局事件总线事件类型定义
 */
export interface EventBusEvents {
  /** 主题更新事件 */
  'update:theme': string
  /** 加载状态更新事件 */
  'update:loading': boolean
  /** 错误事件 */
  'error': Error
  /** 其他动态事件 */
  [key: string]: any
} 