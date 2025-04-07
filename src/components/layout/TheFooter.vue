<template>
  <!-- 页面底部 -->
  <footer class="bg-gray-900 text-gray-400 py-2 relative overflow-hidden">
    <!-- 添加动态背景效果 -->
    <div class="footer-particles absolute inset-0 opacity-10"></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Logo和简介 -->
        <div class="space-y-2">
          <img src="@/assets/images/logo.png" alt="Logo" class="h-10" />
          <p class="text-sm">
            凤翔泥塑，陕西省非物质文化遗产，千年工艺传承，匠心独运的艺术瑰宝。该网站由咸阳职业技术学院信息工程学院"非泥莫属"团队打造。
          </p>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="text-white font-bold mb-2">快速链接</h3>
          <div class="grid grid-cols-2 gap-x-4 gap-y-1">
            <li>
              <router-link to="/" class="hover:text-primary transition-colors">
                首页
              </router-link>
            </li>
            <li>
              <router-link
                to="/history"
                class="hover:text-primary transition-colors"
              >
                历史文化
              </router-link>
            </li>
            <li>
              <router-link
                to="/crafting"
                class="hover:text-primary transition-colors"
              >
                制作工艺
              </router-link>
            </li>
            <li>
              <router-link
                to="/classic-products"
                class="hover:text-primary transition-colors"
              >
                经典产品
              </router-link>
            </li>
            <li>
              <router-link
                to="/cultural-products"
                class="hover:text-primary transition-colors"
              >
                文创产品
              </router-link>
            </li>
            <li>
              <router-link
                to="/education"
                class="hover:text-primary transition-colors"
              >
                科普视频
              </router-link>
            </li>
            <li>
              <router-link
                to="/interactive-games"
                class="hover:text-primary transition-colors"
              >
                互动游戏
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="hover:text-primary transition-colors"
              >
                联系我们
              </router-link>
            </li>
          </div>
        </div>

        <!-- 联系方式 -->
        <div>
          <h3 class="text-white font-bold mb-2">联系我们</h3>
          <ul class="space-y-1 text-sm">
            <li class="flex items-center gap-2">
              <el-icon><Location /></el-icon>
              陕西省咸阳市咸阳职业技术学院信息工程学院
            </li>
            <li class="flex items-center gap-2">
              <el-icon><Phone /></el-icon>
              17209295610
            </li>
            <li class="flex items-center gap-2">
              <el-icon><Message /></el-icon>
              投稿：2798156978@qq.com
            </li>
          </ul>
        </div>

        <!-- 团队信息 -->
        <div>
          <h3 class="text-white font-bold mb-2">团队信息</h3>
          <div class="space-y-2">
            <p class="text-sm">
              "非泥莫属"团队
              <br />
              咸阳职业技术学院信息工程学院
              <br />
              2025年大学生挑战杯&互联网+创新创业大赛参赛作品
              <br />
              暨陕西省非物质文化遗产凤翔泥塑数字化展示平台
            </p>
          </div>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="border-t border-gray-800 mt-2 pt-2 text-center text-sm">
        <div class="flex items-center justify-center gap-4">
          <p>
            © {{ new Date().getFullYear() }}
            咸阳职业技术学院-信息工程学院【非泥莫属】团队. All rights reserved.
          </p>
          <!-- 修改访问量显示为人气指数 -->
          <div class="flex items-center gap-2">
            <el-icon><Star /></el-icon>
            <span>站点访客浏览量：{{ count }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加波浪装饰 -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg
        class="relative block w-full h-6"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="fill-primary/10"
        ></path>
      </svg>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  Location,
  Phone,
  Message,
  Platform,
  Share,
  View,
  Star,
} from "@element-plus/icons-vue";
import { ref, onMounted } from "@vue/runtime-dom";

const count = ref(0);

const getVisitorCount = async (retries = 3) => {
  try {
    const response = await fetch("/.netlify/functions/visitor");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    count.value = data.count;
  } catch (error) {
    console.error("获取访问量失败：", error);
    if (retries > 0) {
      // 如果失败，等待1秒后重试
      setTimeout(() => {
        getVisitorCount(retries - 1);
      }, 1000);
    }
  }
};

onMounted(() => {
  getVisitorCount();
});
</script>

<style scoped>
/* 添加页脚粒子动画 */
.footer-particles {
  background-image: radial-gradient(
    circle,
    var(--el-color-primary) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
  animation: particleAnimation 15s infinite linear;
}

@keyframes particleAnimation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 400px 400px;
  }
}

/* 链接悬停效果 */
a {
  position: relative;
  transition: all 0.3s ease;
}

a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: var(--el-color-primary);
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}
</style>
