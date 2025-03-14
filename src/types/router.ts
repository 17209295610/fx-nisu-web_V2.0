import type { RouteRecordRaw, RouteMeta } from 'vue-router'

/**
 * 自定义路由元数据接口
 * 扩展自 Vue Router 的 RouteMeta
 */
export interface AppRouteMeta extends RouteMeta {
  /** 页面标题 */
  title: string
  /** 图标名称 */
  icon?: string
  /** 是否缓存页面 */
  keepAlive?: boolean
  /** 是否需要认证 */
  requiresAuth?: boolean
}

/**
 * 自定义路由记录类型
 * 扩展自 Vue Router 的 RouteRecordRaw
 */
export type AppRouteRecordRaw = Omit<RouteRecordRaw, 'meta' | 'children'> & {
  /** 路由元数据 */
  meta?: AppRouteMeta
  /** 子路由 */
  children?: AppRouteRecordRaw[]
} 