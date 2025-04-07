<template>
  <div class="visitor-count">
    <div class="flex items-center justify-center space-x-1 text-sm text-gray-600">
      <el-icon><View /></el-icon>
      <span v-if="isLoaded">访问量：{{ pv }}</span>
      <span v-else class="text-gray-400">统计初始化中...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { View } from "@element-plus/icons-vue"

const pv = ref(0)
const isLoaded = ref(false)

onMounted(() => {
  const checkPV = () => {
    if (window._hmt?._getPV) {
      pv.value = window._hmt._getPV()
      isLoaded.value = true
    } else {
      setTimeout(checkPV, 1000)
    }
  }
  checkPV()
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
