// 导入Vue类型
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置数组
 * 定义应用的所有路由规则
 * @type {RouteRecordRaw[]}
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      /** 页面标题 */
      title: '首页',
      /** 是否缓存该页面 */
      keepAlive: true
    }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/HistoryView.vue'),
    meta: {
      /** 页面标题 */
      title: '历史文化'
    }
  },
  {
    path: '/crafting',
    name: 'crafting',
    component: () => import('../views/CraftingView.vue'),
    meta: {
      /** 页面标题 */
      title: '制作工艺'
    }
  },
  {
    path: '/classic-products',
    name: 'classicProducts',
    component: () => import('../views/ClassicProductsView.vue'),
    meta: {
      /** 页面标题 */
      title: '经典产品'
    }
  },
  {
    path: '/cultural-products',
    name: 'cultural-products',
    component: () => import('../views/CulturalProductsView.vue'),
    meta: {
      /** 页面标题 */
      title: '文创产品'
    }
  },
  {
    path: '/education',
    name: 'education',
    component: () => import('../views/EducationView.vue'),
    meta: {
      /** 页面标题 */
      title: '科普动画'
    }
  },
  {
    path: '/interactive-games',
    name: 'interactive-games',
    component: () => import('../views/InteractiveGamesView.vue'),
    meta: {
      /** 页面标题 */
      title: '互动游戏'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      /** 页面标题 */
      title: '联系我们'
    }
  }
]

/**
 * 创建路由实例
 * 使用 HTML5 历史记录模式
 */
const router = createRouter({
  /**
   * 使用 HTML5 的 History 路由模式
   * 可以让 URL 更加美观，不带 # 号
   */
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  /**
   * 控制页面滚动行为
   * @param to - 目标路由
   * @param from - 来源路由
   * @param savedPosition - 保存的位置（浏览器前进/后退时有效）
   */
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，则恢复到保存的位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果有锚点，则滚动到锚点位置
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100
      }
    }
    // 默认滚动到顶部
    return { top: 0 }
  }
})

/**
 * 全局前置守卫
 * 在路由跳转前执行
 * 主要用于设置页面标题
 */
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} - 凤翔泥塑`
  next()
})

router.afterEach((to) => {
  // 添加百度统计路由跟踪
  if (window._hmt && to.path) {
    window._hmt.push(['_trackPageview', to.fullPath])
  }
})

export default router