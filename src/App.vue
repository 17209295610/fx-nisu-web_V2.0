<template>
  <el-config-provider :locale="zhCn">
    <TheHeader />
    <RouterView class="min-h-screen" />
    <TheFooter />
    <BackToTop />
    <MobileTabBar />
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import BackToTop from "@/components/common/BackToTop.vue";
import MobileTabBar from "@/components/layout/MobileTabBar.vue";
</script>

<style>
@import "./styles/variables.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局加载动画 */
.loading-container {
  @apply fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50;
}

/* 优化字体显示 */
body {
  font-family: var(--font-family-secondary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-primary);
}

/* 增加响应式断点 */
@media (max-width: 1024px) {
  :root {
    --header-height: 60px;
  }
}

@media (min-width: 1024px) {
  :root {
    --header-height: 100px;
  }
}

/* 优化基础布局 */
.main-content {
  padding-top: var(--header-height);
}

/* 统一字体响应式 */
h1 {
  font-size: clamp(2rem, 5vw, 3rem);
}
h2 {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}
</style>
