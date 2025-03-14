/**
 * API 基础响应接口
 * @template T 响应数据类型
 */
export interface ApiResponse<T = any> {
  /** 响应状态码 */
  code: number
  /** 响应数据 */
  data: T
  /** 响应消息 */
  message: string
}

/**
 * 分页请求参数接口
 */
export interface PaginationParams {
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
}

/**
 * 分页响应数据接口
 * @template T 列表项类型
 */
export interface PaginationData<T> {
  /** 数据列表 */
  list: T[]
  /** 总数量 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
} 