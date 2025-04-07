<template>
  <div
    class="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg-up z-40"
  >
    <div class="flex justify-between items-center h-12 px-2">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center justify-center min-w-[48px] h-full px-1"
        :class="{ 'text-primary': route.path === item.path }"
      >
        <el-icon :size="16">
          <component :is="item.icon" />
        </el-icon>
        <span class="text-[10px] mt-0.5 whitespace-nowrap">{{
          item.label
        }}</span>
      </router-link>
    </div>
  </div>

  <!-- 调整底部间距 -->
  <div class="lg:hidden h-12 sm:h-16"></div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  HomeFilled,
  Collection,
  Brush,
  Present,
  VideoPlay,
  Platform,
  User,
  Goods,
} from "@element-plus/icons-vue";

const route = useRoute();

const navItems = [
  { path: "/", label: "首页", icon: HomeFilled },
  { path: "/history", label: "历史文化", icon: Collection },
  { path: "/crafting", label: "制作工艺", icon: Brush },
  { path: "/classic-products", label: "经典产品", icon: Present },
  { path: "/cultural-products", label: "文创产品", icon: Goods },
  { path: "/education", label: "科普动画", icon: VideoPlay },
  { path: "/interactive-games", label: "互动游戏", icon: Platform },
  { path: "/contact", label: "关于我们", icon: User },
];
</script>

<style scoped>
.shadow-lg-up {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

/* 激活状态 */
.text-primary {
  color: var(--color-primary);
}

/* 点击反馈 */
.router-link-active {
  @apply text-primary;
}

/* 导航项悬停效果 */
.router-link-active .el-icon {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

router-link {
  @apply active:scale-95 transition-transform;
  min-width: 3rem;
}

/* 确保文字不换行且完整显示 */
span {
  @apply truncate max-w-[4em];
}

/* 优化小屏幕显示 */
@media (max-width: 375px) {
  .router-link {
    min-width: 2.5rem;
    padding: 0 0.25rem;
  }
  span {
    font-size: 0.6rem;
  }
}
</style>
