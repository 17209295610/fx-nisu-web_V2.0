<template>
  <div class="visitor-count">
    <div class="flex items-center justify-center space-x-1 text-sm text-gray-600">
      <el-icon><View /></el-icon>
      <span v-if="isLoaded && pv > 0">访问量：{{ pv }}</span>
      <span v-else class="text-gray-400">
        访问量统计
        <el-tooltip content="数据来自百度统计后台" placement="top">
          <el-icon class="ml-1"><InfoFilled /></el-icon>
        </el-tooltip>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { View } from "@element-plus/icons-vue"
import { InfoFilled } from '@element-plus/icons-vue'

const pv = ref(0)
const isLoaded = ref(false)

onMounted(() => {
  const checkPV = () => {
    try {
      // 移除百度统计API直接调用
      pv.value = 0  // 临时占位值
      isLoaded.value = true  // 强制显示加载完成
    } catch (e) {
      console.error('统计获取失败', e)
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
