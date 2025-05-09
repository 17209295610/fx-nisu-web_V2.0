<template>
  <div class="min-h-screen bg-pattern">
    <!-- 顶部横条 -->
    <div class="relative h-[450px] bg-primary overflow-hidden">
      <!-- 背景图片 -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-40"
        :style="{ backgroundImage: `url(${bannerBg})` }"
      ></div>
      <!-- 渐变遮罩 -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"
      ></div>
      <!-- 装饰元素 -->
      <div
        class="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-24 h-24 border-2 border-white/20 rounded-full animate-pulse"
        style="animation-delay: 1s"
      ></div>
      <!-- 内容区域 -->
      <div class="container mx-auto px-4 h-full flex items-center relative">
        <div class="max-w-3xl animate-fadeIn">
          <div
            class="inline-block bg-primary/80 px-4 py-2 rounded-lg mb-6 shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <span class="text-white/90 text-lg">文创产品</span>
          </div>
          <h1
            class="text-6xl font-bold mb-8 text-white text-shadow-lg animate-slideUp"
          >
            非遗文创产品展示
          </h1>
          <p
            class="text-2xl text-white/90 font-light animate-slideUp animation-delay-200"
          >
            传统创新 • 匠心独运 • 文化传承
          </p>
        </div>
      </div>
    </div>

    <!-- 页面主体内容 -->
    <div class="container mx-auto px-4 -mt-16 relative z-10">
      <!-- 分类选择区域 -->
      <div class="mb-16">
        <div
          class="text-center mb-10 bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100 animate-fadeIn animation-delay-300"
        >
          <div class="flex justify-center items-center mb-4">
            <div
              class="h-px w-16 bg-gradient-to-r from-transparent to-primary/50"
            ></div>
            <div class="mx-4">❖</div>
            <h2 class="text-3xl font-bold text-gray-900">文创产品系列</h2>
            <div class="mx-4">❖</div>
            <div
              class="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent"
            ></div>
          </div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            传统与现代的完美融合，让非遗文化融入生活的每个角落
          </p>
        </div>
        <div
          class="flex flex-wrap justify-center gap-4 animate-fadeIn animation-delay-400"
        >
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
            class="group relative px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            :class="[
              activeCategory === category.id
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-primary/10 border border-gray-100 hover:border-primary/30',
            ]"
          >
            <!-- 分类名称 -->
            <span class="relative z-10 font-medium">{{ category.name }}</span>

            <!-- 悬浮提示 -->
            <div
              class="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
            >
              <div
                class="bg-gray-900 text-white text-sm p-2 rounded-lg shadow-lg"
              >
                <p>{{ category.description }}</p>
                <div
                  class="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"
                ></div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- 当前分类描述 -->
      <div class="mb-12 text-center animate-fadeIn animation-delay-500">
        <div
          class="inline-block bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 px-8 py-4 rounded-2xl shadow-md"
        >
          <p class="text-gray-700 text-lg">
            {{ categories.find((c) => c.id === activeCategory)?.description }}
          </p>
        </div>
      </div>

      <!-- 在产品展示区上方添加淘宝店铺链接 -->
      <div
        class="container mx-auto px-4 mb-8 animate-fadeIn animation-delay-400"
      >
        <div
          class="bg-[#ff4400]/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between border border-[#ff4400]/20 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-center space-x-4 mb-4 md:mb-0">
            <div
              class="w-16 h-16 rounded-full bg-[#ff4400] flex items-center justify-center text-white text-2xl shadow-lg"
            >
              <i class="ri-shopping-bag-line"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800">
                凤翔泥塑官方淘宝店
              </h3>
              <p class="text-gray-600">
                购买正品凤翔泥塑作品，支持非遗文化传承
              </p>
            </div>
          </div>
          <a
            href="https://shop342789194.m.taobao.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#ff4400] to-[#ff7744] text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <span>立即前往淘宝店铺</span>
            <i class="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>

      <!-- 产品展示网格 -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
      >
        <TransitionGroup name="fade-list">
          <div
            v-for="(product, idx) in currentProducts"
            :key="product.id"
            class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 mx-2 sm:mx-0 product-card"
            :style="{ '--delay': `${idx * 0.1}s` }"
          >
            <!-- 图片容器 -->
            <div class="relative overflow-hidden aspect-[4/3]">
              <el-image
                :src="product.image"
                :alt="product.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                fit="cover"
                :preview-src-list="[product.image]"
                preview-teleported
                loading="lazy"
              >
                <template #placeholder>
                  <div
                    class="flex items-center justify-center h-full bg-gray-100 animate-pulse"
                  >
                    <el-icon class="text-3xl text-gray-300 animate-spin">
                      <i-ep-picture />
                    </el-icon>
                  </div>
                </template>
              </el-image>
              <!-- 分类标签 -->
              <div class="absolute top-4 left-4 z-10">
                <el-tag
                  :type="product.tagType"
                  effect="light"
                  class="text-sm font-medium shadow-md"
                >
                  {{ product.category }}
                </el-tag>
              </div>
              <!-- 悬停遮罩 -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
              >
                <!-- 放大查看按钮 -->
                <button
                  @click.stop="previewImage(product.image)"
                  class="bg-white/90 backdrop-blur-sm text-primary p-3 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:scale-110"
                  title="放大查看"
                >
                  <el-icon class="text-xl"><i-ep-zoom-in /></el-icon>
                </button>
              </div>
            </div>

            <!-- 产品信息 -->
            <div
              class="p-6 bg-gradient-to-b from-white via-white/95 to-white/90 relative overflow-hidden product-info"
            >
              <!-- 添加背景纹理 -->
              <div
                class="absolute inset-0 bg-pattern-light opacity-10 z-0"
              ></div>
              <!-- 添加顶部装饰线 -->
              <div
                class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              ></div>

              <h3
                class="text-xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10"
              >
                {{ product.title }}
              </h3>
              <p
                class="text-gray-600 text-sm leading-relaxed mb-4 relative z-10"
              >
                {{ product.description }}
              </p>
              <div class="flex flex-wrap gap-2 relative z-10">
                <el-tag
                  v-for="tag in product.tags"
                  :key="tag"
                  size="small"
                  effect="plain"
                  class="text-xs transform hover:scale-105 transition-all duration-300"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- 敬请期待卡片 -->
      <div
        class="group bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center mb-16 hover:bg-gray-100 transition-all duration-500 hover:border-primary/30 animate-fadeIn animation-delay-600"
      >
        <el-icon
          class="text-4xl text-gray-400 mb-4 group-hover:text-primary transition-colors duration-300"
          ><i-ep-plus
        /></el-icon>
        <h3
          class="text-xl font-bold text-gray-400 mb-2 group-hover:text-gray-600 transition-colors duration-300"
        >
          更多产品
        </h3>
        <p class="text-gray-500">敬请期待...</p>
      </div>
    </div>

    <!-- 页脚装饰 -->
    <div
      class="w-full h-4 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
    ></div>

    <!-- 返回顶部按钮 -->
    <el-backtop :right="40" :bottom="40" />

    <!-- 图片预览组件 -->
    <el-image-viewer
      v-if="showViewer"
      :url-list="[previewUrl]"
      :teleported="true"
      :z-index="2000"
      @close="showViewer = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "@vue/runtime-dom";
import { ElImageViewer } from "element-plus";

// 定义类型
interface Category {
  id: string;
  name: string;
  description: string;
}

// 导入图片
import cup1 from "../assets/images/文创产品/杯具1.jpg";
import cup2 from "../assets/images/文创产品/杯具2.jpg";
import cup3 from "../assets/images/文创产品/杯具3.jpg";
import cup4 from "../assets/images/文创产品/杯具4.jpg";
import penHolder from "../assets/images/文创产品/笔筒.jpg";
import stationery from "../assets/images/文创产品/文具.jpg";
import stationery2 from "../assets/images/文创产品/文具2.jpg";
import stationery3 from "../assets/images/文创产品/文具3.jpg";
import brooch1 from "../assets/images/文创产品/胸针1.jpg";
import brooch2 from "../assets/images/文创产品/胸针2.jpg";
import fashion1 from "../assets/images/文创产品/时装1.jpg";
import fashion2 from "../assets/images/文创产品/时装2.jpg";
import fashion3 from "../assets/images/文创产品/时装3.jpg";
import fashion4 from "../assets/images/文创产品/时装4.jpg";
import phone1 from "../assets/images/文创产品/手机壳1.jpg";
import phone2 from "../assets/images/文创产品/手机壳2.jpg";

// 产品分类
const categories = ref<Category[]>([
  {
    id: "cups",
    name: "文创杯具",
    description:
      "匠心独运的艺术茶具，让每一次品茗都成为一场与传统文化的优雅对话",
  },
  {
    id: "fashion",
    name: "文创服饰",
    description:
      "将非遗元素融入现代时尚，让传统文化与潮流完美邂逅，展现东方美学新风貌",
  },
  {
    id: "accessories",
    name: "文创配饰",
    description: "精致典雅的艺术配饰，让传统文化成为日常生活中最独特的点缀",
  },
  {
    id: "stationery",
    name: "文创文具",
    description:
      "以传统工艺装点文房四宝，让每次书写都充满文化底蕴，激发无限创意灵感",
  },
]);

const activeCategory = ref("cups");

// 产品数据
const products = ref([
  // 杯具系列
  {
    id: 1,
    title: "凤翔泥塑茶杯套装",
    description:
      "融合凤翔泥塑传统工艺与现代陶瓷技术，杯身饰以泥塑经典图案，色彩鲜艳饱满，造型生动有趣，既是实用茶具，也是传统文化的艺术载体。",
    category: "文创杯具",
    tagType: "success",
    tags: ["凤翔泥塑", "传统工艺", "文化收藏"],
    image: cup1,
  },
  {
    id: 2,
    title: "泥塑艺术茶具",
    description:
      "茶具表面采用凤翔泥塑浮雕工艺，以传统吉祥图案为主题，色彩明快，造型古朴，每一件都凝聚着非遗传承人的匠心与智慧。",
    category: "文创杯具",
    tagType: "success",
    tags: ["浮雕工艺", "吉祥图案", "非遗传承"],
    image: cup2,
  },
  {
    id: 3,
    title: "艺术图腾杯",
    description:
      "将凤翔泥塑的艺术图腾融入杯身设计，黑红相间的色彩对比强烈，现代感与传统美的完美结合。",
    category: "文创杯具",
    tagType: "success",
    tags: ["现代设计", "艺术图腾", "东方美学"],
    image: cup3,
  },
  {
    id: 4,
    title: "泥塑纹理陶杯",
    description:
      "将凤翔泥塑的传统纹理与现代陶瓷工艺相结合，保留了泥塑的质朴肌理和鲜明色彩，简约而不失传统韵味，是日常生活中的艺术品。",
    category: "文创杯具",
    tagType: "success",
    tags: ["传统纹理", "现代工艺", "日常艺术"],
    image: cup4,
  },

  // 文具系列
  {
    id: 5,
    title: "神兽笔筒",
    description:
      "以凤翔泥塑中常见的神兽造型为蓝本设计。神兽双目圆睁，威风凛凛，有着镇宅辟邪之意。",
    category: "文创文具",
    tagType: "primary",
    tags: ["传统神兽", "实用文具", "镇宅辟邪"],
    image: penHolder,
  },
  {
    id: 6,
    title: "传统文具套装",
    description: "融入凤翔泥塑元素的文具套装，让书写充满传统文化的韵味。",
    category: "文创文具",
    tagType: "primary",
    tags: ["文具套装", "传统元素", "实用设计"],
    image: stationery,
  },
  {
    id: 15,
    title: "创意文具组合",
    description: "将传统图案与现代文具完美结合，让书写充满艺术气息。",
    category: "文创文具",
    tagType: "primary",
    tags: ["创意设计", "实用文具", "艺术风格"],
    image: stationery2,
  },
  {
    id: 16,
    title: "文创办公套装",
    description: "以传统元素装点办公用品，让工作环境充满文化韵味。",
    category: "文创文具",
    tagType: "primary",
    tags: ["办公用品", "传统元素", "文化创新"],
    image: stationery3,
  },

  // 配饰系列
  {
    id: 7,
    title: "灵动公鸡胸针",
    description:
      "造型选取凤翔泥塑中的灵动公鸡，象征着新的开始与希望。胸针虽小，但工艺精湛。",
    category: "文创配饰",
    tagType: "warning",
    tags: ["精致配饰", "传统图案", "寓意美好"],
    image: brooch1,
  },
  {
    id: 8,
    title: "祥瑞胸针",
    description: "以传统祥瑞图案为设计灵感，精致小巧，适合日常佩戴。",
    category: "文创配饰",
    tagType: "warning",
    tags: ["传统图案", "日常佩戴", "祥瑞寓意"],
    image: brooch2,
  },

  // 服饰系列
  {
    id: 9,
    title: "民族风时装",
    description:
      "将凤翔泥塑的传统图案元素融入现代服装设计，展现东方美学与现代时尚的完美融合。",
    category: "文创服饰",
    tagType: "danger",
    tags: ["民族风格", "现代设计", "文化传承"],
    image: fashion1,
  },
  {
    id: 10,
    title: "艺术时装",
    description: "大胆的艺术设计与传统文化元素的碰撞，打造独特的时尚风格。",
    category: "文创服饰",
    tagType: "danger",
    tags: ["艺术设计", "时尚元素", "文化创新"],
    image: fashion2,
  },
  {
    id: 13,
    title: "凤翔泥塑图案T恤",
    description:
      "将凤翔泥塑的传统图案印制在舒适的T恤上，色彩鲜明的泥塑元素与简约的T恤设计相得益彰，让传统文化融入日常穿搭。",
    category: "文创服饰",
    tagType: "danger",
    tags: ["泥塑图案", "休闲T恤", "日常穿搭"],
    image: fashion3,
  },
  {
    id: 14,
    title: "泥塑艺术印花T恤",
    description:
      "以凤翔泥塑中的经典形象为灵感，通过现代印花工艺呈现在T恤上，保留了泥塑艺术的生动与色彩，是传统与现代的时尚碰撞。",
    category: "文创服饰",
    tagType: "danger",
    tags: ["艺术印花", "创意T恤", "文化时尚"],
    image: fashion4,
  },

  // 手机壳系列
  {
    id: 11,
    title: "传统图案手机壳",
    description:
      "将凤翔泥塑的传统图案融入手机壳设计，让科技产品也能展现传统文化的魅力。",
    category: "文创配饰",
    tagType: "warning",
    tags: ["科技配饰", "传统图案", "日常实用"],
    image: phone1,
  },
  {
    id: 12,
    title: "艺术手机壳",
    description: "现代艺术设计与传统元素的结合，让手机壳成为一件随身艺术品。",
    category: "文创配饰",
    tagType: "warning",
    tags: ["艺术设计", "现代风格", "个性展现"],
    image: phone2,
  },
]);

// 根据当前分类筛选产品
const currentProducts = computed(() => {
  return products.value.filter((product) => {
    switch (activeCategory.value) {
      case "cups":
        return product.category === "文创杯具";
      case "fashion":
        return product.category === "文创服饰";
      case "accessories":
        return product.category === "文创配饰";
      case "stationery":
        return product.category === "文创文具";
      default:
        return true;
    }
  });
});

// 添加banner背景图片
const bannerBg = new URL(
  "../assets/images/banners/wenchuang.jpg",
  import.meta.url
).href;

// 图片预览相关状态
const showViewer = ref(false);
const previewUrl = ref("");

// 预览图片的方法
const previewImage = (url: string) => {
  previewUrl.value = url;
  showViewer.value = true;
};
</script>

<style scoped>
/* 背景样式 */
.bg-pattern {
  background-color: #f8f4e9;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c75d38' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* 文字阴影 */
.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* 优化标签样式 */
:deep(.el-tag) {
  @apply border-none shadow-sm;
}

/* 添加卡片悬停动画 */
.group:hover {
  @apply transform -translate-y-2;
}

/* 优化图片过渡效果 */
.el-image {
  @apply transition-transform duration-700;
}

.group:hover .el-image {
  @apply scale-110;
}

/* 添加图片悬停效果 */
.el-image {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 优化按钮样式 */
:deep(.el-button) {
  border-radius: 8px;
}

/* 分类标签栏样式 */
:deep(.category-tabs .el-tabs__nav) {
  display: flex;
  justify-content: center;
  border: none;
}

:deep(.category-tabs .el-tabs__item) {
  font-size: 1.1rem;
  padding: 0 2rem;
}

:deep(.category-tabs .el-tabs__active-bar) {
  background-color: var(--el-color-primary);
}

/* 分类标签栏动画 */
:deep(.category-tabs .el-tabs__item) {
  @apply relative overflow-hidden;
}

:deep(.category-tabs .el-tabs__item)::after {
  content: "";
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300;
}

:deep(.category-tabs .el-tabs__item.is-active)::after {
  @apply scale-x-100;
}

/* 添加列表动画 */
.fade-list-move,
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.fade-list-leave-active {
  position: absolute;
}

/* 产品卡片动画 */
.product-card {
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

/* 添加产品信息样式 */
.product-info {
  position: relative;
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
}

/* 添加不同类别的产品卡片信息区背景 */
.product-card:has(.el-tag.el-tag--success) .product-info {
  background-image: linear-gradient(to bottom, white, rgba(236, 253, 245, 0.4));
}

.product-card:has(.el-tag.el-tag--primary) .product-info {
  background-image: linear-gradient(to bottom, white, rgba(236, 244, 253, 0.4));
}

.product-card:has(.el-tag.el-tag--warning) .product-info {
  background-image: linear-gradient(to bottom, white, rgba(254, 249, 235, 0.4));
}

.product-card:has(.el-tag.el-tag--danger) .product-info {
  background-image: linear-gradient(to bottom, white, rgba(253, 236, 236, 0.4));
}

/* 背景纹理 */
.bg-pattern-light {
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c75d38' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 20l20-20L0 0zM40 0l-20 20 20 20z'/%3E%3C/g%3E%3C/svg%3E");
}

/* 产品卡片悬停效果强化 */
.product-card:hover .product-info {
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>
