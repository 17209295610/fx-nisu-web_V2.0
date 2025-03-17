<template>
  <div>
    <!-- 添加占位元素，防止内容被固定导航栏遮挡 -->
    <div class="h-[100px]"></div>

    <!-- 添加 fixed 定位和背景模糊效果 -->
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-primary)]/98 backdrop-blur-sm shadow-clay transition-all duration-300"
    >
      <nav class="container mx-auto px-4 py-2">
        <div class="flex items-center justify-between">
          <!-- Logo 和标题区域 -->
          <div class="flex items-center space-x-4 -ml-6">
            <div
              class="w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300"
            >
              <img
                src="../../assets/images/logo.png"
                alt="凤翔泥塑"
                class="w-full h-full object-cover transform hover:scale-105 transition-all duration-300"
              />
            </div>
            <div class="flex flex-col -ml-1">
              <h1
                class="text-2xl font-bold text-[var(--color-primary)] whitespace-nowrap"
                style="font-family: var(--font-family-primary)"
              >
                陕西·宝鸡·凤翔泥塑
              </h1>
              <div
                class="text-base text-[var(--color-text-secondary)] whitespace-nowrap"
                style="font-family: var(--font-family-secondary)"
              >
                非物质文化遗产传承基地
              </div>
            </div>
          </div>

          <!-- 中间导航区域 - 调整样式 -->
          <div class="hidden lg:flex flex-1 justify-center px-4">
            <el-menu
              mode="horizontal"
              :router="true"
              class="border-none bg-transparent flex-1 justify-center"
              :ellipsis="false"
              :default-active="activeIndex"
            >
              <div class="flex items-center justify-center w-full gap-4">
                <el-menu-item index="/">
                  <template #title>
                    <span class="nav-text px-3">首页</span>
                  </template>
                </el-menu-item>

                <el-sub-menu index="/history">
                  <template #title>
                    <span class="nav-text px-3">历史文化</span>
                  </template>
                  <el-menu-item index="/history#origin">
                    <el-icon><component :is="icons.Collection" /></el-icon
                    >泥塑起源
                  </el-menu-item>
                  <el-menu-item index="/history#development">
                    <el-icon><component :is="icons.Timer" /></el-icon>发展历程
                  </el-menu-item>
                  <el-menu-item index="/history#culture">
                    <el-icon><component :is="icons.Medal" /></el-icon>文化渊源
                  </el-menu-item>
                  <el-menu-item index="/history#inheritors">
                    <el-icon><component :is="icons.User" /></el-icon>技艺传承人
                  </el-menu-item>
                </el-sub-menu>

                <el-menu-item index="/crafting">
                  <template #title>
                    <span class="nav-text px-2">制作工艺</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="/classic-products">
                  <template #title>
                    <span class="nav-text px-2">经典产品</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="/cultural-products">
                  <template #title>
                    <span class="nav-text px-2">文创产品</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="/education">
                  <template #title>
                    <span class="nav-text px-2">科普视频</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="/interactive-games">
                  <template #title>
                    <span class="nav-text px-2">互动游戏</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="/contact">
                  <template #title>
                    <span class="nav-text px-2">关于我们</span>
                  </template>
                </el-menu-item>
              </div>
            </el-menu>
          </div>

          <!-- 右侧时间显示部分 -->
          <div class="hidden lg:flex items-center space-x-4">
            <el-card class="time-card" shadow="hover">
              <div class="flex items-center">
                <!-- 日期部分 -->
                <div class="flex flex-col items-center pr-2">
                  <div class="text-sm text-[var(--color-text-secondary)]">
                    {{ dateInfo.day }}
                  </div>
                  <div class="text-lg font-bold text-[var(--color-primary)]">
                    {{ dateInfo.date }}
                  </div>
                </div>

                <!-- 时间部分 -->
                <div
                  class="flex flex-col items-center pl-2 border-l border-[var(--color-border)]"
                >
                  <div class="text-sm text-[var(--color-text-secondary)]">
                    {{ timeInfo.period }}
                  </div>
                  <div
                    class="text-lg font-mono font-bold text-[var(--color-text-primary)]"
                  >
                    {{ timeInfo.time }}
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>

        <!-- 移动端导航菜单 -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <div v-show="isMenuOpen" class="lg:hidden mt-2">
            <el-menu
              :default-active="activeIndex"
              mode="vertical"
              class="border-none rounded-lg shadow-lg"
            >
              <el-menu-item index="/">
                <el-icon><component :is="icons.HomeFilled" /></el-icon>首页
              </el-menu-item>

              <!-- 移动端历史文化下拉菜单 -->
              <el-sub-menu index="/history">
                <template #title>
                  <el-icon><component :is="icons.Collection" /></el-icon>
                  <span>历史文化</span>
                </template>
                <el-menu-item
                  v-for="section in historySections"
                  :key="section.anchor"
                  :index="`/history${section.anchor}`"
                  @click="handleSectionClick(section.anchor)"
                >
                  {{ section.title }}
                </el-menu-item>
              </el-sub-menu>

              <el-menu-item index="/crafting">制作工艺</el-menu-item>
              <el-menu-item index="/classic-products">经典产品</el-menu-item>
              <el-menu-item index="/cultural-products">文创产品</el-menu-item>
              <el-menu-item index="/education">科普视频</el-menu-item>
              <el-menu-item index="/interactive-games">互动游戏</el-menu-item>
              <el-menu-item index="/contact">关于我们</el-menu-item>
            </el-menu>
          </div>
        </transition>
      </nav>
    </header>

    <!-- 桌面端导航栏 -->
    <div
      class="hidden lg:block fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-lg"
    >
      <header>
        <nav class="container mx-auto px-4 py-2">
          <div class="flex items-center justify-between">
            <!-- 左侧Logo和标题区域 -->
            <div class="flex items-center space-x-4 -ml-6">
              <!-- Logo 放大到 20 -->
              <div class="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                <img
                  src="../../assets/images/logo.png"
                  alt="凤翔泥塑"
                  class="w-full h-full object-cover transform hover:scale-105 transition-all duration-300"
                />
              </div>
              <!-- 标题区域 -->
              <div class="flex flex-col -ml-1">
                <h1
                  class="text-2xl font-bold text-primary whitespace-nowrap"
                  style="font-family: 'STKaiti', 'KaiTi', serif"
                >
                  陕西·宝鸡·凤翔泥塑
                </h1>
                <div
                  class="text-base text-gray-600 whitespace-nowrap"
                  style="font-family: 'STSong', 'SimSun', serif"
                >
                  非物质文化遗产传承基地
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>

    <!-- 移动端导航栏 -->
    <div
      class="lg:hidden fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md shadow-lg"
      style="height: 60px"
    >
      <div
        class="container mx-auto px-4 py-2 flex items-center justify-between"
      >
        <!-- 汉堡菜单 -->
        <el-button
          @click="isMobileMenuVisible = !isMobileMenuVisible"
          class="!p-2"
          text
        >
          <el-icon :size="24">
            <Menu />
          </el-icon>
        </el-button>

        <!-- 移动端Logo -->
        <div class="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="@/assets/images/logo.png"
            alt="凤翔泥塑"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- 移动端下拉菜单 -->
      <transition name="el-zoom-in-top">
        <div
          v-show="isMobileMenuVisible"
          class="absolute w-full bg-white shadow-lg"
        >
          <el-menu
            :default-active="$route.path"
            :router="true"
            class="border-none"
          >
            <el-menu-item index="/">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>

            <el-sub-menu index="/history">
              <template #title>
                <el-icon><Collection /></el-icon>
                <span>历史文化</span>
              </template>
              <el-menu-item index="/history#origin">泥塑起源</el-menu-item>
              <el-menu-item index="/history#development">发展历程</el-menu-item>
              <el-menu-item index="/history#culture">文化渊源</el-menu-item>
              <el-menu-item index="/history#inheritors"
                >技艺传承人</el-menu-item
              >
            </el-sub-menu>

            <el-menu-item index="/crafting">制作工艺</el-menu-item>
            <el-menu-item index="/classic-products">经典产品</el-menu-item>
            <el-menu-item index="/cultural-products">文创产品</el-menu-item>
            <el-menu-item index="/education">科普视频</el-menu-item>
            <el-menu-item index="/interactive-games">互动游戏</el-menu-item>
            <el-menu-item index="/contact">关于我们</el-menu-item>
          </el-menu>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "@vue/runtime-dom";
import { useRoute, useRouter } from "vue-router";
import { useMediaQuery } from "@vueuse/core";

// 导入图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 注册所有图标
const icons = ElementPlusIconsVue;

const route = useRoute();
const router = useRouter();
const isMenuOpen = ref(false);
const time = ref("");
const date = ref("");
const activeIndex = ref("/");

// 历史文化页面的各个部分
const historySections = [
  { anchor: "#origin", title: "泥塑起源" },
  { anchor: "#development", title: "发展历程" },
  { anchor: "#culture", title: "文化渊源" },
  { anchor: "#inheritors", title: "技艺传承人" },
];

// 添加日期和时间的响应式数据
const dateInfo = ref({
  year: "",
  date: "",
  day: "",
});

const timeInfo = ref({
  time: "",
  period: "",
});

// 处理部分跳转
const handleSectionClick = async (anchor: string) => {
  try {
    isMenuOpen.value = false;
    await router.push({
      path: "/history",
      hash: anchor,
    });
    await nextTick();
    const element = document.querySelector(anchor);
    if (element) {
      const headerHeight = 100;
      const rect = element.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.pageYOffset - headerHeight,
        behavior: "smooth",
      });
    }
  } catch (error) {
    console.error("Navigation error:", error);
  }
};

// 监听路由变化
watch(
  () => route.fullPath,
  async () => {
    activeIndex.value = route.path;

    if (route.hash && route.path === "/history") {
      await nextTick();
      const element = document.querySelector(route.hash);
      if (element) {
        const headerHeight = 100;
        const rect = element.getBoundingClientRect();
        const offsetPosition = rect.top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  },
  { immediate: true }
);

// 更新时间的函数
const updateTime = () => {
  const now = new Date();
  const days = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  // 更新日期信息
  dateInfo.value = {
    year: now.getFullYear().toString(),
    date: `${(now.getMonth() + 1).toString().padStart(2, "0")}/${now
      .getDate()
      .toString()
      .padStart(2, "0")}`,
    day: days[now.getDay()],
  };

  // 更新时间信息
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  timeInfo.value = {
    time: `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
    period: hours < 12 ? "上午" : "下午",
  };
};

let timer: number;

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
  window.removeEventListener("scroll", handleScroll);
});

// 处理锚点跳转
const handleAnchorClick = (anchor: string) => {
  const element = document.querySelector(anchor);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// 可以添加滚动监听来改变导航栏样式
const handleScroll = () => {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header?.classList.add("header-shadow");
  } else {
    header?.classList.remove("header-shadow");
  }
};

// 添加滚动监听
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 移除滚动监听
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 处理下拉菜单点击
const handleCommand = (command: string) => {
  router.push(command);
};

const isMobile = useMediaQuery("(max-width: 1024px)");
const isMobileMenuVisible = ref(false);

// 路由变化时自动关闭菜单
watch(
  () => route.path,
  () => {
    if (isMobile.value) {
      isMobileMenuVisible.value = false;
    }
  }
);
</script>

<style scoped>
/* 导航链接基础样式 */
.nav-link {
  color: var(--color-text-primary);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: rgba(139, 69, 19, 0.05);
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

/* 导航菜单样式 */
:deep(.el-menu) {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-bottom: none !important;
  box-shadow: 0 1px 0 var(--color-border-light);
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  height: 4rem;
  line-height: 4rem;
  padding: 0 0.75rem;
  font-family: var(--font-family-primary);
  color: var(--color-text-primary);
  font-size: 1.125rem;
  transition: all 0.3s ease;
  position: relative;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: rgba(139, 69, 19, 0.08);
  color: var(--color-primary) !important;
}

:deep(.el-menu-item.is-active) {
  font-weight: 600;
  color: var(--color-primary) !important;
  background-color: rgba(139, 69, 19, 0.12) !important;
}

:deep(.el-menu-item.is-active)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 80%;
  height: 2px;
  background: var(--color-primary);
  transform: translateX(-50%);
}

/* 时间卡片样式 */
.time-card {
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  max-width: 180px;
}

.time-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

:deep(.el-card__body) {
  padding: 0.5rem 0.75rem;
}

/* 数字跳动动画 */
.text-2xl {
  transition: all 0.3s ease;
}

.text-2xl:hover {
  color: var(--color-primary);
  transform: scale(1.1);
}

/* 图标动画 */
.el-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 下拉菜单样式 */
:deep(.el-menu--popup) {
  border-radius: 0.5rem;
  box-shadow: 0 4px 16px var(--color-shadow);
  border: 1px solid var(--color-border-light);
  margin-top: 0.5rem;
  background: linear-gradient(
    to bottom right,
    rgba(253, 245, 230, 0.98),
    rgba(250, 240, 230, 0.98)
  ) !important;
  backdrop-filter: blur(12px);
}

:deep(.el-menu--popup .el-menu-item) {
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 0 1rem;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

:deep(.el-menu--popup .el-menu-item:hover) {
  background-color: rgba(139, 69, 19, 0.05) !important;
  color: var(--color-primary) !important;
}

/* 移动端样式 */
@media (max-width: 1024px) {
  :deep(.el-menu--vertical) {
    background-color: var(--color-bg-primary) !important;
  }

  :deep(.el-menu--vertical .el-menu-item) {
    height: 3rem;
    padding-left: 1.5rem !important;
  }

  .time-card {
    transform: scale(0.9);
    margin-right: -0.5rem;
  }
}

/* 动画效果 */
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  transition: all 0.3s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.el-zoom-in-top-enter-from,
.el-zoom-in-top-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 滚动阴影效果 */
.header-shadow {
  box-shadow: 0 4px 12px var(--color-shadow);
  background: linear-gradient(
    to bottom,
    var(--color-bg-primary),
    var(--color-bg-primary)
  );
}

/* 内容间距 */
.main-content {
  padding-top: 100px;
}
</style>
