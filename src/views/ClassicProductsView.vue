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
        class="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"
      ></div>
      <!-- 装饰元素 -->
      <div
        class="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-24 h-24 border-2 border-white/20 rounded-full"
      ></div>
      <!-- 内容区域 -->
      <div class="container mx-auto px-4 h-full flex items-center relative">
        <div class="max-w-3xl animate-fadeIn">
          <div
            class="inline-block bg-primary/80 px-4 py-2 rounded-lg mb-6 shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <span class="text-white/90 text-lg">传统工艺</span>
          </div>
          <h1
            class="text-6xl font-bold mb-8 text-white text-shadow-lg animate-slideUp"
          >
            经典泥塑作品展示
          </h1>
          <p
            class="text-2xl text-white/90 font-light animate-slideUp animation-delay-200"
          >
            传承千年工艺 • 展现非遗魅力 • 弘扬传统文化
          </p>
        </div>
      </div>
    </div>

    <!-- 页面标题 -->
    <div class="container mx-auto px-4 mb-12 -mt-16 relative z-10">
      <div
        class="text-center max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100 animate-fadeIn animation-delay-300"
      >
        <div
          class="inline-block bg-primary/10 px-4 py-1 rounded-full mb-4 transform hover:scale-105 transition-all duration-300"
        >
          <span class="text-primary font-medium">传统工艺精品</span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">凤翔泥塑精品展示</h1>
        <el-divider>
          <el-icon class="text-primary text-xl"><Collection /></el-icon>
        </el-divider>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          展现传统工艺的精湛技艺，传承千年非遗文化的独特魅力
        </p>
      </div>

      <!-- 优化系列筛选按钮 -->
      <div
        class="flex flex-wrap justify-center gap-4 mt-12 mb-8 animate-fadeIn animation-delay-400"
      >
        <button
          v-for="series in productSeries"
          :key="series.title"
          class="px-8 py-3 rounded-xl transition-all duration-300"
          :class="[
            currentSeries === series.title
              ? 'bg-primary text-white shadow-lg scale-105 el-button--primary'
              : 'el-button el-button--default hover:text-primary hover:scale-105 hover:shadow-md',
          ]"
          @click="currentSeries = series.title"
        >
          <div class="flex items-center gap-3">
            <el-icon class="text-xl"><component :is="series.icon" /></el-icon>
            <span class="font-medium">{{ series.title }}</span>
          </div>
        </button>
      </div>

      <!-- 添加统计信息 -->
      <div
        class="flex justify-center gap-8 mb-8 animate-fadeIn animation-delay-500"
      >
        <el-statistic
          title="展品总数"
          :value="currentProducts.length"
          class="stat-card"
        >
          <template #prefix>
            <el-icon><Picture /></el-icon>
          </template>
        </el-statistic>
        <el-statistic
          title="系列数量"
          :value="productSeries.length"
          class="stat-card"
        >
          <template #prefix>
            <el-icon><Collection /></el-icon>
          </template>
        </el-statistic>
      </div>
    </div>

    <!-- 产品展示区 -->
    <div class="container mx-auto px-4 mb-16">
      <div
        class="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden"
      >
        <!-- 装饰元素 -->
        <div
          class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        ></div>
        <div
          class="absolute -top-12 -left-12 w-24 h-24 border-2 border-primary/10 rounded-full"
        ></div>
        <div
          class="absolute -bottom-12 -right-12 w-24 h-24 border-2 border-primary/10 rounded-full"
        ></div>

        <TransitionGroup
          name="fade-list"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <div
            v-for="(product, index) in currentProducts"
            :key="product.name"
            class="group overflow-hidden rounded-2xl bg-white hover:bg-white shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-primary/20 product-card"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <div class="relative overflow-hidden">
              <el-image
                :src="product.image"
                :alt="product.name"
                class="w-full aspect-square object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                fit="cover"
                :preview-src-list="[product.image]"
                preview-teleported
                :initial-index="0"
                :hide-on-click-modal="true"
              >
                <template #placeholder>
                  <div class="flex items-center justify-center h-full">
                    <el-icon class="text-3xl text-gray-300 animate-spin"
                      ><Loading
                    /></el-icon>
                  </div>
                </template>
              </el-image>
              <!-- 添加悬停效果遮罩 -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <!-- 添加产品序号 -->
              <div
                class="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-bold shadow-lg"
              >
                {{ index + 1 }}/{{ currentProducts.length }}
              </div>
            </div>
            <div class="p-6 space-y-3">
              <el-tag
                :type="currentSeries === '十二生肖系列' ? 'success' : 'warning'"
                effect="light"
                round
                class="transform hover:scale-105 transition-all duration-300"
              >
                {{ currentSeries }}
              </el-tag>
              <h3
                class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300"
              >
                {{ product.name }}
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                {{ product.description }}
              </p>
              <!-- 添加操作按钮区 -->
              <div class="pt-4 flex justify-end items-center">
                <el-button
                  type="primary"
                  :icon="ZoomIn"
                  circle
                  @click="showViewer(product.image)"
                  class="transform group-hover:scale-110 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- 添加返回顶部按钮 -->
    <el-backtop :right="40" :bottom="40" />

    <!-- 添加图片查看器 -->
    <el-image-viewer
      v-if="showImageViewer"
      :url-list="[currentImage]"
      :initial-index="0"
      :hide-on-click-modal="true"
      @close="showImageViewer = false"
    />

    <!-- 在页面底部添加购买提示 -->
    <div class="container mx-auto px-4 my-16">
      <div
        class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center"
      >
        <h3 class="text-2xl font-bold text-gray-800 mb-4">喜欢这些作品？</h3>
        <p class="text-gray-600 mb-6">
          您可以在我们的官方淘宝店铺购买正品凤翔泥塑作品
        </p>
        <a
          href="https://shop342789194.m.taobao.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <i class="ri-store-2-line mr-2"></i>
          <span>前往淘宝店铺</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "@vue/runtime-dom";
import {
  Collection,
  Avatar,
  Picture,
  Loading,
  ZoomIn,
} from "@element-plus/icons-vue";
import type { ImageViewerProps } from "element-plus";
import { ElImageViewer } from "element-plus";
import { Breadcrumb } from "@/components/common";

// 导入图片
const zodiacImages = import.meta.glob("../assets/images/经典产品/*.jpg", {
  eager: true,
});

const getImageUrl = (name: string) => {
  const key = Object.keys(zodiacImages).find((path) => path.includes(name));
  if (key) {
    console.log("Found image:", key); // 添加调试日志
    return (zodiacImages[key] as { default: string }).default;
  }
  console.log("Image not found for:", name); // 添加调试日志
  return ""; // 返回空字符串或默认图片路径
};

// 十二生肖数据
const zodiacs = [
  {
    name: "机灵鼠",
    description:
      "灵巧聪慧，象征机智与财运，为十二生肖之首。泥塑作品生动刻画了老鼠机敏活泼的神态，传统工艺赋予其独特的民间艺术魅力，寓意着新的一年聪明机智、财运亨通。",
    image: getImageUrl("机灵鼠"),
  },
  {
    name: "勤劳牛",
    description:
      "踏实肯干，代表勤恳与奉献，为农耕文明的象征。这件泥塑作品展现了牛的憨厚老实、任劳任怨的精神，体现了中华民族勤劳朴实的传统美德，象征着丰收与富足。",
    image: getImageUrl("勤劳牛"),
  },
  {
    name: "招财虎",
    description:
      "威风凛凛，寓意招财纳福，为百兽之王。泥塑艺人以精湛的技艺塑造出虎的威武形象，彰显其气势磅礴的王者风范，传统民间工艺赋予其驱邪纳福、招财进宝的吉祥寓意。",
    image: getImageUrl("招财虎"),
  },
  {
    name: "柔良兔",
    description:
      "温柔可人，象征祥瑞与美好，为月亮的守护者。泥塑作品完美展现了玉兔温顺可爱的姿态，传统工艺与民间传说相结合，寄托着人们对美好生活的向往，象征着温柔与优雅。",
    image: getImageUrl("柔良兔"),
  },
  {
    name: "勇猛龙",
    description:
      "腾云驾雾，代表权威与尊贵，为中华图腾。这尊龙的泥塑作品气势恢宏，展现了中国龙腾云驾雾、升天入海的神韵，体现了华夏民族自强不息的精神，象征着权威与吉祥。",
    image: getImageUrl("勇猛龙"),
  },
  {
    name: "聪慧蛇",
    description:
      "灵动优雅，寓意智慧与长寿，为吉祥之物。泥塑艺人巧妙地刻画了蛇的灵动姿态，传统工艺展现其优雅神秘的气质，象征着智慧与永恒，寄托着人们对长寿的祝愿。",
    image: getImageUrl("聪慧蛇"),
  },
  {
    name: "平安马",
    description:
      "奔腾向上，象征事业腾达，为忠诚的伙伴。泥塑作品生动展现了骏马奔腾的矫健身姿，传统工艺完美表达其昂扬向上的精神，寓意着事业腾飞、平安吉祥，彰显着无限生机。",
    image: getImageUrl("平安马"),
  },
  {
    name: "温良羊",
    description:
      "祥和温顺，代表和平与美满，为群居之首。这件泥塑体现了羊的温顺祥和之态，传统民间艺术赋予其独特魅力，象征着家庭和睦、生活美满，寄托着人们对幸福生活的向往。",
    image: getImageUrl("温良羊"),
  },
  {
    name: "机智猴",
    description:
      "活泼灵动，寓意机敏与智慧，为灵性之源。泥塑艺人细腻刻画了猴子调皮活泼的神态，传统工艺展现其机灵聪慧的特质，象征着智慧与灵性，给人欢乐与希望。",
    image: getImageUrl("机智猴"),
  },
  {
    name: "啼辰鸡",
    description:
      "报晓守时，象征光明与希望，为黎明使者。泥塑作品形象地展现了雄鸡昂首挺胸的神态，传统技艺完美表达其报晓迎春的寓意，象征着光明与希望，预示着新的开始。",
    image: getImageUrl("啼辰鸡"),
  },
  {
    name: "旺财狗",
    description:
      "忠心护主，代表忠诚与守护，为人类挚友。这件泥塑生动刻画了狗的忠诚守护之态，传统工艺展现其可爱忠实的特质，象征着忠诚与保护，寄托着人们对平安的祈愿。",
    image: getImageUrl("旺财狗"),
  },
  {
    name: "聚财猪",
    description:
      "富贵吉祥，寓意富足与安康，为福禄之源。泥塑艺人以传统技艺塑造了猪憨态可掬的形象，展现其富贵吉祥的寓意，象征着生活富足、五谷丰登，传递着人们对美好生活的期盼。",
    image: getImageUrl("聚财猪"),
  },
];

// 历史人物数据
const historicalFigures = [
  {
    name: "关羽",
    description:
      "威震华夏的三国名将，义薄云天的武圣典范。凤翔泥塑艺人以精湛技艺，塑造了这位忠义千秋的英雄形象，展现其威武不凡的气势。作品细腻刻画了关羽浓眉大眼、长髯飘飘的特征，体现了其刚正不阿、忠义无双的品格，是传统文化与民间艺术的完美结合。",
    image: getImageUrl("关羽"),
  },
  {
    name: "钟馗",
    description:
      "驱邪降魔的神明，正气浩然的民间守护神。这尊泥塑作品展现了钟馗威严庄重的形象，寄托着人们对平安吉祥的美好祈愿。艺人运用传统工艺，细致刻画了钟馗剑眉怒目、威风凛凛的神态，完美展现其驱邪避祸、镇宅保平的神力，是民间信仰与艺术的典范之作。",
    image: getImageUrl("钟馗"),
  },
];

// 添加产品系列数据
const productSeries = [
  {
    title: "十二生肖系列",
    icon: "Collection",
    products: zodiacs,
  },
  {
    title: "历史人物系列",
    icon: "Avatar",
    products: historicalFigures,
  },
];

// 添加状态管理
const currentSeries = ref(productSeries[0].title);

// 计算当前显示的产品
const currentProducts = computed(() => {
  const series = productSeries.find((s) => s.title === currentSeries.value);
  return series ? series.products : [];
});

// 添加banner背景图片
const bannerBg = new URL(
  "../assets/images/banners/jingdian.jpg",
  import.meta.url
).href;

// 图片查看器状态
const showImageViewer = ref(false);
const currentImage = ref("");

// 显示图片查看器
const showViewer = (url: string) => {
  currentImage.value = url;
  showImageViewer.value = true;
};
</script>

<style scoped>
.bg-pattern {
  background-color: #f8f4e9;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c75d38' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.el-image {
  --el-image-placeholder-bg: theme("colors.gray.100");
  background: linear-gradient(
    45deg,
    var(--el-image-placeholder-bg) 0%,
    theme("colors.gray.200") 50%,
    var(--el-image-placeholder-bg) 100%
  );
  background-size: 200% 200%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

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

.product-card {
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
  animation-delay: var(--delay, 0s);
}

.stat-card {
  @apply bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-primary/20;
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
</style>
