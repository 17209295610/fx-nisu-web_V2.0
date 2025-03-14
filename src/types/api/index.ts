import type { ApiResponse, PaginationParams, PaginationData } from '@/types/api/base'

/**
 * 用户信息接口
 */
export interface UserInfo {
  /** 用户ID */
  id: number
  /** 用户名 */
  username: string
  /** 头像URL */
  avatar: string
  /** 用户角色 */
  role: string
}

/**
 * 产品信息接口
 */
export interface Product {
  /** 产品ID */
  id: number
  /** 产品名称 */
  name: string
  /** 产品描述 */
  description: string
  /** 产品图片URL */
  image: string
  /** 产品价格 */
  price: number
  /** 产品分类 */
  category: string
}

// 导出所有类型
export type {
  ApiResponse,
  PaginationParams,
  PaginationData
} 