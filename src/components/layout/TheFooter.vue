<template>
  <!-- 页面底部 -->
  <footer class="bg-gray-900 text-gray-400 py-2">
    <div class="container mx-auto px-4">
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
            </p>
          </div>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="border-t border-gray-800 mt-2 pt-2 text-center text-sm">
        <p>
          ©
          {{ new Date().getFullYear() }}
          咸阳职业技术学院-信息工程学院【非泥莫属】团队. All rights reserved.
        </p>
      </div>
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
} from "@element-plus/icons-vue";
</script>
