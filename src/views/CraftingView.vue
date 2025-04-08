<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- 顶部横幅 -->
    <div class="relative h-[400px] bg-primary overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-40"
        :style="{ backgroundImage: `url(${bannerBg})` }"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"
      ></div>
      <div class="container mx-auto px-4 h-full flex items-center relative">
        <div class="max-w-3xl">
          <div class="inline-block bg-primary/80 px-4 py-2 rounded-lg mb-6">
            <span class="text-white/90 text-lg">非物质文化遗产</span>
          </div>
          <h1 class="text-6xl font-bold mb-8 text-white">凤翔泥塑制作工艺</h1>
          <p class="text-2xl text-white/90 font-light">
            匠心传承 • 十一道工序 • 精益求精
          </p>
        </div>
      </div>
    </div>

    <!-- 简介部分 -->
    <div
      class="py-20 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden"
    >
      <!-- 背景装饰 -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(199,93,56,0.1),rgba(255,255,255,0)_50%)]"
      ></div>

      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <!-- 标题部分 -->
          <div class="text-center mb-20">
            <span
              class="inline-block px-6 py-2 bg-primary/10 text-primary rounded-full mb-6 text-base font-medium"
            >
              千年工艺
            </span>
            <h2 class="text-4xl font-bold mb-4">凤翔泥塑制作工艺</h2>
            <el-divider>
              <el-icon class="text-primary text-xl"><Collection /></el-icon>
            </el-divider>
            <p class="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              凤翔泥塑是陕西省非物质文化遗产，千百年来以其独特的艺术魅力传承至今。制作工艺精湛细腻，需经过十一道严格工序，每一步都凝聚着匠人的智慧与匠心。
            </p>
          </div>

          <!-- 内容部分 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- 精湛工艺卡片 -->
            <div
              class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
            >
              <div class="mb-4">
                <div
                  class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <el-icon class="text-3xl text-primary"><Tools /></el-icon>
                </div>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-bold mb-3 text-gray-900">传统技艺</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  十一道精细工序，每一步都严格把控，传承百年匠心，展现非遗魅力。
                </p>
              </div>
            </div>

            <!-- 工序特点卡片 -->
            <div
              class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
            >
              <div class="mb-4">
                <div
                  class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <el-icon class="text-3xl text-primary"
                    ><Collection
                  /></el-icon>
                </div>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-bold mb-3 text-gray-900">工序特点</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  每一道工序都蕴含着匠人的执着与追求，从泥料选取到造型塑形，从细节雕琢到色彩点染，层层把关，精益求精。传统与创新的碰撞，让每件作品都成为独特的艺术珍品。
                </p>
              </div>
            </div>

            <!-- 文化价值卡片 -->
            <div
              class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
            >
              <div class="mb-4">
                <div
                  class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <el-icon class="text-3xl text-primary"><Medal /></el-icon>
                </div>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-bold mb-3 text-gray-900">文化价值</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  凤翔泥塑承载着深厚的文化底蕴，是中国传统艺术的瑰宝。它不仅展现了民间艺术的独特魅力，更是非物质文化遗产的重要组成部分，见证着中华文明的传承与发展。
                </p>
              </div>
            </div>
          </div>

          <!-- 分隔装饰 -->
          <div class="relative h-32 flex items-center justify-center">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-px bg-gradient-to-r from-transparent to-primary/20"
              ></div>
              <div
                class="w-3 h-3 rounded-full border-2 border-primary/20"
              ></div>
              <div
                class="w-16 h-px bg-gradient-to-l from-transparent to-primary/20"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工序展示部分 -->
    <div class="py-16 bg-gradient-to-b from-gray-50/50 to-white relative">
      <div class="container mx-auto px-4">
        <!-- 工序标题 -->
        <div class="text-center mb-12">
          <div class="inline-block bg-primary/10 px-4 py-1 rounded-full mb-4">
            <span class="text-primary font-medium">制作流程</span>
          </div>
          <h2 class="text-4xl font-bold mb-4">匠心工艺 • 十一道工序</h2>
          <el-divider>
            <el-icon class="text-primary text-xl"><Tools /></el-icon>
          </el-divider>

          <!-- 添加统计信息 -->
          <div class="flex justify-center gap-8 mt-8 mb-12">
            <el-statistic title="工序总数" :value="11">
              <template #prefix>
                <el-icon><Collection /></el-icon>
              </template>
            </el-statistic>
            <el-statistic title="总耗时" value="80-100">
              <template #prefix>
                <el-icon><Timer /></el-icon>
              </template>
              <template #suffix>
                <span>小时</span>
              </template>
            </el-statistic>
          </div>
        </div>

        <!-- 工序时间轴展示 -->
        <div class="max-w-6xl mx-auto">
          <div
            class="bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <el-timeline>
              <el-timeline-item
                v-for="(step, index) in craftingSteps"
                :key="index"
                :type="index % 2 === 0 ? 'primary' : 'warning'"
                size="large"
                :hollow="true"
              >
                <el-card class="process-card" shadow="hover">
                  <div class="flex flex-col lg:flex-row gap-8">
                    <!-- 左侧：图片展示 -->
                    <div class="lg:w-2/5 flex flex-col">
                      <div
                        class="relative rounded-xl overflow-hidden shadow-lg flex-grow group"
                      >
                        <!-- 序号标记 -->
                        <div class="absolute top-3 left-3 z-20">
                          <div
                            class="bg-white/90 backdrop-blur text-primary px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                          >
                            第{{ index + 1 }}步
                          </div>
                        </div>

                        <!-- 标题区域 -->
                        <div
                          class="bg-primary py-3 px-4 border-b border-primary/20"
                        >
                          <h3
                            class="text-white text-lg font-bold text-center flex items-center justify-center gap-2"
                          >
                            <span
                              class="inline-block w-6 h-px bg-white/50"
                            ></span>
                            {{ step.title }}
                            <span
                              class="inline-block w-6 h-px bg-white/50"
                            ></span>
                          </h3>
                        </div>

                        <!-- 图片容器 -->
                        <div
                          class="bg-gray-50 p-4 flex items-center justify-center overflow-hidden"
                        >
                          <el-image
                            :src="step.image"
                            fit="contain"
                            class="w-full h-[220px] object-contain transition-all duration-500 group-hover:scale-105"
                            :preview-src-list="[step.image]"
                            :initial-index="0"
                            preview-teleported
                            :hide-on-click-modal="true"
                          >
                            <template #placeholder>
                              <div
                                class="flex items-center justify-center h-full w-full"
                              >
                                <el-icon
                                  class="text-4xl text-gray-400 animate-spin"
                                >
                                  <Loading />
                                </el-icon>
                              </div>
                            </template>
                          </el-image>
                        </div>

                        <!-- 耗时和难度展示 -->
                        <div
                          class="bg-gray-50 px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm"
                        >
                          <div class="flex items-center gap-2">
                            <el-icon class="text-primary"><Timer /></el-icon>
                            <span class="text-gray-600"
                              >耗时：{{ step.duration }}</span
                            >
                          </div>
                          <div class="flex items-center gap-2">
                            <span class="text-gray-600">难度：</span>
                            <div class="flex">
                              <el-icon
                                v-for="n in step.difficulty"
                                :key="n"
                                class="text-primary"
                              >
                                <Star />
                              </el-icon>
                              <el-icon
                                v-for="n in 5 - step.difficulty"
                                :key="n + step.difficulty"
                                class="text-gray-300"
                              >
                                <Star />
                              </el-icon>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 右侧：内容展示 -->
                    <div
                      class="lg:w-3/5 flex flex-col justify-center space-y-6"
                    >
                      <!-- 工序描述 -->
                      <el-card
                        shadow="hover"
                        class="border-none bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300"
                      >
                        <template #header>
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                              <el-tag
                                :type="index % 2 === 0 ? 'primary' : 'warning'"
                                effect="dark"
                                class="text-base px-4 py-1"
                                round
                              >
                                工序描述
                              </el-tag>
                            </div>
                          </div>
                        </template>
                        <p class="text-gray-600 text-lg leading-relaxed">
                          {{ step.description }}
                        </p>
                        <div
                          class="mt-4 text-sm text-primary font-medium border-l-4 border-primary/20 pl-3 py-1 bg-primary/5 rounded-r-md"
                        >
                          <strong>要点：</strong>{{ step.keyPoints }}
                        </div>
                      </el-card>

                      <!-- 工艺要点 -->
                      <el-card
                        shadow="hover"
                        class="border-none hover:bg-primary/5 transition-all duration-300"
                      >
                        <template #header>
                          <div class="flex items-center gap-3">
                            <el-tag
                              :type="index % 2 === 0 ? 'primary' : 'warning'"
                              effect="dark"
                              class="text-base px-4 py-1"
                              round
                            >
                              工艺要点
                            </el-tag>
                            <div class="h-px flex-grow bg-primary/10"></div>
                          </div>
                        </template>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div
                            v-for="(detail, i) in step.details"
                            :key="i"
                            class="flex items-start gap-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300"
                          >
                            <div
                              class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                            >
                              <el-icon class="text-primary"><Select /></el-icon>
                            </div>
                            <div class="flex-1">
                              <el-text
                                class="text-gray-600 text-base"
                                :type="index % 2 === 0 ? 'primary' : 'warning'"
                              >
                                {{ detail }}
                              </el-text>
                            </div>
                          </div>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>

    <!-- 工艺特色 -->
    <div class="py-16 bg-gray-50/80">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <div class="inline-block bg-primary/10 px-4 py-1 rounded-full mb-4">
              <span class="text-primary font-medium">工艺特色</span>
            </div>
            <h2 class="text-3xl font-bold mb-4">传统技艺的精髓</h2>
            <el-divider>
              <el-icon class="text-primary text-xl"><Medal /></el-icon>
            </el-divider>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="(feature, index) in craftFeatures"
              :key="index"
              class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
            >
              <div
                class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto"
              >
                <el-icon class="text-3xl text-primary">
                  <component :is="feature.icon" />
                </el-icon>
              </div>
              <h3 class="text-xl font-bold mb-3 text-center">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 text-sm text-center">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加返回顶部按钮 -->
    <el-backtop :right="40" :bottom="40" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import type { Component } from "@vue/runtime-core";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";

const { Collection, Tools, Medal, Select, Timer, Star, Picture, Loading } =
  ElementPlusIconsVue;

// 添加banner背景图片
const bannerBg = new URL("../assets/images/banners/zhizuo.jpg", import.meta.url)
  .href;

const craftingSteps = ref([
  {
    title: "选料",
    description:
      "泥塑制作的第一步也是最关键的一步。工匠们需要精选上等的黄土和红土，通过手感和经验判断泥料的纯度和韧性。优质的泥料应当细腻均匀，不含砂石杂质，揉捏时有适度的黏性和延展性。",
    image: new URL("../assets/images/Process_diagrams/1.jpg", import.meta.url)
      .href,
    details: [
      "选用产自当地的优质黄土和红土，确保泥料纯净度",
      "通过筛选和沉淀去除泥料中的砂石和有机杂质",
      "根据不同造型需求调配泥料的黏度和韧性",
      "保持适当的含水量，为后续制作打下基础",
    ],
    keyPoints: "泥料的品质直接决定作品的成败，需要严格把控原料质量",
    duration: "1-2小时",
    difficulty: 2,
  },
  {
    title: "和泥",
    description:
      "这是一个需要耐心和力气的工序。工匠们将筛选好的泥料与清水按照特定比例调配，反复揉捏和击打，排出气泡，使泥料达到最佳的塑性状态。好的泥料应当柔韧均匀，既不会粘手，也不会有干裂现象。",
    image: new URL("../assets/images/Process_diagrams/2.jpg", import.meta.url)
      .href,
    details: [
      "按照1:0.4的比例精确调配水土，确保适度的含水量",
      "采用传统的揉捏技法，反复挤压排出气泡",
      "通过击打使泥料纤维交织，增强韧性",
      "反复折叠揉搓，直至泥料细腻均匀",
    ],
    keyPoints: "泥料的均匀性和适当的含水量是制作精品的关键",
    duration: "2-3小时",
    difficulty: 2,
  },
  {
    title: "打坯",
    description:
      "打坯是泥塑制作中最见功力的环节。工匠需要凭借丰富的经验和熟练的手法，将泥料塑造成作品的基本形态。这一步骤不仅要把握整体比例，还要为后续细节的刻画预留空间，体现出作品的神韵。",
    image: new URL("../assets/images/Process_diagrams/3.jpg", import.meta.url)
      .href,
    details: [
      "根据设计图纸或传统样式构建作品骨架",
      "运用传统手法塑造主体轮廓，注重比例协调",
      "预留适当的修改空间，为后续细节雕琢做准备",
      "确保作品结构稳固，避免后期变形",
    ],
    keyPoints: "需要准确把握造型比例，为后续工序打下坚实基础",
    duration: "3-4小时",
    difficulty: 3,
  },
  {
    title: "修胚",
    description:
      "修胚是对打坯作品进行精细修整的过程，考验工匠的耐心和技艺。使用各种专业工具，如修坯刀、竹片、毛笔等，细致地修整作品的每一个细节，力求形态生动，线条流畅。",
    image: new URL("../assets/images/Process_diagrams/4.jpg", import.meta.url)
      .href,
    details: [
      "使用传统工具精细修整表面纹理和质感",
      "通过刮削、磨平等技法完善局部细节",
      "反复检查并调整作品的整体比例和造型",
      "特别注意面部表情等关键部位的刻画",
    ],
    keyPoints: "细节处理决定作品品质，需要极强的专注力和精湛的技艺",
    duration: "4-6小时",
    difficulty: 4,
  },
  {
    title: "晾干",
    description:
      "晾干是一个看似简单却极其讲究的工序。需要选择通风但避免阳光直射的环境，控制适宜的温度和湿度，让作品自然风干。这个过程需要经常检查，及时调整作品位置，预防开裂和变形。",
    image: new URL("../assets/images/Process_diagrams/5.jpg", import.meta.url)
      .href,
    details: [
      "选择阴凉通风处，避免阳光直射和温度剧变",
      "根据天气情况调整晾干时间和环境湿度",
      "定期检查作品状态，预防开裂和变形",
      "使用专业工具测量泥坯含水量",
    ],
    keyPoints: "晾干过程直接影响作品的稳定性和后续工序的顺利进行",
    duration: "48-72小时",
    difficulty: 1,
  },
  {
    title: "合货",
    description:
      "合货是将分件制作的部件精确组合的工序。工匠需要根据设计要求，将各个部件通过传统工艺手法完美结合。这一步骤不仅要确保结构牢固，还要保持作品的整体美感和协调性。",
    image: new URL("../assets/images/Process_diagrams/6.jpg", import.meta.url)
      .href,
    details: [
      "使用特制泥浆进行部件粘合，确保牢固",
      "精确对位各个部件，保持造型完整性",
      "采用传统工艺加固连接处，预防开裂",
      "细致处理接缝，确保外观自然",
    ],
    keyPoints: "部件的完美契合是作品成功的关键环节",
    duration: "2-3小时",
    difficulty: 3,
  },
  {
    title: "挂粉",
    description:
      "挂粉是为作品打造完美底色的重要工序。工匠们需要调配适当浓度的白粉浆料，采用特制的毛刷均匀涂抹。这道工序不仅为后续上色提供理想的基础，还能增强作品表面的细腻度。",
    image: new URL("../assets/images/Process_diagrams/7.jpg", import.meta.url)
      .href,
    details: [
      "精心调配白粉浆料，确保浓度适中",
      "使用专业毛刷均匀涂抹，避免漏刷和积粉",
      "多次薄层涂抹，打造细腻光滑的表面",
      "特别注意细节部位的处理，确保覆盖均匀",
    ],
    keyPoints: "底色处理的质量直接影响最终的上色效果",
    duration: "2-3小时",
    difficulty: 2,
  },
  {
    title: "勾线",
    description:
      "勾线是展现泥塑艺术精髓的关键工序。工匠运用专业的勾线工具，以流畅的线条勾勒出作品的轮廓和细节。每一笔都需要准确到位，既要突出造型特征，又要体现作品的艺术韵味。",
    image: new URL("../assets/images/Process_diagrams/8.jpg", import.meta.url)
      .href,
    details: [
      "选用不同粗细的专业勾线工具",
      "按照传统技法勾画轮廓和纹理",
      "注重线条的流畅性和韵律感",
      "精心处理交接处和细节部位",
    ],
    keyPoints: "线条的流畅与否直接体现作品的艺术价值",
    duration: "3-4小时",
    difficulty: 4,
  },
  {
    title: "上色",
    description:
      "上色是将泥塑作品点亮的重要环节。工匠们遵循传统的上色技法，使用天然矿物颜料调配色彩，采用分层上色的方式，让色彩自然过渡，富有层次感。每一处色彩的搭配都经过精心考量，既要符合传统审美，又要富有创新精神。",
    image: new URL("../assets/images/Process_diagrams/9.jpg", import.meta.url)
      .href,
    details: [
      "使用传统矿物颜料，确保色彩纯正持久",
      "采用多层次上色技法，营造丰富色调",
      "细致把控色彩过渡和晕染效果",
      "注重整体色彩搭配的和谐统一",
    ],
    keyPoints: "色彩运用需要丰富的经验和独特的艺术眼光",
    duration: "5-6小时",
    difficulty: 4,
  },
  {
    title: "上漆",
    description:
      "上漆是泥塑制作的最后一道防护工序。工匠们选用优质的传统漆料，采用特殊的上漆技法，既要确保漆层均匀光亮，又要保护作品不受环境影响。好的漆层能够突显作品的质感，延长保存时间。",
    image: new URL("../assets/images/Process_diagrams/10.jpg", import.meta.url)
      .href,
    details: [
      "选用传统优质漆料，确保保护效果",
      "采用专业技法控制漆层厚度",
      "确保漆面均匀，无漏刷和积漆现象",
      "根据不同部位调整漆料浓度",
    ],
    keyPoints: "漆层的质量直接关系到作品的保存寿命",
    duration: "2-3小时",
    difficulty: 2,
  },
  {
    title: "成品",
    description:
      "成品检验是对整个制作过程的最终确认。工匠们需要从多个角度仔细检查作品的每个细节，确保造型准确、色彩艳丽、漆面光亮。这一步不仅是对作品品质的把关，更是对传统工艺的尊重。",
    image: new URL("../assets/images/Process_diagrams/11.jpg", import.meta.url)
      .href,
    details: [
      "全方位检查作品的造型和比例",
      "仔细核对色彩效果和细节处理",
      "确认漆面质量和保护效果",
      "对作品进行最后的修饰完善",
    ],
    keyPoints: "成品检验是确保作品完美呈现的最后把关",
    duration: "2-3小时",
    difficulty: 3,
  },
]);

const craftFeatures = ref([
  {
    icon: Picture,
    title: "传统技艺",
    description: "十一道精细工序，传承百年匠心。",
  },
  {
    icon: Tools,
    title: "工艺特色",
    description: "造型生动，色彩艳丽，富有民间特色。",
  },
  {
    icon: Medal,
    title: "文化价值",
    description: "凝聚民间智慧，展现非遗魅力。",
  },
]);
</script>

<style scoped>
.process-card {
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
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

/* 添加卡片悬停动画 */
.el-card.process-card {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.el-card.process-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: rgba(var(--el-color-primary-rgb), 0.2);
}

/* 添加图片容器动画 */
.el-image {
  transition: all 0.5s ease;
}

.group:hover .el-image {
  transform: scale(1.05);
}

/* 添加背景纹理 */
.bg-gradient-to-b {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c75d38' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

:deep(.el-timeline-item__node--large) {
  width: 16px;
  height: 16px;
}

:deep(.el-timeline-item__tail) {
  border-left: 2px solid var(--el-border-color-lighter);
  left: 7px;
}

:deep(.el-card) {
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9);
}

:deep(.el-card:hover) {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

:deep(.el-timeline) {
  padding-left: 20px;
}

:deep(.el-timeline-item__wrapper) {
  padding-left: 30px;
}

:deep(.el-card__body) {
  padding: 24px;
}

:deep(.el-image) {
  display: block;
  width: 100%;
  height: 100%;
}

:deep(.el-timeline-item__content) {
  overflow: visible;
}

:deep(.el-card.border-none) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

:deep(.el-card__header) {
  padding: 12px 20px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

:deep(.el-tag) {
  border: none;
}

:deep(.el-text) {
  line-height: 1.6;
}

/* 添加中国风装饰元素 */
.container {
  position: relative;
}

.container::before,
.container::after {
  content: "❖";
  position: absolute;
  top: 2rem;
  font-size: 1.5rem;
  color: var(--el-color-primary);
  opacity: 0.2;
}

.container::before {
  left: 2rem;
}

.container::after {
  right: 2rem;
}

/* 优化背景装饰 */
.bg-gradient-to-b {
  position: relative;
}

.bg-gradient-to-b::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
      circle at 100% 100%,
      rgba(var(--el-color-primary-rgb), 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 0% 0%,
      rgba(var(--el-color-primary-rgb), 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

/* 添加页面过渡动画 */
@keyframes slideInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.container > div {
  animation: slideInUp 0.8s ease-out forwards;
}

/* 添加装饰边框 */
.bg-white\/50 {
  position: relative;
  overflow: hidden;
}

.bg-white\/50::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--el-color-primary),
    transparent
  );
  opacity: 0.3;
}

/* 添加中国风装饰图案 */
.py-16::before {
  content: "";
  position: absolute;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0ZM30 10C41.0457 10 50 18.9543 50 30C50 41.0457 41.0457 50 30 50C18.9543 50 10 41.0457 10 30C10 18.9543 18.9543 10 30 10Z' fill='%23c75d38' fill-opacity='0.1'/%3E%3C/svg%3E");
  opacity: 0.5;
  pointer-events: none;
}

.py-16::after {
  content: "";
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0ZM30 10C41.0457 10 50 18.9543 50 30C50 41.0457 41.0457 50 30 50C18.9543 50 10 41.0457 10 30C10 18.9543 18.9543 10 30 10Z' fill='%23c75d38' fill-opacity='0.1'/%3E%3C/svg%3E");
  opacity: 0.5;
  pointer-events: none;
  transform: rotate(180deg);
}

/* 添加图片加载动画 */
:deep(.el-image) {
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
</style>
