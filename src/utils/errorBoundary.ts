import { handleError } from './errorHandler'

/**
 * 全局未处理的 Promise 错误处理
 */
window.addEventListener('unhandledrejection', (event) => {
  handleError(event.reason)
})

/**
 * 全局运行时错误处理
 */
window.addEventListener('error', (event) => {
  handleError(event.error)
}) 