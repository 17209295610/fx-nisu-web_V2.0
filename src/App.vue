<template>
  <el-config-provider :locale="zhCn">
    <TheHeader />
    <RouterView class="min-h-screen" />
    <TheFooter />
    <BackToTop />
    <MobileTabBar />
    <!-- 使用另一种设计方案 -->
    <div
      class="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 taobao-floating-btn"
    >
      <a
        href="https://shop342789194.m.taobao.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center px-3 py-4 rounded-l-xl shadow-lg transition-all duration-300 taobao-btn"
        title="访问官方淘宝店铺"
      >
        <!-- 上部图标 -->
        <div class="relative mb-2">
          <div
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"
          ></div>
          <div
            class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner"
          >
            <svg
              class="w-6 h-6 text-[#ff4400]"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M512 85.333c235.648 0 426.667 191.019 426.667 426.667S747.648 938.667 512 938.667 85.333 747.648 85.333 512 276.352 85.333 512 85.333zm-32 640a44.8 44.8 0 0 0 44.8-44.8V486.4H480a32 32 0 0 1 0-64h44.8v-44.8a44.8 44.8 0 0 0-89.6 0v44.8H390.4a32 32 0 1 1 0 64h44.8v194.133a44.8 44.8 0 0 0 44.8 44.8zm287.787-533.333H256.213c-45.227 0-68.267 51.797-36.906 83.2l231.253 231.253a63.744 63.744 0 0 0 90.24 0L772.16 275.2c31.317-31.403 8.32-83.2-36.907-83.2z"
              />
            </svg>
          </div>
        </div>

        <!-- 文字部分 -->
        <span class="text-sm font-bold mb-1">泥塑官方店</span>
        <div class="w-full h-px bg-white/30 my-1"></div>
        <span class="text-xs">立即购买</span>
      </a>
    </div>
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

/* 悬浮淘宝按钮样式 */
.taobao-floating-btn {
  transform: translateX(20px);
}

.taobao-btn {
  background: linear-gradient(135deg, #ff4400 0%, #ff7744 100%);
  color: white;
  box-shadow: -3px 3px 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 68, 0, 0.2);
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-right: none;
}

.taobao-floating-btn:hover {
  transform: translateX(0);
}

.taobao-btn:hover {
  box-shadow: -5px 5px 15px rgba(0, 0, 0, 0.25), 0 0 25px rgba(255, 68, 0, 0.3);
  padding-right: 15px;
}

.taobao-btn::before {
  content: "";
  position: absolute;
  inset: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  border-radius: 15px 0 0 15px;
  z-index: -1;
}

@keyframes shine {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.taobao-btn:hover::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  border-radius: 15px 0 0 15px;
  animation: shine 1.5s infinite;
  pointer-events: none;
}
</style>
