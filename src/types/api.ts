// API 响应接口
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 分页请求参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应数据
export interface PaginationData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
} 