<template>
  <div class="fixed bottom-0 right-0 z-50">
    <div
      class="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-tl-full text-white/80 text-xs hover:bg-black/30 transition-all duration-300"
    >
      <el-icon class="text-xs"><View /></el-icon>
      <span>{{ formatNumber(count) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "@vue/runtime-dom";
import { View } from "@element-plus/icons-vue";

const count = ref(0);

// 格式化数字显示（添加千位分隔符）
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

onMounted(() => {
  // 获取总访问量
  const currentCount = parseInt(localStorage.getItem("visitorCount") || "0");
  const newCount = currentCount + 1;
  localStorage.setItem("visitorCount", newCount.toString());
  count.value = newCount;
});
</script>

<style scoped>
.fixed > div {
  transform: translateY(0);
  transition: all 0.3s ease;
}

.fixed > div:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.text-sm {
  transition: all 0.3s ease;
}

.text-sm:hover {
  color: var(--el-color-primary);
}
</style>
