<template>
  <div class="visitor-count">
    <div class="flex items-center justify-center space-x-1 text-sm text-gray-600">
      <el-icon><View /></el-icon>
      <span v-if="pv > 0">访问量：{{ pv }}</span>
      <span v-else class="text-gray-400">统计加载中...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { View } from "@element-plus/icons-vue"

const pv = ref(0)
let checkInterval: number | null = null

onMounted(() => {
  checkInterval = window.setInterval(() => {
    try {
      if (window._hmt && typeof window._hmt._getPV === 'function') {
        const newPV = window._hmt._getPV()
        if (newPV > pv.value) {
          pv.value = newPV
        }
      }
    } catch (e) {
      console.error('统计获取失败', e)
    }
  }, 2000) // 每2秒检查一次
})

onUnmounted(() => {
  checkInterval && clearInterval(checkInterval)
})
</script>

<style scoped>
.visitor-count {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.visitor-count:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .visitor-count {
    bottom: 70px;
  }
}
</style>
