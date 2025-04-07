<template>
  <div class="visitor-count">
    <div
      class="flex items-center justify-center space-x-1 text-sm text-gray-600"
    >
      <el-icon><View /></el-icon>
      <span>访问量：{{ visitorCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { View } from "@element-plus/icons-vue";

const visitorCount = ref(0);

const getVisitorCount = async () => {
  try {
    // 注意这里的路径，确保与 netlify.toml 中的配置匹配
    const response = await fetch("/.netlify/functions/visitor");
    console.log("API Response:", response); // 添加日志

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Visitor Data:", data); // 添加日志

    visitorCount.value = data.count;
  } catch (error) {
    console.error("获取访问量失败：", error);
  }
};

onMounted(() => {
  console.log("Component mounted"); // 添加日志
  getVisitorCount();
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
