import { ElMessage } from 'element-plus';

/**
 * 统一错误处理函数
 * @param error - 错误对象
 */
export const handleError = (error: Error): void => {
  console.error('Error:', error);
  ElMessage.error({
    message: error.message || '发生错误，请稍后重试',
    duration: 3000
  });
};

/**
 * API 错误处理包装函数
 * @param promise - 需要处理错误的 Promise
 * @returns Promise 执行结果
 */
export const handleApiError = async (promise: Promise<any>): Promise<any> => {
  try {
    return await promise;
  } catch (error) {
    handleError(error as Error);
    throw error;
  }
}; 