<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- 顶部轮播图部分 -->
    <div class="relative w-full bg-[var(--color-bg-primary)]">
      <!-- 两侧渐变遮罩 -->
      <div
        class="absolute left-0 w-32 h-full bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent z-20"
      ></div>
      <div
        class="absolute right-0 w-32 h-full bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent z-20"
      ></div>

      <el-carousel
        :height="carouselHeight"
        :interval="5000"
        arrow="always"
        class="carousel-container"
        indicator-position="outside"
      >
        <el-carousel-item v-for="(slide, index) in carouselSlides" :key="index">
          <div
            class="relative h-full w-full flex items-center justify-center overflow-hidden"
          >
            <!-- 加载占位 -->
            <div
              v-if="!imageLoaded[index]"
              class="absolute inset-0 bg-[var(--color-bg-secondary)] animate-pulse"
            ></div>

            <!-- 背景模糊效果 -->
            <div
              class="absolute inset-0 bg-cover bg-center blur-md opacity-20"
              :style="{ backgroundImage: `url(${slide.image})` }"
            ></div>

            <!-- 主图片容器 -->
            <div
              class="relative z-10 h-full flex items-center justify-center px-4"
            >
              <img
                :src="slide.image"
                :alt="slide.title"
                class="h-full w-auto object-contain max-w-full"
                @load="handleImageLoad(index)"
              />
            </div>

            <!-- 文字内容 -->
            <div
              class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white z-20"
            >
              <div class="container mx-auto">
                <h2
                  class="text-4xl md:text-5xl font-bold mb-3"
                  style="font-family: var(--font-family-primary)"
                >
                  {{ slide.title }}
                </h2>
                <p
                  class="text-lg md:text-xl text-white/90"
                  style="font-family: var(--font-family-secondary)"
                >
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 动漫形象展示区域 -->
    <div
      class="py-16 bg-gradient-to-b from-white to-[var(--color-bg-secondary)]"
    >
      <div class="container mx-auto px-4">
        <!-- 标题部分 -->
        <div class="text-center mb-16">
          <h2
            class="text-4xl font-bold mb-4 text-[var(--color-text-primary)]"
            style="font-family: var(--font-family-primary)"
          >
            品牌动漫形象
          </h2>
          <p
            class="text-[var(--color-text-secondary)] text-lg"
            style="font-family: var(--font-family-secondary)"
          >
            传统与现代的完美融合
          </p>
          <div
            class="w-24 h-1 bg-[var(--color-primary)] mx-auto mt-4 rounded-full"
          ></div>
        </div>

        <!-- 内容区域 -->
        <div class="max-w-7xl mx-auto">
          <!-- 角色展示部分 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div
              v-for="character in characters"
              :key="character.name"
              class="character-card group bg-white rounded-2xl overflow-hidden shadow-clay hover:shadow-2xl transition-all duration-500"
            >
              <!-- 角标装饰 -->
              <div class="corner-decoration top-left"></div>
              <div class="corner-decoration top-right"></div>
              <div class="corner-decoration bottom-left"></div>
              <div class="corner-decoration bottom-right"></div>

              <div
                class="relative w-full h-[400px] bg-gradient-to-b from-[var(--color-bg-secondary)]/50 to-white/30"
              >
                <img
                  :src="character.image"
                  :alt="character.name"
                  class="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div
                class="p-8 text-center bg-gradient-to-b from-white to-[var(--color-bg-secondary)]/30"
              >
                <h3
                  class="text-2xl font-bold mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors"
                >
                  {{ character.name }}
                </h3>
                <p class="text-[var(--color-text-secondary)] leading-relaxed">
                  {{ character.description }}
                </p>
                <div class="mt-6 flex justify-center gap-3 flex-wrap">
                  <el-tag
                    v-for="tag in character.tags"
                    :key="tag"
                    class="px-4 py-1 rounded-full text-sm"
                    effect="plain"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </div>
          </div>

          <!-- 视频展示部分 -->
          <div
            class="mt-16 relative overflow-hidden rounded-2xl shadow-clay bg-[var(--color-bg-primary)]"
          >
            <!-- 装饰元素 -->
            <div
              class="absolute top-0 left-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-br-full"
            ></div>
            <div
              class="absolute bottom-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-tl-full"
            ></div>

            <div class="relative p-8 md:p-12">
              <div class="text-center mb-8">
                <h3
                  class="text-3xl font-bold mb-4 text-[var(--color-text-primary)]"
                  style="font-family: var(--font-family-primary)"
                >
                  动漫视频展示
                </h3>
                <p
                  class="text-[var(--color-text-secondary)]"
                  style="font-family: var(--font-family-secondary)"
                >
                  探索凤翔泥塑的动漫世界
                </p>
              </div>

              <!-- 视频展示部分的容器 -->
              <div
                class="relative rounded-xl overflow-hidden shadow-lg mx-auto"
                style="max-width: min(90%, 800px)"
              >
                <div class="video-wrapper">
                  <video
                    class="w-full object-contain rounded-xl"
                    controls
                    :poster="slide1"
                    preload="metadata"
                  >
                    <source :src="dongmanVideo" type="video/mp4" />
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 文化亮点部分 -->
    <div class="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 text-gray-800">文化亮点</h2>
          <p class="text-gray-600 text-lg">传统与创新的完美融合</p>
          <div class="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in culturalFeatures"
            :key="index"
            class="feature-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="feature.image"
                :alt="feature.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              ></div>
              <div class="absolute bottom-4 left-4 text-white">
                <div class="text-sm font-medium">{{ feature.category }}</div>
              </div>
            </div>

            <div class="p-6">
              <h3
                class="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors"
              >
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-4">
                {{ feature.description }}
              </p>
              <div class="flex justify-between items-center">
                <el-tag size="small" :type="feature.tagType" effect="light">
                  {{ feature.tag }}
                </el-tag>
                <el-button type="primary" text class="flex items-center">
                  <el-icon
                    class="ml-1 group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight />
                  </el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Collection,
  Medal,
  Present,
  ArrowRight,
} from "@element-plus/icons-vue";
import { ref, onMounted, onUnmounted } from "vue";
// 直接导入图片和视频
import img1 from "../assets/images/Anime_image/祥泥仔1.jpg";
import img2 from "../assets/images/Anime_image/祥泥仔2.jpg";
import tradition from "../assets/images/Anime_image/features/传统制作工艺.jpg";
import innovation from "../assets/images/Anime_image/features/创新工艺.jpg";
import experience from "../assets/images/Anime_image/features/文化体验基地.jpg";
import dongmanVideo from "../assets/images/Anime_image/dongman.mp4";
import slide1 from "../assets/images/slides/slide1.jpg";

// 计算轮播图高度
const carouselHeight = ref("600px");

// 根据窗口大小调整轮播图高度
const updateCarouselHeight = () => {
  const isMobile = window.innerWidth < 768; // 使用更小的断点
  const headerHeight = isMobile ? 60 : 100;
  const windowHeight = window.innerHeight;
  const minHeight = 400; // 最小高度
  const maxHeight = 800; // 最大高度

  // 计算合适的高度
  let height = isMobile
    ? windowHeight * 0.7 // 移动端使用70%的视窗高度
    : Math.min(windowHeight - headerHeight, maxHeight);

  // 确保高度不小于最小值
  height = Math.max(height, minHeight);

  carouselHeight.value = `${height}px`;
};

// 监听窗口大小变化
onMounted(() => {
  updateCarouselHeight();
  window.addEventListener("resize", updateCarouselHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateCarouselHeight);
});

// 轮播图数据
const carouselSlides = ref([
  {
    image: new URL("@/assets/images/slides/slide1.jpg", import.meta.url).href,
    title: "凤翔泥塑",
    description: "千年工艺 • 非遗传承",
  },
  {
    image: new URL("@/assets/images/slides/slide2.jpg", import.meta.url).href,
    title: "传统技艺",
    description: "匠心独运 • 精雕细琢",
  },
  {
    image: new URL("@/assets/images/slides/slide3.jpg", import.meta.url).href,
    title: "文化传承",
    description: "守正创新 • 薪火相传",
  },
  {
    image: new URL("@/assets/images/slides/slide4.jpg", import.meta.url).href,
    title: "艺术创新",
    description: "融古通今 • 再创辉煌",
  },
]);

const characters = ref([
  {
    name: "祥泥宝",
    description: "凤翔泥塑的文化传承者，以可爱的造型和传统服饰展现非遗魅力。",
    image: img1,
    tags: ["文化传承", "传统服饰", "艺术形象"],
  },
  {
    name: "祥泥宝",
    description:
      "活泼灵动的创新形象，融合传统与现代元素，展现凤翔泥塑的创新活力。",
    image: img2,
    tags: ["创新设计", "活力形象", "文化创新"],
  },
]);

// 将 newsItems 改为 culturalFeatures
const culturalFeatures = ref([
  {
    title: "千年工艺传承",
    description: "凤翔泥塑技艺历经千年传承，形成了独特的艺术风格和制作工艺。",
    category: "传统技艺",
    image: tradition,
    tag: "非遗传承",
    tagType: "success",
  },
  {
    title: "创新工艺展示",
    description: "融合现代设计理念，让传统艺术焕发新生。",
    category: "创新发展",
    image: innovation,
    tag: "匠心独运",
    tagType: "primary",
  },
  {
    title: "文化体验基地",
    description: "设立泥塑文化体验中心，让游客零距离感受非遗魅力。",
    category: "文化传播",
    image: experience,
    tag: "互动体验",
    tagType: "warning",
  },
]);

const imageLoaded = ref([]);
const handleImageLoad = (index) => {
  imageLoaded.value[index] = true;
};
</script>

<style scoped>
/* 轮播图容器样式 */
.carousel-container {
  position: relative;
  background: var(--color-bg-primary);
}

/* 优化箭头按钮样式 */
:deep(.el-carousel__arrow) {
  width: 48px;
  height: 48px;
  background-color: rgba(139, 69, 19, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  transform: scale(1);
  transition: all 0.3s ease;
  z-index: 30;
}

:deep(.el-carousel__arrow--left) {
  left: 20px;
  transform: translateX(-10px);
}

:deep(.el-carousel__arrow--right) {
  right: 20px;
  transform: translateX(10px);
}

:deep(.el-carousel__arrow:hover) {
  background-color: rgba(139, 69, 19, 0.4);
  transform: scale(1.1) translateX(0);
}

/* 指示器样式 */
:deep(.el-carousel__indicators) {
  bottom: -30px;
}

:deep(.el-carousel__indicator) {
  padding: 12px 4px;
}

:deep(.el-carousel__indicator--horizontal .el-carousel__button) {
  width: 30px;
  height: 3px;
  background-color: var(--color-primary);
  opacity: 0.3;
  transition: all 0.3s ease;
}

:deep(.el-carousel__indicator.is-active .el-carousel__button) {
  opacity: 1;
}

/* 图片容器样式 */
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg-primary);
}

/* 图片过渡动画 */
.el-carousel__item img {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(1.02) contrast(1.02);
}

.el-carousel__item.is-active img {
  transform: scale(1.02);
}

/* 移动端适配 */
@media (max-width: 768px) {
  :deep(.el-carousel__arrow) {
    width: 36px;
    height: 36px;
  }

  :deep(.el-carousel__arrow--left) {
    left: 10px;
  }

  :deep(.el-carousel__arrow--right) {
    right: 10px;
  }

  .el-carousel__item h2 {
    font-size: 1.5rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .el-carousel__item p {
    font-size: 1rem;
    line-height: 1.4;
  }
}

/* 横屏适配 */
@media (max-width: 768px) and (orientation: landscape) {
  .el-carousel__item img {
    max-height: 80vh;
  }
}

.image-container {
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.character-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.character-card {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.corner-decoration {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-primary);
  opacity: 0.4;
  transition: all 0.5s ease;
  z-index: 1;
}

.character-card:hover .corner-decoration {
  width: 36px;
  height: 36px;
  opacity: 0.8;
}

.top-left {
  top: 12px;
  left: 12px;
  border-right: 0;
  border-bottom: 0;
}

.top-right {
  top: 12px;
  right: 12px;
  border-left: 0;
  border-bottom: 0;
}

.bottom-left {
  bottom: 12px;
  left: 12px;
  border-right: 0;
  border-top: 0;
}

.bottom-right {
  bottom: 12px;
  right: 12px;
  border-left: 0;
  border-top: 0;
}

/* 添加渐变背景动画 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.character-card:hover {
  transform: translateY(-8px);
}

/* Element Plus 按钮样式优化 */
:deep(.el-button) {
  font-weight: 500;
}

:deep(.el-tag) {
  border-radius: 16px;
  font-weight: 500;
}

/* 新闻卡片样式 */
.news-card {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.news-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--el-color-primary),
    var(--el-color-success)
  );
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.news-card:hover::before {
  transform: scaleX(1);
}

/* 标签样式优化 */
:deep(.el-tag) {
  border-radius: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 按钮悬停效果 */
.el-button.is-text:hover {
  background: transparent;
  color: var(--el-color-primary-light-3);
}

/* 移动端文字缩小 */
@media (max-width: 640px) {
  .el-carousel__item .text-content {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }

  .el-carousel__item h2 {
    font-size: 1.2rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .el-carousel__item p {
    font-size: 0.75rem;
    line-height: 1.2;
  }
}

/* 添加移动端横屏适配 */
@media (max-width: 640px) and (orientation: landscape) {
  .el-carousel__item img {
    object-position: center 30%;
  }
}

/* 卡片悬停效果 */
.character-card {
  transform: translateY(0);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.character-card:hover {
  transform: translateY(-8px);
}

/* 标签样式 */
:deep(.el-tag) {
  background-color: var(--color-bg-secondary);
  border-color: var(--color-border);
  color: var(--color-text-primary);
  transition: all 0.3s ease;
}

:deep(.el-tag:hover) {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* 视频控件样式 */
video {
  background-color: transparent;
}

video::-webkit-media-controls-panel {
  background-image: linear-gradient(
    to top,
    rgba(139, 69, 19, 0.8),
    rgba(139, 69, 19, 0.5)
  );
}

video::-webkit-media-controls-play-button {
  background-color: var(--color-primary);
  border-radius: 50%;
}

/* 视频容器响应式调整 */
@media (max-width: 768px) {
  .video-wrapper {
    padding-bottom: 75%; /* 4:3 比例，适合移动端 */
  }
}

/* 阴影效果 */
.shadow-clay {
  box-shadow: 0 4px 6px -1px rgba(139, 69, 19, 0.1),
    0 2px 4px -1px rgba(139, 69, 19, 0.06);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .character-card {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}

/* 在 style 部分更新视频相关样式 */
.video-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 比例 */
  background-color: var(--color-bg-secondary);
  border-radius: 0.75rem;
}

.video-wrapper video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 视频控件样式 */
video::-webkit-media-controls-panel {
  background-image: linear-gradient(
    to top,
    rgba(139, 69, 19, 0.8),
    rgba(139, 69, 19, 0.5)
  );
}

video::-webkit-media-controls-play-button {
  background-color: var(--color-primary);
  border-radius: 50%;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .video-wrapper {
    padding-bottom: 75%; /* 4:3 比例，适合移动端 */
  }
}
</style>
