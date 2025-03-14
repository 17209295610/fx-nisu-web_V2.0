<!-- 返回顶部组件 -->
<template>
  <div class="back-to-top" :class="{ show: show }" @click="scrollToTop">
    <el-icon><ArrowUp /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ArrowUp } from "@element-plus/icons-vue";

const show = ref(false);

const handleScroll = () => {
  show.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--el-color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.back-to-top.show {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--el-color-primary-light-3);
}

/* 添加图标样式 */
.back-to-top .el-icon {
  font-size: 20px;
}
</style>
