<!-- 面包屑组件 -->
<template>
  <el-breadcrumb class="mb-4">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in items" :key="item.path" :to="item.path">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const items = computed(() => {
  const paths = route.path.split("/").filter(Boolean);
  return paths.map((path, index) => ({
    path: "/" + paths.slice(0, index + 1).join("/"),
    title: getBreadcrumbTitle(path),
  }));
});

const getBreadcrumbTitle = (path: string) => {
  const titleMap: Record<string, string> = {
    history: "历史文化",
    crafting: "制作工艺",
    "classic-products": "经典产品",
    "cultural-products": "文创产品",
    education: "科普动画",
    "interactive-games": "互动游戏",
    contact: "关于我们",
  };
  return titleMap[path] || path;
};
</script>
