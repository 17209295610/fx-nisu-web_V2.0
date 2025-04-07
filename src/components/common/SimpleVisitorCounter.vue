<template>
  <div class="visitor-counter">
    <div
      class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
    >
      <el-icon class="text-primary"><View /></el-icon>
      <span class="text-gray-600">访客浏览量：</span>
      <span class="text-primary font-bold">{{ count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { View } from "@element-plus/icons-vue";

const count = ref(0);

onMounted(() => {
  // 从localStorage获取当前访问量
  const currentCount = parseInt(localStorage.getItem("visitorCount") || "0");
  // 增加访问量
  const newCount = currentCount + 1;
  // 保存新的访问量
  localStorage.setItem("visitorCount", newCount.toString());
  // 更新显示
  count.value = newCount;
});
</script>

<style scoped>
.visitor-counter {
  position: fixed;
  bottom: 100px;
  right: 20px;
  z-index: 100;
}

.visitor-counter:hover {
  transform: translateY(-2px);
}
</style>
