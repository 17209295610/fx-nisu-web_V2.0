// 导入Vue类型

import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { handleError } from '@/utils/errorHandler'

/**
 * 设置路由守卫
 * @param router - Vue Router 实例
 */
export function setupRouterGuard(router: Router) {
  /**
   * 路由前置守卫
   */
  router.beforeEach((to, from, next) => {
    NProgress.start()
    try {
      // 设置页面标题
      document.title = `${to.meta.title} - 凤翔泥塑`
      next()
    } catch (error) {
      handleError(error as Error)
      next(false)
    }
  })

  /**
   * 路由后置守卫
   */
  router.afterEach(() => {
    NProgress.done()
  })

  /**
   * 路由错误处理
   */
  router.onError((error) => {
    handleError(error)
    NProgress.done()
  })
} 