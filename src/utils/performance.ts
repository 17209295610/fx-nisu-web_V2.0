import { ref } from 'vue';
import type { Ref } from 'vue';

/**
 * 图片预加载 Hook
 * @param images - 需要预加载的图片URL数组
 * @returns 加载状态和进度
 */
export const useImagePreload = (images: string[]) => {
  const loaded: Ref<boolean> = ref(false);
  const progress: Ref<number> = ref(0);
  const total = images.length;
  let count = 0;

  /**
   * 开始预加载图片
   */
  const preloadImages = () => {
    images.forEach(src => {
      const img = new Image();
      img.onload = () => {
        count++;
        progress.value = Math.floor((count / total) * 100);
        if (count === total) {
          loaded.value = true;
        }
      };
      img.src = src;
    });
  };

  return {
    loaded,
    progress,
    preloadImages
  };
}; 