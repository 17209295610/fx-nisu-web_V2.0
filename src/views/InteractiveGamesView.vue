<template>
  <div
    class="min-h-screen relative bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-hidden"
  >
    <!-- 顶部横幅 -->
    <div class="relative h-[500px] bg-primary overflow-hidden">
      <!-- 背景图片 -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-40"
        :style="{ backgroundImage: `url(${bannerBg})` }"
      ></div>
      <!-- 渐变遮罩 -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"
      ></div>
      <!-- 内容区域 -->
      <div class="container mx-auto px-4 h-full flex items-center relative">
        <!-- 游戏标题区优化 -->
        <div class="text-center space-y-4">
          <h1
            class="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient"
          >
            十二生肖消消乐
          </h1>
          <p class="text-xl text-gray-400 tracking-wider">
            趣味游戏 • 非遗传承
          </p>
        </div>
      </div>
    </div>

    <!-- 游戏区域 -->
    <div class="game-container">
      <!-- 添加加载动画 -->
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center z-50"
      >
        <div class="w-24 h-24 relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="w-12 h-12 border-4 border-blue-400 border-b-transparent rounded-full animate-spin-slow"
            ></div>
          </div>
        </div>
        <p class="mt-6 text-xl font-bold text-white">游戏加载中...</p>
        <p class="mt-2 text-gray-400">正在准备十二生肖消消乐</p>
      </div>

      <!-- 游戏网格 -->
      <div v-else class="game-grid" :class="{ paused: isPaused }">
        <!-- 游戏主体区域优化 -->
        <div class="container mx-auto px-4 py-8">
          <div class="max-w-6xl mx-auto">
            <div class="flex flex-col lg:flex-row gap-8">
              <!-- 左侧信息面板优化 -->
              <div class="lg:w-1/3 space-y-6">
                <!-- 游戏状态和音效控制 -->
                <div class="flex gap-2 mb-4">
                  <div
                    class="flex-1 flex items-center gap-2 bg-gray-800/40 backdrop-blur-xl rounded-xl px-4 py-2 border border-gray-700/50"
                  >
                    <div
                      class="w-2 h-2 rounded-full animate-pulse"
                      :class="isPlaying ? 'bg-green-500' : 'bg-gray-500'"
                    ></div>
                    <span class="text-sm">{{
                      isPlaying ? "游戏进行中" : "等待开始"
                    }}</span>
                  </div>

                  <button
                    @click="toggleSound"
                    class="flex items-center justify-center w-12 h-10 bg-gray-800/40 backdrop-blur-xl rounded-xl border border-gray-700/50 hover:bg-gray-700/40 transition-colors"
                  >
                    <el-icon :class="isMuted ? 'text-gray-400' : 'text-white'">
                      <i-ep-mute v-if="isMuted" />
                      <i-ep-bell v-else />
                    </el-icon>
                  </button>
                </div>

                <!-- 关卡信息卡片 -->
                <div
                  class="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl"
                >
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <h2 class="text-2xl font-bold">
                        第 {{ currentLevel }} 关
                      </h2>
                      <p class="text-gray-400">{{ levelStatus }}</p>
                    </div>
                    <el-tag
                      :type="isPlaying ? 'success' : 'info'"
                      effect="dark"
                      round
                      size="large"
                    >
                      {{ isPlaying ? "游戏中" : "未开始" }}
                    </el-tag>
                  </div>

                  <!-- 游戏数据 -->
                  <div class="space-y-6">
                    <!-- 分数显示优化 -->
                    <div
                      class="bg-gray-800/50 rounded-xl p-4 transform hover:scale-105 transition-all duration-300"
                    >
                      <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center gap-2">
                          <div
                            class="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center"
                          >
                            <el-icon class="text-yellow-500"
                              ><i-ep-medal
                            /></el-icon>
                          </div>
                          <span class="text-gray-400">当前分数</span>
                        </div>
                        <span
                          class="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent"
                        >
                          {{ score }}
                        </span>
                      </div>
                      <el-progress
                        :percentage="Math.min((score / targetScore) * 100, 100)"
                        :format="() => `目标: ${targetScore}`"
                        :stroke-width="12"
                        class="custom-progress"
                      >
                        <template #default="{ percentage }">
                          <span class="progress-label"
                            >{{ Math.floor(percentage) }}%</span
                          >
                        </template>
                      </el-progress>
                    </div>

                    <!-- 时间显示优化 -->
                    <div
                      class="bg-gray-800/50 rounded-xl p-4 transform hover:scale-105 transition-all duration-300"
                    >
                      <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                          <div
                            class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center"
                          >
                            <el-icon class="text-blue-500"
                              ><i-ep-timer
                            /></el-icon>
                          </div>
                          <span class="text-gray-400">剩余时间</span>
                        </div>
                        <div
                          class="text-3xl font-mono font-bold"
                          :class="[
                            timeWarning
                              ? 'text-red-500 animate-pulse'
                              : 'text-blue-400',
                            'transition-colors duration-300',
                          ]"
                        >
                          {{ formatTime(remainingTime) }}
                        </div>
                      </div>
                      <el-progress
                        :percentage="
                          (remainingTime / gameConfig.baseTimeLimit) * 100
                        "
                        :stroke-width="8"
                        :show-text="false"
                        class="mt-2"
                        :status="timeWarning ? 'exception' : ''"
                      />
                    </div>

                    <!-- 连击显示优化 -->
                    <div
                      class="bg-gray-800/50 rounded-xl p-4 transform hover:scale-105 transition-all duration-300"
                    >
                      <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                          <div
                            class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center"
                          >
                            <el-icon class="text-purple-500"
                              ><i-ep-star
                            /></el-icon>
                          </div>
                          <span class="text-gray-400">最大连击</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <span
                            class="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                          >
                            {{ maxCombo }}
                          </span>
                          <span class="text-sm text-gray-400">连击</span>
                        </div>
                      </div>
                      <div
                        class="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden"
                      >
                        <div
                          class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                          :style="{ width: `${(maxCombo / 10) * 100}%` }"
                        ></div>
                      </div>
                    </div>

                    <!-- 提示次数显示 -->
                    <div
                      class="bg-gray-800/50 rounded-xl p-4 transform hover:scale-105 transition-all duration-300"
                    >
                      <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                          <div
                            class="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center"
                          >
                            <el-icon class="text-green-500"
                              ><i-ep-lightbulb
                            /></el-icon>
                          </div>
                          <span class="text-gray-400">提示次数</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="text-2xl font-bold text-green-400">
                            {{ hintCount }}
                          </span>
                          <span class="text-sm text-gray-400">次</span>
                        </div>
                      </div>
                      <button
                        @click="getHint"
                        class="mt-2 w-full py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-colors duration-300 flex items-center justify-center gap-2"
                        :class="{
                          'opacity-50 cursor-not-allowed':
                            !isPlaying ||
                            isPaused ||
                            hintCount <= 0 ||
                            showingHint,
                        }"
                        :disabled="
                          !isPlaying ||
                          isPaused ||
                          hintCount <= 0 ||
                          showingHint
                        "
                      >
                        <el-icon><i-ep-lightbulb /></el-icon>
                        <span>使用提示</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 操作按钮优化 -->
                <div class="space-y-4">
                  <el-button
                    type="primary"
                    size="large"
                    class="w-full !h-14 !text-lg !rounded-xl hover:scale-105 transform transition-all duration-300"
                    @click="startGame"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <el-icon><i-ep-video-play /></el-icon>
                      <span>{{ isPlaying ? "重新开始" : "开始游戏" }}</span>
                    </div>
                  </el-button>

                  <el-button
                    v-if="isPlaying"
                    type="warning"
                    size="large"
                    class="w-full !h-14 !text-lg !rounded-xl hover:scale-105 transform transition-all duration-300"
                    @click="pauseGame"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <el-icon>
                        <i-ep-video-play v-if="isPaused" />
                        <i-ep-video-pause v-else />
                      </el-icon>
                      <span>{{ isPaused ? "继续游戏" : "暂停游戏" }}</span>
                    </div>
                  </el-button>
                </div>

                <!-- 游戏说明优化 -->
                <div
                  class="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl"
                >
                  <!-- 这里原来有游戏说明内容，现在已被移除 -->
                </div>
              </div>

              <!-- 右侧游戏区域优化 -->
              <div class="lg:w-2/3">
                <div
                  class="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl"
                >
                  <!-- 游戏网格优化 -->
                  <div class="game-grid-container">
                    <div class="grid grid-cols-8 gap-3">
                      <div
                        v-for="(tile, index) in gameGrid"
                        :key="index"
                        class="game-tile"
                        :class="{
                          selected: selectedTile === index,
                          'hint-tile': hintTiles.includes(index) && showingHint,
                          'hover:scale-110': isPlaying && !isPaused,
                          'opacity-75 cursor-not-allowed':
                            !isPlaying || isPaused,
                          'filter grayscale': !isPlaying,
                        }"
                        @click="selectTile(index)"
                      >
                        <div class="tile-inner">
                          <img
                            :src="getZodiacImage(tile)"
                            :alt="tile"
                            class="w-full h-full object-cover rounded-lg transition-all duration-300"
                            :class="{
                              'grayscale brightness-75': !isPlaying || isPaused,
                              'hover:brightness-110': isPlaying && !isPaused,
                            }"
                          />
                          <div class="tile-glow"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 游戏结果弹窗优化 -->
    <el-dialog
      v-model="showResult"
      :title="gameResult.success ? '恭喜过关！' : '游戏结束'"
      width="360px"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="game-dialog"
    >
      <div class="text-center p-6">
        <!-- 成功图标动画 -->
        <div class="mb-8">
          <div v-if="gameResult.success" class="relative w-24 h-24 mx-auto">
            <div
              class="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <el-icon class="text-6xl text-yellow-500 animate-bounce">
                <i-ep-trophy />
              </el-icon>
            </div>
          </div>
          <el-icon v-else class="text-6xl text-red-500 animate-bounce">
            <i-ep-circle-close />
          </el-icon>
        </div>

        <!-- 游戏结果信息 -->
        <div class="space-y-4">
          <h3 class="text-2xl font-bold text-gradient">
            {{
              gameResult.success ? `第 ${currentLevel} 关通关！` : "游戏结束"
            }}
          </h3>

          <!-- 分数展示 -->
          <div class="bg-gray-800/50 rounded-xl p-4 space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-400">最终得分</span>
              <span class="text-2xl font-bold text-yellow-500">{{
                score
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-400">最大连击</span>
              <span class="text-xl font-bold text-purple-500"
                >{{ maxCombo }}连击</span
              >
            </div>
          </div>

          <!-- 按钮 -->
          <el-button
            type="primary"
            @click="handleResultConfirm"
            class="w-full !h-12 !text-lg !rounded-xl mt-6 hover:scale-105 transform transition-all duration-300"
          >
            <div class="flex items-center justify-center gap-2">
              <el-icon>
                <i-ep-video-play v-if="gameResult.success" />
                <i-ep-refresh v-else />
              </el-icon>
              <span>{{ gameResult.success ? "进入下一关" : "重新开始" }}</span>
            </div>
          </el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 在游戏区域下方添加详细游戏说明 -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <div
          class="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl"
        >
          <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
            <el-icon class="mr-2"><i-ep-info-filled /></el-icon>
            游戏详细说明
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- 左侧：基本规则和操作方法 -->
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-bold text-primary mb-3">基本规则</h3>
                <p class="text-gray-300">
                  十二生肖消消乐是一款经典的三消游戏，通过交换相邻的生肖图案，形成三个或更多相同的生肖连在一起，即可消除获得分数。
                </p>
              </div>

              <div>
                <h3 class="text-xl font-bold text-primary mb-3">操作方法</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    点击一个生肖图案，然后点击相邻的另一个生肖图案进行交换
                  </li>
                  <li>
                    只有交换后能形成三个或更多相同生肖的情况下，交换才会成功
                  </li>
                  <li>消除后，上方的生肖会自动下落，空位会由新的生肖填充</li>
                  <li>连续消除可以获得连击奖励，提高得分</li>
                  <li>使用提示按钮可以获得可能的移动提示</li>
                </ul>
              </div>

              <div>
                <h3 class="text-xl font-bold text-primary mb-3">得分规则</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-300">
                  <li>每消除一个生肖获得10分基础分数</li>
                  <li>连击会提供额外的分数倍率：连击越多，倍率越高</li>
                  <li>一次消除的生肖越多，获得的分数越高</li>
                  <li>达到目标分数即可通关，进入下一关</li>
                </ul>
              </div>
            </div>

            <!-- 右侧：关卡系统和难度变化 -->
            <div>
              <h3 class="text-xl font-bold text-primary mb-3">关卡系统</h3>
              <p class="text-gray-300 mb-4">
                游戏采用无限关卡设计，每通过一关，难度会逐渐提高：
              </p>

              <div class="space-y-4">
                <div class="bg-gray-700/30 rounded-lg p-4">
                  <h4 class="font-semibold text-yellow-400 mb-2">
                    目标分数增加
                  </h4>
                  <p class="text-gray-300">
                    第一关目标分数为500分，之后每关增加300分
                  </p>
                  <div class="mt-2 flex gap-2">
                    <span class="px-2 py-1 bg-gray-700 rounded text-xs"
                      >第一关: 500分</span
                    >
                    <span class="px-2 py-1 bg-gray-700 rounded text-xs"
                      >第二关: 800分</span
                    >
                    <span class="px-2 py-1 bg-gray-700 rounded text-xs"
                      >第三关: 1100分</span
                    >
                  </div>
                </div>

                <div class="bg-gray-700/30 rounded-lg p-4">
                  <h4 class="font-semibold text-blue-400 mb-2">时间限制减少</h4>
                  <p class="text-gray-300">
                    第一关时间为120秒，之后每关减少10秒，最低不少于60秒
                  </p>
                  <div class="mt-2 flex gap-2">
                    <span class="px-2 py-1 bg-gray-700 rounded text-xs"
                      >第一关: 120秒</span
                    >
                    <span class="px-2 py-1 bg-gray-700 rounded text-xs"
                      >第二关: 110秒</span
                    >
                    <span class="px-2 py-1 bg-gray-700 rounded text-xs"
                      >第七关+: 60秒</span
                    >
                  </div>
                </div>

                <div class="bg-gray-700/30 rounded-lg p-4">
                  <h4 class="font-semibold text-green-400 mb-2">
                    生肖种类增加
                  </h4>
                  <p class="text-gray-300">
                    第一关使用6种生肖，每两关增加一种，最多使用全部12种生肖
                  </p>
                </div>

                <div class="bg-gray-700/30 rounded-lg p-4">
                  <h4 class="font-semibold text-purple-400 mb-2">
                    提示次数减少
                  </h4>
                  <p class="text-gray-300">
                    初始每关有3次提示机会，每三关减少一次，最少1次
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "@vue/runtime-dom";
import { ElMessage } from "element-plus";
// 使用正确的图标导入方式
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { Loading } from "@element-plus/icons-vue";

// 添加游戏状态类型
type GameStatus = "未开始" | "进行中" | "已暂停" | "已结束";

// 修改状态变量
const levelStatus = ref<GameStatus>("未开始");

// 游戏状态
const isPlaying = ref(false);
const isPaused = ref(false);
const currentLevel = ref(1);
const score = ref(0);
const targetScore = ref(100);
const remainingTime = ref(60);
const timeWarning = ref(false);
const selectedTile = ref<number | null>(null);
const gameGrid = ref<string[]>([]);
const showResult = ref(false);
const gameResult = ref({
  success: false,
  message: "",
});

// 连击系统
const combo = ref(0);
const maxCombo = ref(0);

// 添加提示系统
const hintTimer = ref<number>(0);
const hintCount = ref(3); // 每关有3次提示机会
const showingHint = ref(false);
const hintTiles = ref<number[]>([]);

// 导入图片
import img1 from "../assets/images/游戏图片/1.jpg";
import img2 from "../assets/images/游戏图片/2.jpg";
import img3 from "../assets/images/游戏图片/3.jpg";
import img4 from "../assets/images/游戏图片/4.jpg";
import img5 from "../assets/images/游戏图片/5.jpg";
import img6 from "../assets/images/游戏图片/6.jpg";
import img7 from "../assets/images/游戏图片/7.jpg";
import img8 from "../assets/images/游戏图片/8.jpg";
import img9 from "../assets/images/游戏图片/9.jpg";
import img10 from "../assets/images/游戏图片/10.jpg";
import img11 from "../assets/images/游戏图片/11.jpg";
import img12 from "../assets/images/游戏图片/12.jpg";

// 在导入区域添加音效导入
import successSound from "../assets/images/游戏图片/音效/胜利音乐.mp3";
import failureSound from "../assets/images/游戏图片/音效/失败音.mp3";
import matchSound from "../assets/images/游戏图片/音效/消除音和连击音效.mp3";

// 在导入区域添加背景音乐
import bgMusic from "../assets/images/游戏图片/音效/徐梦圆 - CHINA-韵.mp3";

// 修改生肖图片映射
const zodiacImages = {
  rat: img1,
  ox: img2,
  tiger: img3,
  rabbit: img4,
  dragon: img5,
  snake: img6,
  horse: img7,
  goat: img8,
  monkey: img9,
  rooster: img10,
  dog: img11,
  pig: img12,
};

// 获取生肖图片
const getZodiacImage = (zodiac: string) => {
  return zodiacImages[zodiac as keyof typeof zodiacImages];
};

// 格式化时间
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

let timer: number;

// 游戏配置 - 提高难度
const gameConfig = {
  // 基础目标分数
  baseTargetScore: 500,
  // 每关增加的目标分数
  targetScoreIncrement: 300,
  // 基础时间限制（秒）
  baseTimeLimit: 120,
  // 每关减少的时间（秒）
  timeLimitDecrement: 10,
  // 最低时间限制（秒）
  minTimeLimit: 60,
  // 每关奖励的额外时间（秒）
  bonusTimePerLevel: 15,
  // 最大连击倍数
  maxComboMultiplier: 5,
  // 每关增加的生肖种类数量
  zodiacTypesPerLevel: (level) => Math.min(6 + Math.floor(level / 2), 12),
  // 每关的提示次数
  hintsPerLevel: (level) => Math.max(3 - Math.floor((level - 1) / 3), 1),
  // 每关的最大连击奖励
  comboBonus: (level) => 1 + Math.min(level * 0.1, 0.5),
};

// 在 setup 中添加音效相关逻辑
const audioSuccess = new Audio(successSound);
const audioFailure = new Audio(failureSound);
const audioMatch = new Audio(matchSound);

// 在 setup 中添加音效控制状态
const isMuted = ref(false);

// 修改音效控制函数，同时控制背景音乐
const toggleSound = () => {
  isMuted.value = !isMuted.value;
  audioSuccess.muted = isMuted.value;
  audioFailure.muted = isMuted.value;
  audioMatch.muted = isMuted.value;
  audioBg.muted = isMuted.value; // 添加背景音乐的控制
};

// 在 setup 中添加背景音乐相关逻辑
const audioBg = new Audio(bgMusic);
audioBg.loop = true; // 设置循环播放

// 添加加载状态
const isLoading = ref(true);

// 添加游戏说明状态
const showInstructions = ref(false);

// 修复初始化游戏函数，优化加载速度
const initializeGame = () => {
  // 设置加载状态
  isLoading.value = true;

  // 重置游戏状态
  currentLevel.value = 1;
  score.value = 0;
  targetScore.value = gameConfig.baseTargetScore;
  remainingTime.value = gameConfig.baseTimeLimit;
  combo.value = 0;
  maxCombo.value = 0;
  isPlaying.value = false;
  isPaused.value = false;
  showingHint.value = false;
  hintTiles.value = [];
  hintCount.value = gameConfig.hintsPerLevel(1);
  timeWarning.value = false;
  levelStatus.value = "未开始";
  showResult.value = false;
  gameResult.value = { success: false, message: "" };
  selectedTile.value = null;

  // 初始化游戏网格
  initializeGrid();

  // 使用更短的加载延迟
  setTimeout(() => {
    isLoading.value = false;
    // 移除显示游戏说明
    // showInstructions.value = true;
  }, 500);
};

// 预加载图片资源
const preloadImages = () => {
  const imagePromises = Object.values(zodiacImages).map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  });

  return Promise.all(imagePromises);
};

// 预加载音频资源
const preloadAudio = () => {
  // 预加载所有音频文件
  audioMatch.load();
  audioSuccess.load();
  audioFailure.load();
  audioBg.load();
};

// 修改 onMounted 钩子，添加资源预加载
onMounted(async () => {
  isLoading.value = true;

  try {
    // 并行预加载资源
    await Promise.all([
      preloadImages(),
      new Promise((resolve) => {
        preloadAudio();
        resolve(true);
      }),
    ]);

    // 资源加载完成后初始化游戏
    initializeGame();
  } catch (error) {
    console.error("资源加载失败:", error);
    // 即使加载失败也初始化游戏
    initializeGame();
  }
});

// 修改 initializeGrid 函数，确保生成的网格没有初始匹配
const initializeGrid = () => {
  let newGrid = Array(64).fill("");

  // 根据当前关卡确定使用的生肖种类数量
  const zodiacTypesCount = gameConfig.zodiacTypesPerLevel(currentLevel.value);

  const zodiacTypes = [
    "rat",
    "ox",
    "tiger",
    "rabbit",
    "dragon",
    "snake",
    "horse",
    "goat",
    "monkey",
    "rooster",
    "dog",
    "pig",
  ].slice(0, zodiacTypesCount);

  // 填充网格
  for (let i = 0; i < 64; i++) {
    newGrid[i] = zodiacTypes[Math.floor(Math.random() * zodiacTypes.length)];
  }

  // 确保初始网格没有匹配的组合
  let attempts = 0;
  const maxAttempts = 100; // 防止无限循环

  while (hasInitialMatches(newGrid) && attempts < maxAttempts) {
    // 只替换那些形成匹配的方块
    for (let i = 0; i < 64; i++) {
      if (isPartOfMatch(newGrid, i)) {
        // 获取当前位置周围已有的生肖类型
        const surroundingTypes = getSurroundingTypes(newGrid, i);

        // 从可用的生肖类型中筛选出不会形成新匹配的类型
        const availableTypes = zodiacTypes.filter(
          (type) => !surroundingTypes.includes(type)
        );

        // 如果有可用类型，随机选择一个；否则从所有类型中随机选择
        if (availableTypes.length > 0) {
          newGrid[i] =
            availableTypes[Math.floor(Math.random() * availableTypes.length)];
        } else {
          newGrid[i] =
            zodiacTypes[Math.floor(Math.random() * zodiacTypes.length)];
        }
      }
    }
    attempts++;
  }

  // 确保有可能的匹配
  if (!hasPossibleMatches(newGrid)) {
    return initializeGrid(); // 递归重新初始化
  }

  gameGrid.value = newGrid;
};

// 获取周围的生肖类型（上、下、左、右）
const getSurroundingTypes = (grid, index) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const types = [];

  // 上方
  if (row > 0) types.push(grid[index - 8]);
  // 下方
  if (row < 7) types.push(grid[index + 8]);
  // 左侧
  if (col > 0) types.push(grid[index - 1]);
  // 右侧
  if (col < 7) types.push(grid[index + 1]);

  return types;
};

// 修改 fillEmptySpaces 函数，确保新生成的方块不会立即形成匹配
const fillEmptySpaces = () => {
  const newGrid = [...gameGrid.value];
  const zodiacTypesCount = gameConfig.zodiacTypesPerLevel(currentLevel.value);

  const zodiacTypes = [
    "rat",
    "ox",
    "tiger",
    "rabbit",
    "dragon",
    "snake",
    "horse",
    "goat",
    "monkey",
    "rooster",
    "dog",
    "pig",
  ].slice(0, zodiacTypesCount);

  // 从底部向上填充空白位置
  for (let col = 0; col < 8; col++) {
    for (let row = 7; row >= 0; row--) {
      const index = row * 8 + col;

      if (newGrid[index] === "") {
        // 获取周围已有的生肖类型
        const surroundingTypes = getSurroundingTypes(newGrid, index);

        // 尝试找到一个不会立即形成匹配的生肖类型
        let selectedType = "";
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
          // 随机选择一个生肖类型
          const randomType =
            zodiacTypes[Math.floor(Math.random() * zodiacTypes.length)];

          // 临时放置并检查是否会形成匹配
          newGrid[index] = randomType;
          if (!isPartOfMatch(newGrid, index)) {
            selectedType = randomType;
            break;
          }

          attempts++;
        }

        // 如果找不到不形成匹配的类型，就使用随机类型
        if (selectedType === "") {
          selectedType =
            zodiacTypes[Math.floor(Math.random() * zodiacTypes.length)];
        }

        newGrid[index] = selectedType;
      }
    }
  }

  gameGrid.value = newGrid;
};

// 检查一个位置是否是匹配的一部分
const isPartOfMatch = (grid, index) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const type = grid[index];

  // 检查水平匹配
  if (col >= 2 && grid[index - 1] === type && grid[index - 2] === type)
    return true;
  if (col <= 5 && grid[index + 1] === type && grid[index + 2] === type)
    return true;
  if (
    col >= 1 &&
    col <= 6 &&
    grid[index - 1] === type &&
    grid[index + 1] === type
  )
    return true;

  // 检查垂直匹配
  if (row >= 2 && grid[index - 16] === type && grid[index - 8] === type)
    return true;
  if (row <= 5 && grid[index + 8] === type && grid[index + 16] === type)
    return true;
  if (
    row >= 1 &&
    row <= 6 &&
    grid[index - 8] === type &&
    grid[index + 8] === type
  )
    return true;

  return false;
};

// 修改 hasInitialMatches 函数，接受一个网格参数
const hasInitialMatches = (grid = gameGrid.value) => {
  // 检查水平匹配
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      const index = row * 8 + col;
      const type = grid[index];

      if (type === "") continue;

      // 检查右侧两个位置
      if (col < 6 && grid[index + 1] === type && grid[index + 2] === type) {
        return true;
      }
    }
  }

  // 检查垂直匹配
  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 6; row++) {
      const index = row * 8 + col;
      const type = grid[index];

      if (type === "") continue;

      // 检查下方两个位置
      if (row < 6 && grid[index + 8] === type && grid[index + 16] === type) {
        return true;
      }
    }
  }

  return false;
};

// 修改 hasPossibleMatches 函数，接受一个网格参数
const hasPossibleMatches = (grid = gameGrid.value) => {
  // 创建网格的副本
  grid = [...grid];

  // 检查水平方向的潜在匹配
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 7; col++) {
      const index = row * 8 + col;
      const nextIndex = index + 1;

      if (grid[index] === "" || grid[nextIndex] === "") continue;

      // 保存原始值
      const originalValue1 = grid[index];
      const originalValue2 = grid[nextIndex];

      // 临时交换两个相邻的方块
      grid[index] = originalValue2;
      grid[nextIndex] = originalValue1;

      // 检查交换后是否形成匹配
      if (hasInitialMatches(grid)) {
        // 恢复原始状态
        grid[index] = originalValue1;
        grid[nextIndex] = originalValue2;
        return true;
      }

      // 恢复原始状态
      grid[index] = originalValue1;
      grid[nextIndex] = originalValue2;
    }
  }

  // 检查垂直方向的潜在匹配
  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 7; row++) {
      const index = row * 8 + col;
      const nextIndex = index + 8;

      if (grid[index] === "" || grid[nextIndex] === "") continue;

      // 保存原始值
      const originalValue1 = grid[index];
      const originalValue2 = grid[nextIndex];

      // 临时交换两个相邻的方块
      grid[index] = originalValue2;
      grid[nextIndex] = originalValue1;

      // 检查交换后是否形成匹配
      if (hasInitialMatches(grid)) {
        // 恢复原始状态
        grid[index] = originalValue1;
        grid[nextIndex] = originalValue2;
        return true;
      }

      // 恢复原始状态
      grid[index] = originalValue1;
      grid[nextIndex] = originalValue2;
    }
  }

  return false;
};

// 优化 getHint 函数，确保提示的准确性
const getHint = () => {
  if (
    !isPlaying.value ||
    isPaused.value ||
    hintCount.value <= 0 ||
    showingHint.value
  )
    return;

  // 查找可能的匹配
  const possibleMatches = findPossibleMatches();

  // 检查是否有可能的匹配
  if (possibleMatches.length > 0) {
    // 随机选择一个可能的匹配
    const randomMatch =
      possibleMatches[Math.floor(Math.random() * possibleMatches.length)];

    // 确保提示只显示两个需要交换的方块
    const hintPositions = [randomMatch[0], randomMatch[1]];

    // 显示提示
    hintTiles.value = hintPositions;
    showingHint.value = true;
    hintCount.value--;

    // 播放提示音效
    playSound("hint");

    // 5秒后隐藏提示
    setTimeout(() => {
      showingHint.value = false;
      hintTiles.value = [];
    }, 5000);

    // 显示提示消息
    ElMessage({
      message: "已显示可能的匹配，请交换高亮方块",
      type: "success",
      duration: 3000,
    });
  } else {
    // 没有可能的匹配，显示提示并重新排列
    ElMessage({
      message: "没有可消除的组合，正在重新排列...",
      type: "warning",
      duration: 3000,
    });

    // 延迟一下再重新排列，让用户看到消息
    setTimeout(() => {
      rearrangeGrid();
    }, 1500);
  }
};

// 添加一个新的函数来播放音效
const playSound = (type) => {
  if (isMuted.value) return;

  switch (type) {
    case "match":
      audioMatch.currentTime = 0;
      audioMatch.play().catch((e) => console.error("无法播放消除音效:", e));
      break;
    case "success":
      audioSuccess.currentTime = 0;
      audioSuccess.play().catch((e) => console.error("无法播放成功音效:", e));
      break;
    case "failure":
      audioFailure.currentTime = 0;
      audioFailure.play().catch((e) => console.error("无法播放失败音效:", e));
      break;
    case "hint":
      // 可以添加提示音效
      break;
  }
};

// 优化 checkMatches 函数，提高匹配检测的准确性
const checkMatches = async () => {
  const matches = new Set<number>();
  const grid = gameGrid.value;

  // 检查水平匹配
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      const index = row * 8 + col;
      const type = grid[index];

      if (type === "") continue;

      // 检查右侧两个位置
      if (col < 6 && grid[index + 1] === type && grid[index + 2] === type) {
        matches.add(index);
        matches.add(index + 1);
        matches.add(index + 2);

        // 检查更长的匹配
        let nextCol = col + 3;
        while (nextCol < 8 && grid[row * 8 + nextCol] === type) {
          matches.add(row * 8 + nextCol);
          nextCol++;
        }
      }
    }
  }

  // 检查垂直匹配
  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 6; row++) {
      const index = row * 8 + col;
      const type = grid[index];

      if (type === "") continue;

      // 检查下方两个位置
      if (row < 6 && grid[index + 8] === type && grid[index + 16] === type) {
        matches.add(index);
        matches.add(index + 8);
        matches.add(index + 16);

        // 检查更长的匹配
        let nextRow = row + 3;
        while (nextRow < 8 && grid[nextRow * 8 + col] === type) {
          matches.add(nextRow * 8 + col);
          nextRow++;
        }
      }
    }
  }

  // 如果有匹配
  if (matches.size > 0) {
    // 增加连击
    combo.value++;
    if (combo.value > maxCombo.value) {
      maxCombo.value = combo.value;
    }

    // 计算得分
    const addedScore = calculateScore(matches.size, combo.value);
    score.value += addedScore;

    // 显示得分动画
    showScoreAnimation(addedScore, combo.value);

    // 播放消除音效
    playSound("match");

    // 处理匹配
    await handleMatches(matches);

    // 检查是否达到目标分数
    if (score.value >= targetScore.value) {
      // 播放成功音效
      playSound("success");

      // 显示成功消息
      ElMessage({
        message: `恭喜！你已达到目标分数 ${targetScore.value}！`,
        type: "success",
        duration: 3000,
      });

      // 更新游戏状态
      isPlaying.value = false;
      levelStatus.value = "已完成";

      // 显示结果
      showResult.value = true;
      gameResult.value = {
        success: true,
        message: `恭喜通过第 ${currentLevel.value} 关！\n得分：${score.value}\n最大连击：${maxCombo.value}`,
      };

      // 停止计时器
      if (timer) {
        clearInterval(timer);
        timer = 0;
      }

      // 降低背景音乐音量
      audioBg.volume = 0.3;

      return true;
    }

    return true;
  }

  return false;
};

// 添加得分动画函数
const showScoreAnimation = (score, comboCount) => {
  // 这里可以添加得分动画的实现
  // 例如，可以在界面上显示一个临时的浮动分数
  console.log(`得分：+${score}，连击：${comboCount}`);
};

// 修改 startGame 函数，添加控制音乐重启的参数
const startGame = (restartMusic = true) => {
  if (timer) {
    clearInterval(timer);
    timer = 0;
  }

  // 只有在需要重新开始音乐时才重置
  if (restartMusic) {
    // 停止当前播放的背景音乐（如果有）
    audioBg.pause();
    audioBg.currentTime = 0;
    // 开始新的背景音乐
    audioBg.play().catch((e) => console.error("无法播放背景音乐:", e));
  } else if (audioBg.paused) {
    // 如果音乐暂停了但不需要重新开始，则继续播放
    audioBg.play().catch((e) => console.error("无法播放背景音乐:", e));
  }

  isPlaying.value = true;
  isPaused.value = false;
  score.value = 0;
  combo.value = 0;
  maxCombo.value = 0;
  selectedTile.value = null;
  timeWarning.value = false;
  showResult.value = false;
  hintCount.value = gameConfig.hintsPerLevel(currentLevel.value);
  showingHint.value = false;
  hintTiles.value = [];

  // 计算关卡时间和目标分数
  remainingTime.value = Math.max(
    gameConfig.baseTimeLimit -
      (currentLevel.value - 1) * gameConfig.timeLimitDecrement,
    gameConfig.minTimeLimit
  );
  targetScore.value =
    gameConfig.baseTargetScore +
    (currentLevel.value - 1) * gameConfig.targetScoreIncrement;

  levelStatus.value = "进行中";

  // 初始化网格，确保有可能的匹配但没有初始匹配
  let attempts = 0;
  const maxAttempts = 10; // 防止无限循环

  do {
    initializeGrid();
    attempts++;
    // 如果尝试多次仍无法生成合适的网格，强制跳出循环
    if (attempts >= maxAttempts) {
      console.log("达到最大尝试次数，使用当前网格");
      break;
    }
  } while (hasInitialMatches() || !hasPossibleMatches());

  startTimer();

  ElMessage({
    message: `第 ${currentLevel.value} 关\n目标分数：${targetScore.value}\n时间限制：${remainingTime.value}秒`,
    type: "success",
    duration: 5000, // 延长显示时间到5秒
  });
};

// 修改 pauseGame 函数
const pauseGame = () => {
  isPaused.value = !isPaused.value;
  // 根据游戏状态控制背景音乐
  if (isPaused.value) {
    audioBg.pause();
    levelStatus.value = "已暂停";
  } else {
    audioBg.play();
    levelStatus.value = "进行中";
  }
};

// 修改 handleMatches 函数，增加连击奖励和特殊效果
const handleMatches = async (matches: Set<number>) => {
  // 播放消除音效
  playSound("match");

  const newGrid = [...gameGrid.value];

  // 标记匹配的位置
  matches.forEach((index) => {
    newGrid[index] = "";
  });

  // 更新网格，显示消除效果
  gameGrid.value = newGrid;
  await new Promise((resolve) => setTimeout(resolve, 200));

  // 处理下落效果
  let hasDropped = false;
  for (let col = 0; col < 8; col++) {
    let emptyRow = 7;
    for (let row = 7; row >= 0; row--) {
      const index = row * 8 + col;
      if (newGrid[index] !== "") {
        if (emptyRow !== row) {
          newGrid[emptyRow * 8 + col] = newGrid[index];
          newGrid[index] = "";
          hasDropped = true;
        }
        emptyRow--;
      }
    }
  }

  // 如果有方块下落，更新网格并等待动画完成
  if (hasDropped) {
    gameGrid.value = [...newGrid];
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  // 填充新的生肖，使用优化后的填充函数
  fillEmptySpacesWithoutMatches(newGrid);

  // 更新网格
  gameGrid.value = [...newGrid];

  // 检查新的网格是否有可能的匹配
  if (!hasPossibleMatches()) {
    // 如果没有可能的匹配，显示提示并重新排列棋盘
    ElMessage({
      message: "没有可消除的组合，重新排列棋盘...",
      type: "info",
      duration: 3000,
    });

    // 添加一个短暂的延迟，让玩家看到提示
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 重新初始化网格直到有可消除的组合
    do {
      initializeGrid();
    } while (!hasPossibleMatches());

    return;
  }

  // 不再自动检查新的匹配，让玩家自己寻找和消除
  // 这样可以避免连锁反应
};

// 添加一个新的填充函数，确保新生成的方块不会形成匹配
const fillEmptySpacesWithoutMatches = (grid) => {
  const zodiacTypesCount = gameConfig.zodiacTypesPerLevel(currentLevel.value);

  const zodiacTypes = [
    "rat",
    "ox",
    "tiger",
    "rabbit",
    "dragon",
    "snake",
    "horse",
    "goat",
    "monkey",
    "rooster",
    "dog",
    "pig",
  ].slice(0, zodiacTypesCount);

  // 从底部向上填充空白位置
  for (let col = 0; col < 8; col++) {
    for (let row = 7; row >= 0; row--) {
      const index = row * 8 + col;

      if (grid[index] === "") {
        // 获取周围已有的生肖类型
        const surroundingTypes = getSurroundingTypes(grid, index);

        // 尝试找到一个不会立即形成匹配的生肖类型
        let selectedType = "";
        let attempts = 0;
        const maxAttempts = 15; // 增加尝试次数

        while (attempts < maxAttempts) {
          // 随机选择一个生肖类型
          const randomType =
            zodiacTypes[Math.floor(Math.random() * zodiacTypes.length)];

          // 临时放置并检查是否会形成匹配
          grid[index] = randomType;

          // 更严格的检查：确保不会形成任何匹配
          if (!isPartOfMatch(grid, index)) {
            selectedType = randomType;
            break;
          }

          attempts++;
        }

        // 如果找不到不形成匹配的类型，就使用随机类型
        if (selectedType === "") {
          // 尝试避开周围已有的类型
          const availableTypes = zodiacTypes.filter(
            (type) => !surroundingTypes.includes(type)
          );

          if (availableTypes.length > 0) {
            selectedType =
              availableTypes[Math.floor(Math.random() * availableTypes.length)];
          } else {
            selectedType =
              zodiacTypes[Math.floor(Math.random() * zodiacTypes.length)];
          }
        }

        grid[index] = selectedType;
      }
    }
  }

  return grid;
};

// 修改选择方块逻辑
const selectTile = async (index: number) => {
  if (!isPlaying.value || isPaused.value || remainingTime.value <= 0) return;

  if (selectedTile.value === null) {
    selectedTile.value = index;
  } else if (selectedTile.value === index) {
    selectedTile.value = null;
  } else {
    if (isAdjacent(selectedTile.value, index)) {
      const firstIndex = selectedTile.value;
      selectedTile.value = null;
      await swapTiles(firstIndex, index);
    } else {
      selectedTile.value = index;
    }
  }
};

// 检查是否相邻
const isAdjacent = (index1: number, index2: number) => {
  const row1 = Math.floor(index1 / 8);
  const col1 = index1 % 8;
  const row2 = Math.floor(index2 / 8);
  const col2 = index2 % 8;

  return (
    (Math.abs(row1 - row2) === 1 && col1 === col2) ||
    (Math.abs(col1 - col2) === 1 && row1 === row2)
  );
};

// 修改交换方块函数
const swapTiles = async (index1: number, index2: number) => {
  if (!isPlaying.value || isPaused.value || remainingTime.value <= 0)
    return false;

  const newGrid = [...gameGrid.value];
  const temp = newGrid[index1];
  newGrid[index1] = newGrid[index2];
  newGrid[index2] = temp;

  gameGrid.value = newGrid;
  const hasMatch = await checkMatches();

  if (!hasMatch) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    gameGrid.value[index2] = gameGrid.value[index1];
    gameGrid.value[index1] = temp;
    ElMessage({
      message: "无效的移动！",
      type: "warning",
      duration: 2000, // 延长显示时间到2秒
    });
    combo.value = 0;

    // 在无效移动后检查是否还有可能的匹配
    if (!hasPossibleMatches()) {
      ElMessage({
        message: "没有可消除的组合，重新排列棋盘...",
        type: "info",
        duration: 3000, // 延长显示时间到3秒
      });

      // 添加一个短暂的延迟，让玩家看到提示
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 延长延迟到1秒

      // 重新初始化网格直到有可消除的组合
      do {
        initializeGrid();
      } while (!hasPossibleMatches());
    }

    return false;
  }

  return true;
};

// 修改分数计算逻辑
const calculateScore = (matchCount: number, currentCombo: number) => {
  const baseScore = matchCount * 10; // 每个方块10分
  const comboMultiplier =
    1 +
    Math.min(currentCombo - 1, gameConfig.maxComboMultiplier) *
      gameConfig.comboBonus(currentLevel.value);
  return Math.floor(baseScore * comboMultiplier);
};

// 修改计时器函数
const startTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = 0;
  }

  timer = window.setInterval(() => {
    if (!isPaused.value && remainingTime.value > 0 && isPlaying.value) {
      remainingTime.value--;
      if (remainingTime.value <= 10 && !timeWarning.value) {
        timeWarning.value = true;
        ElMessage({
          message: "时间快用完了！",
          type: "warning",
          duration: 3000, // 延长显示时间到3秒
        });
      }
    }
    if (remainingTime.value <= 0) {
      clearInterval(timer);
      timer = 0;
      handleGameOver();
    }
  }, 1000);
};

// 修改游戏结束处理
const handleGameOver = () => {
  // 如果游戏已经结束（比如已经胜利），就不要再处理失败
  if (!isPlaying.value) return;

  if (timer) {
    clearInterval(timer);
    timer = 0;
  }

  isPlaying.value = false;
  isPaused.value = false;
  levelStatus.value = "已结束";

  // 播放失败音效
  audioFailure.play();
  showResult.value = true;
  gameResult.value = {
    success: false,
    message: `时间到！获得 ${score.value} 分，目标分数：${targetScore.value}`,
  };

  // 游戏结束时降低背景音乐音量而不是暂停
  audioBg.volume = 0.3;
};

// 修复进入下一关的逻辑
const goToNextLevel = () => {
  // 增加关卡数
  currentLevel.value++;

  // 计算新关卡的目标分数
  targetScore.value =
    gameConfig.baseTargetScore +
    (currentLevel.value - 1) * gameConfig.targetScoreIncrement;

  // 计算新关卡的时间限制
  remainingTime.value = Math.max(
    gameConfig.baseTimeLimit -
      (currentLevel.value - 1) * gameConfig.timeLimitDecrement,
    gameConfig.minTimeLimit
  );

  // 增加奖励时间
  remainingTime.value += gameConfig.bonusTimePerLevel;

  // 重置游戏状态
  score.value = 0;
  combo.value = 0;
  maxCombo.value = 0;
  timeWarning.value = false;
  showResult.value = false;

  // 更新提示次数
  hintCount.value = gameConfig.hintsPerLevel(currentLevel.value);

  // 重置其他状态
  showingHint.value = false;
  hintTiles.value = [];
  selectedTile.value = null;

  // 初始化新的游戏网格
  initializeGrid();

  // 设置游戏状态为进行中
  levelStatus.value = "进行中";
  isPlaying.value = true;

  // 开始计时器
  startTimer();

  // 显示新关卡信息
  ElMessage({
    message: `第 ${currentLevel.value} 关开始！\n目标分数：${
      targetScore.value
    }\n时间限制：${formatTime(remainingTime.value)}`,
    type: "success",
    duration: 5000,
  });
};

// 修改结果对话框的确认按钮处理函数
const handleResultConfirm = () => {
  if (gameResult.value.success) {
    // 如果成功，进入下一关
    goToNextLevel();
  } else {
    // 如果失败，重新开始游戏
    initializeGame();
  }

  // 隐藏结果对话框
  showResult.value = false;
};

// 添加banner背景图片
const bannerBg = new URL("../assets/images/banners/youxi.jpg", import.meta.url)
  .href;

// 优化 findPossibleMatches 函数
const findPossibleMatches = () => {
  const possibleMatches = [];
  const grid = [...gameGrid.value];

  // 检查水平方向的可能匹配
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      const index = row * 8 + col;
      const currentType = grid[index];

      if (currentType === "") continue;

      // 检查右侧两个位置
      if (
        col < 6 &&
        grid[index + 1] === currentType &&
        grid[index + 2] === currentType
      ) {
        possibleMatches.push([index, index + 1, index + 2]);
      }
    }
  }

  // 检查垂直方向的可能匹配
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      const index = row * 8 + col;
      const currentType = grid[index];

      if (currentType === "") continue;

      // 检查下方两个位置
      if (
        row < 6 &&
        grid[index + 8] === currentType &&
        grid[index + 16] === currentType
      ) {
        possibleMatches.push([index, index + 8, index + 16]);
      }
    }
  }

  // 检查潜在的匹配（需要交换的）
  const potentialMatches = findPotentialMatches();

  // 将潜在匹配添加到可能匹配列表中
  possibleMatches.push(...potentialMatches);

  return possibleMatches;
};

// 查找潜在的匹配（需要交换的）- 确保返回格式一致
const findPotentialMatches = () => {
  const potentialMatches = [];
  const grid = [...gameGrid.value];

  // 检查水平方向的潜在匹配
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 7; col++) {
      const index = row * 8 + col;
      const nextIndex = index + 1;

      if (grid[index] === "" || grid[nextIndex] === "") continue;

      // 保存原始值
      const originalValue1 = grid[index];
      const originalValue2 = grid[nextIndex];

      // 临时交换两个相邻的方块
      grid[index] = originalValue2;
      grid[nextIndex] = originalValue1;

      // 检查是否形成匹配
      let foundMatch = false;

      // 水平检查 - 左侧方块
      if (
        col > 1 &&
        grid[index] === grid[index - 1] &&
        grid[index] === grid[index - 2]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 水平检查 - 右侧方块
      if (
        !foundMatch &&
        col < 5 &&
        grid[nextIndex] === grid[nextIndex + 1] &&
        grid[nextIndex] === grid[nextIndex + 2]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 垂直检查 - 左侧方块
      if (
        !foundMatch &&
        row > 1 &&
        grid[index] === grid[index - 8] &&
        grid[index] === grid[index - 16]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 垂直检查 - 右侧方块
      if (
        !foundMatch &&
        row > 1 &&
        grid[nextIndex] === grid[nextIndex - 8] &&
        grid[nextIndex] === grid[nextIndex - 16]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 垂直检查 - 左侧方块向下
      if (
        !foundMatch &&
        row < 6 &&
        grid[index] === grid[index + 8] &&
        grid[index] === grid[index + 16]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 垂直检查 - 右侧方块向下
      if (
        !foundMatch &&
        row < 6 &&
        grid[nextIndex] === grid[nextIndex + 8] &&
        grid[nextIndex] === grid[nextIndex + 16]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 恢复原始状态 - 使用保存的原始值
      grid[index] = originalValue1;
      grid[nextIndex] = originalValue2;
    }
  }

  // 检查垂直方向的潜在匹配
  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 7; row++) {
      const index = row * 8 + col;
      const nextIndex = index + 8;

      if (grid[index] === "" || grid[nextIndex] === "") continue;

      // 保存原始值
      const originalValue1 = grid[index];
      const originalValue2 = grid[nextIndex];

      // 临时交换两个相邻的方块
      grid[index] = originalValue2;
      grid[nextIndex] = originalValue1;

      // 检查是否形成匹配
      let foundMatch = false;

      // 水平检查 - 上方方块
      if (
        col > 1 &&
        grid[index] === grid[index - 1] &&
        grid[index] === grid[index - 2]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 水平检查 - 上方方块向右
      if (
        !foundMatch &&
        col < 6 &&
        grid[index] === grid[index + 1] &&
        grid[index] === grid[index + 2]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 水平检查 - 下方方块
      if (
        !foundMatch &&
        col > 1 &&
        grid[nextIndex] === grid[nextIndex - 1] &&
        grid[nextIndex] === grid[nextIndex - 2]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 水平检查 - 下方方块向右
      if (
        !foundMatch &&
        col < 6 &&
        grid[nextIndex] === grid[nextIndex + 1] &&
        grid[nextIndex] === grid[nextIndex + 2]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 垂直检查 - 上方方块
      if (
        !foundMatch &&
        row > 1 &&
        grid[index] === grid[index - 8] &&
        grid[index] === grid[index - 16]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 垂直检查 - 下方方块
      if (
        !foundMatch &&
        row < 5 &&
        grid[nextIndex] === grid[nextIndex + 8] &&
        grid[nextIndex] === grid[nextIndex + 16]
      ) {
        potentialMatches.push([index, nextIndex]);
        foundMatch = true;
      }

      // 恢复原始状态 - 使用保存的原始值
      grid[index] = originalValue1;
      grid[nextIndex] = originalValue2;
    }
  }

  return potentialMatches;
};

// 修改 rearrangeGrid 函数
const rearrangeGrid = () => {
  // 重新初始化网格直到有可能的匹配
  do {
    initializeGrid();
  } while (!hasPossibleMatches());

  // 播放重排音效
  playSound("match");

  // 显示重排完成消息
  ElMessage({
    message: "棋盘已重新排列，请继续游戏",
    type: "success",
    duration: 3000, // 延长显示时间到3秒
  });
};

onMounted(() => {
  initializeGame();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = 0;
  }
  audioBg.pause();
});
</script>

<style scoped>
/* 添加新的动画效果 */
@keyframes blob {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

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

@keyframes pulse-hint {
  0% {
    box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
    border-color: rgba(74, 222, 128, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
    border-color: rgba(74, 222, 128, 1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
    border-color: rgba(74, 222, 128, 0.7);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

/* 添加新的样式 */
.tile-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tile-glow {
  position: absolute;
  inset: -2px;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.75rem;
  pointer-events: none;
}

.game-tile:hover .tile-glow {
  opacity: 1;
}

.progress-label {
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 6px;
  border-radius: 10px;
}

/* 游戏方块样式优化 */
.game-tile {
  aspect-ratio: 1;
  @apply bg-gray-800/60 rounded-xl cursor-pointer;
  border: 2px solid transparent;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.game-tile.selected {
  @apply border-yellow-500/80 bg-gray-700/80;
  box-shadow: 0 0 20px rgba(234, 179, 8, 0.3);
  animation: pulse 1.5s infinite;
  transform: translateZ(10px);
}

/* 提示方块样式 */
.game-tile.hint-tile {
  @apply border-green-500/80 bg-gray-700/80;
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
  animation: pulse-hint 1.5s infinite;
  transform: translateZ(10px);
}

.game-tile:hover {
  transform: translateZ(10px);
}

/* 进度条样式优化 */
:deep(.el-progress-bar__outer) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 9999px;
}

:deep(.el-progress-bar__inner) {
  background: linear-gradient(45deg, #f59e0b, #ef4444, #ec4899) !important;
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
  border-radius: 9999px;
}

/* 自定义进度条样式 */
:deep(.custom-progress .el-progress-bar__outer) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.custom-progress .el-progress-bar__inner) {
  background: linear-gradient(to right, #f59e0b, #ef4444) !important;
}

/* 动画效果 */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(234, 179, 8, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(234, 179, 8, 0);
  }
}

/* 弹窗样式 */
:deep(.game-dialog .el-dialog) {
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

:deep(.game-dialog .el-dialog__header) {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent; /* 确保头部背景透明 */
}

:deep(.game-dialog .el-dialog__title) {
  @apply text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500;
}

:deep(.game-dialog .el-dialog__body) {
  padding: 0;
  color: white;
  background: transparent; /* 确保内容区背景透明 */
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .game-tile {
    @apply p-1;
  }
}

/* 添加消除动画 */
@keyframes fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

.matched {
  animation: fade-out 0.3s ease-out forwards;
}

/* 修改游戏方块样式 */
.game-tile {
  aspect-ratio: 1;
  @apply bg-gray-800/60 rounded-xl cursor-pointer;
  border: 2px solid transparent;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.game-tile:not(.cursor-not-allowed):hover {
  transform: translateZ(10px);
}

/* 未开始状态的游戏方块样式 */
.game-tile.cursor-not-allowed {
  @apply bg-gray-800/40;
  transform: none;
}

.game-tile.cursor-not-allowed .tile-glow {
  display: none;
}

@keyframes spin-slow {
  to {
    transform: rotate(-360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

/* 添加渐变文字效果 */
.text-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500;
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
}

/* 添加动画效果 */
@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* 修改按钮样式 */
:deep(.game-dialog .el-button--primary) {
  background: linear-gradient(to right, #3b82f6, #6366f1);
  border: none;
  &:hover {
    background: linear-gradient(to right, #2563eb, #4f46e5);
  }
}

/* 添加渐变背景动画 */
:deep(.game-dialog) {
  .el-dialog {
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        rgba(31, 41, 55, 0.95),
        rgba(17, 24, 39, 0.95)
      );
      z-index: -1;
    }
  }
}

/* 确保弹窗内所有元素的背景都是透明的 */
:deep(.game-dialog) {
  .el-dialog__header,
  .el-dialog__body,
  .el-dialog__footer {
    background: transparent !important;
  }
}
</style>
