import request from '@/utils/request'
import type { ApiResponse } from '@/types/api'

export const api = {
  // 用户相关
  user: {
    login: (data: any) => 
      request.post<ApiResponse>('/user/login', data),
    info: () => 
      request.get<ApiResponse>('/user/info')
  },
  
  // 产品相关
  product: {
    list: (params: any) => 
      request.get<ApiResponse>('/product/list', { params }),
    detail: (id: number) => 
      request.get<ApiResponse>(`/product/${id}`)
  }
}

export default api 