<template>
  <div class="visitor-count">
    <div
      class="flex items-center justify-center space-x-1 text-sm text-gray-600"
    >
      <el-icon><View /></el-icon>
      <span>访客浏览量：999+</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 移除所有统计逻辑
</script>

<style scoped>
.visitor-count {
  position: fixed;
  bottom: 20px;  /* 调整到底部间距 */
  right: 20px;   /* 调整到右侧间距 */
  padding: 8px 12px;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.visitor-count .flex {
  background: rgba(255, 255, 255, 0.15);
  padding: 6px 15px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  /* 新增定位微调 */
  transform: translate(10px, 10px); 
}

@media (max-width: 768px) {
  .visitor-count {
    bottom: 20px;  /* 移动端保持相同间距 */
    right: 10px;
    transform: none; /* 移除移动端偏移 */
  }
}
</style>
