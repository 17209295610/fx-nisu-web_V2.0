// 导入Vue类型
import type { App } from 'vue';
import { 
  Breadcrumb, 
  BackToTop, 
  LoadingState, 
  ErrorBoundary 
} from '@/components/common';

/**
 * 全局组件注册插件
 */
export default {
  /**
   * 安装插件
   * @param app - Vue 应用实例
   */
  install(app: App) {
    // 注册通用组件
    app.component('Breadcrumb', Breadcrumb);
    app.component('BackToTop', BackToTop);
    app.component('LoadingState', LoadingState);
    app.component('ErrorBoundary', ErrorBoundary);
  }
}; 