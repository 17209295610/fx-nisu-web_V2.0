<template>
  <div class="min-h-screen bg-pattern">
    <!-- 页面导航 -->
    <Breadcrumb />

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
            <span class="text-white/90 text-lg">科普教育</span>
          </div>
          <h1
            class="text-6xl font-bold mb-8 text-white text-shadow-lg animate-slideUp"
          >
            非遗科普视频
          </h1>
          <p
            class="text-2xl text-white/90 font-light animate-slideUp animation-delay-200"
          >
            生动有趣 • 寓教于乐 • 传承文化
          </p>
        </div>
      </div>
    </div>

    <!-- 重新设计内容区域 -->
    <div class="container mx-auto px-4 -mt-16 relative z-10">
      <!-- 页面标题区域 -->
      <div
        class="text-center mb-16 bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100 animate-fadeIn animation-delay-300"
      >
        <div class="flex justify-center items-center mb-4">
          <div
            class="h-px w-16 bg-gradient-to-r from-transparent to-primary/50"
          ></div>
          <div class="mx-4">❖</div>
          <h2 class="text-3xl font-bold text-gray-900">非遗视频展播</h2>
          <div class="mx-4">❖</div>
          <div
            class="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent"
          ></div>
        </div>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          通过生动有趣的视频形式，带您了解凤翔泥塑的历史文化与制作工艺
        </p>
      </div>

      <!-- 视频展示区域 -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 animate-fadeIn animation-delay-400"
      >
        <!-- 凤翔泥塑之起源 -->
        <div
          class="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <!-- 视频容器 -->
          <div class="relative aspect-w-16 aspect-h-9 bg-gray-900">
            <!-- 播放按钮 - 始终可见 -->
            <div
              class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            >
              <div
                class="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <el-icon class="text-3xl text-white"><VideoPlay /></el-icon>
              </div>
            </div>
            <video
              controls
              class="w-full h-full object-cover group-hover:opacity-95 transition-opacity duration-300"
              :src="originVideo"
              :poster="originPoster"
            >
              您的浏览器不支持 video 标签。
            </video>
          </div>
          <!-- 视频信息 -->
          <div class="p-6 space-y-4">
            <div class="flex items-center gap-3">
              <el-icon class="text-2xl text-primary"><Film /></el-icon>
              <h3 class="text-2xl font-bold">凤翔泥塑之起源</h3>
            </div>
            <p class="text-gray-600 leading-relaxed">
              探索凤翔泥塑的历史起源与发展脉络，了解这一非物质文化遗产如何从古代流传至今，见证其在历史长河中的演变与传承。
            </p>
            <div class="flex flex-wrap gap-2 pt-3">
              <el-tag
                size="small"
                effect="plain"
                class="text-xs transform hover:scale-105 transition-all duration-300"
              >
                历史渊源
              </el-tag>
              <el-tag
                size="small"
                effect="plain"
                class="text-xs transform hover:scale-105 transition-all duration-300"
              >
                文化传承
              </el-tag>
              <el-tag
                size="small"
                effect="plain"
                class="text-xs transform hover:scale-105 transition-all duration-300"
              >
                艺术演变
              </el-tag>
            </div>
          </div>
        </div>

        <!-- 凤翔六营泥塑村 -->
        <div
          class="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <!-- 视频容器 -->
          <div class="relative aspect-w-16 aspect-h-9 bg-gray-900">
            <!-- 播放按钮 - 始终可见 -->
            <div
              class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            >
              <div
                class="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <el-icon class="text-3xl text-white"><VideoPlay /></el-icon>
              </div>
            </div>
            <video
              controls
              class="w-full h-full object-cover group-hover:opacity-95 transition-opacity duration-300"
              :src="villageVideo"
              :poster="villagePoster"
            >
              您的浏览器不支持 video 标签。
            </video>
          </div>
          <!-- 视频信息 -->
          <div class="p-6 space-y-4">
            <div class="flex items-center gap-3">
              <el-icon class="text-2xl text-primary"><Film /></el-icon>
              <h3 class="text-2xl font-bold">凤翔六营泥塑村</h3>
            </div>
            <p class="text-gray-600 leading-relaxed">
              走进凤翔六营泥塑村，探访这个非遗技艺的发源地，感受当地匠人世代相传的手艺与智慧，领略泥塑艺术在乡村振兴中焕发的新生机。
            </p>
            <div class="flex flex-wrap gap-2 pt-3">
              <el-tag
                size="small"
                effect="plain"
                class="text-xs transform hover:scale-105 transition-all duration-300"
              >
                匠人故事
              </el-tag>
              <el-tag
                size="small"
                effect="plain"
                class="text-xs transform hover:scale-105 transition-all duration-300"
              >
                技艺传承
              </el-tag>
              <el-tag
                size="small"
                effect="plain"
                class="text-xs transform hover:scale-105 transition-all duration-300"
              >
                乡村振兴
              </el-tag>
            </div>
          </div>
        </div>
      </div>

      <!-- 更多视频提示 -->
      <div class="text-center mt-16 mb-16 animate-fadeIn animation-delay-500">
        <div class="inline-flex items-center gap-2 text-primary">
          <span>更多精彩内容</span>
          <el-icon class="animate-bounce"><ArrowDown /></el-icon>
        </div>
        <p class="text-gray-500 mt-2">敬请期待...</p>
      </div>
    </div>

    <!-- 页脚装饰 -->
    <div
      class="w-full h-4 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
    ></div>

    <!-- 返回顶部按钮 -->
    <el-backtop :right="40" :bottom="40" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VideoPlay, Film, ArrowDown } from "@element-plus/icons-vue";

// 添加banner背景图片
const bannerBg = new URL("../assets/images/banners/shipin.jpg", import.meta.url)
  .href;

// 导入视频资源
import originVideo from "../assets/Video/凤翔泥塑之起源.mp4";
import villageVideo from "../assets/Video/凤翔六营泥塑村.mp4";

// 视频封面图
const originPoster = new URL(
  "../assets/images/video-covers/story-poster.jpg",
  import.meta.url
).href;
const villagePoster = new URL(
  "../assets/images/video-covers/charm-poster.jpg",
  import.meta.url
).href;
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

/* 视频卡片悬停效果 */
.group:hover {
  transform: translateY(-5px);
}

/* 播放按钮动画 */
.group:hover .play-button {
  transform: scale(1.1);
}

/* 视频控件样式优化 */
video::-webkit-media-controls {
  opacity: 0;
  transition: opacity 0.3s;
}

video:hover::-webkit-media-controls {
  opacity: 1;
}

video::-webkit-media-controls-panel {
  background: rgba(0, 0, 0, 0.5);
}

/* 修复视频悬停变黑问题 */
video:hover {
  opacity: 1 !important;
}

/* 确保视频在全屏模式下正常显示 */
video::-webkit-media-controls-fullscreen-button {
  display: block;
}

video:-webkit-full-screen {
  width: 100%;
  height: 100%;
}

/* 添加动画效果 */
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
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
</style>
