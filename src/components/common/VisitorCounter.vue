<template>
  <div class="visitor-counter">
    <div
      class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
    >
      <el-icon class="text-primary"><View /></el-icon>
      <span class="text-gray-600">访问量：</span>
      <span class="text-primary font-bold">{{ visitorCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { View } from "@element-plus/icons-vue";
import { VisitorCounter } from "@/api/visitor";

const visitorCount = ref<number>(0);

onMounted(async () => {
  // 增加访问量
  const count = await VisitorCounter.incrementVisitor();
  if (count !== null) {
    visitorCount.value = count;
  }
});
</script>

<style scoped>
.visitor-counter {
  position: fixed;
  bottom: 100px;
  right: 20px;
  z-index: 100;
  transition: all 0.3s ease;
}

.visitor-counter:hover {
  transform: translateY(-2px);
}
</style>
