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
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner">
          <el-icon class="animate-spin text-4xl text-primary"
            ><Loading
          /></el-icon>
          <p class="mt-4 text-primary font-medium">游戏加载中...</p>
        </div>
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
                          (remainingTime / gameConfig.baseTime) * 100
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
                  <h3 class="text-xl font-bold mb-4 flex items-center">
                    <el-icon class="mr-2"><i-ep-info-filled /></el-icon>
                    游戏说明
                  </h3>
                  <div class="space-y-3 text-gray-300">
                    <p class="flex items-center">
                      <el-icon class="mr-2"><i-ep-circle-check /></el-icon>
                      点击两个相邻的生肖图案进行交换
                    </p>
                    <p class="flex items-center">
                      <el-icon class="mr-2"><i-ep-circle-check /></el-icon>
                      连接三个或以上相同生肖可以消除
                    </p>
                    <p class="flex items-center">
                      <el-icon class="mr-2"><i-ep-circle-check /></el-icon>
                      达到目标分数即可通关
                    </p>
                    <p class="flex items-center">
                      <el-icon class="mr-2"><i-ep-circle-check /></el-icon>
                      注意剩余时间，时间用完游戏结束
                    </p>
                  </div>
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
      width="400px"
      center
      class="game-dialog"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="text-center space-y-4">
        <el-result
          :icon="gameResult.success ? 'success' : 'error'"
          :title="gameResult.success ? '恭喜过关！' : '再接再厉！'"
          :sub-title="gameResult.message"
        >
          <template #extra>
            <el-button type="primary" size="large" @click="continueGame">
              {{ gameResult.success ? "下一关" : "重新开始" }}
            </el-button>
          </template>
        </el-result>
      </div>
    </el-dialog>
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

// 修改游戏配置
const gameConfig = {
  baseScore: 150, // 第一关目标分数（较容易达到）
  baseTime: 120, // 第一关时间（充足的熟悉时间）
  minTime: 60, // 最短时间限制（保证基本游戏体验）
  timeDecrement: 10, // 每关减少时间（更明显的时间压力）
  scoreIncrement: 80, // 每关增加分数（平缓的分数增长）
  maxComboMultiplier: 4, // 提高最大连击倍数（鼓励连击）
  hintCooldown: 10, // 提示冷却时间（秒）
  bonusTimePerLevel: 5, // 每关额外奖励时间
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

// 修改 initializeGame 函数
const initializeGame = () => {
  // 设置加载状态
  isLoading.value = true;

  // 停止背景音乐
  audioBg.pause();
  audioBg.currentTime = 0;

  currentLevel.value = 1;
  targetScore.value = gameConfig.baseScore;
  score.value = 0;
  combo.value = 0;
  maxCombo.value = 0;
  remainingTime.value = gameConfig.baseTime;
  timeWarning.value = false;
  selectedTile.value = null;
  showResult.value = false;
  isPaused.value = false;
  isPlaying.value = false;
  levelStatus.value = "未开始";
  hintCount.value = 3;
  showingHint.value = false;
  hintTiles.value = [];

  // 初始化一个默认的游戏网格
  initializeGrid();

  // 模拟加载延迟
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
};

// 添加一个新函数来检查初始棋盘是否有匹配
const hasInitialMatches = () => {
  // 检查水平匹配
  for (let row = 0; row < 8; row++) {
    let count = 1;
    let currentType = gameGrid.value[row * 8];

    for (let col = 1; col < 8; col++) {
      const type = gameGrid.value[row * 8 + col];
      if (type === currentType) {
        count++;
        if (count >= 3) return true;
      } else {
        count = 1;
        currentType = type;
      }
    }
  }

  // 检查垂直匹配
  for (let col = 0; col < 8; col++) {
    let count = 1;
    let currentType = gameGrid.value[col];

    for (let row = 1; row < 8; row++) {
      const type = gameGrid.value[row * 8 + col];
      if (type === currentType) {
        count++;
        if (count >= 3) return true;
      } else {
        count = 1;
        currentType = type;
      }
    }
  }

  return false;
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
  hintCount.value = 3; // 重置提示次数
  showingHint.value = false;
  hintTiles.value = [];

  // 计算关卡时间和目标分数
  remainingTime.value = Math.max(
    gameConfig.baseTime - (currentLevel.value - 1) * gameConfig.timeDecrement,
    gameConfig.minTime
  );
  targetScore.value =
    gameConfig.baseScore + (currentLevel.value - 1) * gameConfig.scoreIncrement;

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

// 添加提示功能
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

    // 显示提示
    hintTiles.value = randomMatch;
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
      message: "已显示可能的匹配，5秒后消失",
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

// 查找可能的匹配
const findPossibleMatches = () => {
  const possibleMatches = [];
  const grid = gameGrid.value;

  // 检查水平方向的可能匹配
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      const index = row * 8 + col;
      const currentType = grid[index];

      if (currentType === "") continue; // 跳过空格

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

      if (currentType === "") continue; // 跳过空格

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
  if (potentialMatches.length > 0) {
    // 将潜在匹配添加到可能匹配列表中
    possibleMatches.push(...potentialMatches);
  }

  return possibleMatches;
};

// 查找潜在的匹配（需要交换的）
const findPotentialMatches = () => {
  const potentialMatches = [];
  const grid = gameGrid.value;

  // 检查水平方向的潜在匹配
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 7; col++) {
      const index = row * 8 + col;
      const nextIndex = index + 1;

      if (grid[index] === "" || grid[nextIndex] === "") continue; // 跳过空格

      // 临时交换两个相邻的方块
      const temp = grid[index];
      grid[index] = grid[nextIndex];
      grid[nextIndex] = temp;

      // 模拟交换后检查是否形成匹配
      // 水平检查
      if (col > 0 && col < 6) {
        if (
          grid[nextIndex] === grid[index - 1] &&
          grid[nextIndex] === grid[index + 2]
        ) {
          potentialMatches.push([index, nextIndex, index - 1, index + 2]);
        }
      }

      // 垂直检查 - 左侧方块
      if (row > 0 && row < 7) {
        if (
          grid[nextIndex] === grid[index - 8] &&
          grid[nextIndex] === grid[index + 8]
        ) {
          potentialMatches.push([index, nextIndex, index - 8, index + 8]);
        }
      }

      // 垂直检查 - 右侧方块
      if (row > 0 && row < 7) {
        if (
          grid[index] === grid[nextIndex - 8] &&
          grid[index] === grid[nextIndex + 8]
        ) {
          potentialMatches.push([
            index,
            nextIndex,
            nextIndex - 8,
            nextIndex + 8,
          ]);
        }
      }

      // 恢复原始状态
      grid[index] = temp;
    }
  }

  // 检查垂直方向的潜在匹配
  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 7; row++) {
      const index = row * 8 + col;
      const nextIndex = index + 8;

      if (grid[index] === "" || grid[nextIndex] === "") continue; // 跳过空格

      // 临时交换两个相邻的方块
      const temp = grid[index];
      grid[index] = grid[nextIndex];
      grid[nextIndex] = temp;

      // 模拟交换后检查是否形成匹配
      // 垂直检查
      if (row > 0 && row < 6) {
        if (
          grid[nextIndex] === grid[index - 8] &&
          grid[nextIndex] === grid[index + 16]
        ) {
          potentialMatches.push([index, nextIndex, index - 8, index + 16]);
        }
      }

      // 水平检查 - 上方方块
      if (col > 0 && col < 7) {
        if (
          grid[nextIndex] === grid[index - 1] &&
          grid[nextIndex] === grid[index + 1]
        ) {
          potentialMatches.push([index, nextIndex, index - 1, index + 1]);
        }
      }

      // 水平检查 - 下方方块
      if (col > 0 && col < 7) {
        if (
          grid[index] === grid[nextIndex - 1] &&
          grid[index] === grid[nextIndex + 1]
        ) {
          potentialMatches.push([
            index,
            nextIndex,
            nextIndex - 1,
            nextIndex + 1,
          ]);
        }
      }

      // 恢复原始状态
      grid[index] = temp;
    }
  }

  return potentialMatches;
};

// 修改 checkMatches 函数，增加连击奖励和特殊效果
const checkMatches = async () => {
  const matches = new Set<number>();
  let hasMatches = false;

  // 检查水平匹配（三个或更多相同）
  for (let row = 0; row < 8; row++) {
    let count = 1;
    let currentType = "";
    let matchStart = 0;

    for (let col = 0; col <= 8; col++) {
      const index = row * 8 + col;
      const type = col < 8 ? gameGrid.value[index] : "";

      if (type === currentType && type !== "") {
        count++;
      } else {
        // 如果找到三个或更多相同的
        if (count >= 3) {
          for (let i = 0; i < count; i++) {
            matches.add(matchStart + i);
          }
          hasMatches = true;
        }
        count = 1;
        currentType = type;
        matchStart = index;
      }
    }
  }

  // 检查垂直匹配（三个或更多相同）
  for (let col = 0; col < 8; col++) {
    let count = 1;
    let currentType = "";
    let matchStart = 0;

    for (let row = 0; row <= 8; row++) {
      const index = row < 8 ? row * 8 + col : -1;
      const type = index >= 0 ? gameGrid.value[index] : "";

      if (type === currentType && type !== "") {
        count++;
      } else {
        // 如果找到三个或更多相同的
        if (count >= 3) {
          for (let i = 0; i < count; i++) {
            matches.add(matchStart + i * 8);
          }
          hasMatches = true;
        }
        count = 1;
        currentType = type;
        matchStart = index;
      }
    }
  }

  if (hasMatches) {
    combo.value++;
    maxCombo.value = Math.max(maxCombo.value, combo.value);

    // 计算分数，大连击和大消除有额外奖励
    const matchSize = matches.size;
    let totalScore = calculateScore(matchSize, combo.value);

    // 大消除奖励（5个以上）
    if (matchSize >= 5) {
      totalScore = Math.floor(totalScore * 1.5);
      // 大消除奖励时间
      remainingTime.value += Math.min(matchSize - 4, 5); // 最多奖励5秒
      ElMessage({
        message: `大消除！+${matchSize - 4}秒`,
        type: "success",
        duration: 3000, // 延长显示时间到3秒
      });
    }

    score.value += totalScore;

    // 显示连击和得分提示
    if (combo.value > 1) {
      ElMessage({
        message: `${combo.value}连击！+${totalScore}分`,
        type: "success",
        duration: 2000, // 延长显示时间到2秒
      });

      // 连击奖励（每3连击奖励1秒，最多5秒）
      if (combo.value % 3 === 0 && combo.value <= 15) {
        const bonusTime = Math.floor(combo.value / 3);
        remainingTime.value += bonusTime;
        ElMessage({
          message: `连击奖励！+${bonusTime}秒`,
          type: "success",
          duration: 2000, // 延长显示时间到2秒
        });
      }
    } else {
      ElMessage({
        message: `+${totalScore}分`,
        type: "success",
        duration: 1500, // 延长显示时间到1.5秒
      });
    }

    // 处理消除效果
    await handleMatches(matches);

    // 检查是否达到目标分数
    if (score.value >= targetScore.value) {
      // 播放胜利音效
      audioSuccess.play();

      // 停止计时器
      if (timer) {
        clearInterval(timer);
        timer = 0;
      }

      // 显示过关提示
      showResult.value = true;
      gameResult.value = {
        success: true,
        message: `恭喜获得 ${score.value} 分！最大连击：${maxCombo.value}`,
      };

      // 更新关卡
      currentLevel.value++;
      targetScore.value =
        gameConfig.baseScore +
        (currentLevel.value - 1) * gameConfig.scoreIncrement;

      // 不暂停背景音乐，只降低音量
      audioBg.volume = 0.3;

      // 设置游戏状态
      isPlaying.value = false;
      levelStatus.value = "已结束";

      return true;
    }

    return true;
  }

  // 只有在没有匹配时才重置连击
  combo.value = 0;
  return false;
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
  audioMatch.play();

  const newGrid = [...gameGrid.value];

  // 标记匹配的位置
  matches.forEach((index) => {
    newGrid[index] = "";
  });

  // 更新网格，显示消除效果
  gameGrid.value = newGrid;
  await new Promise((resolve) => setTimeout(resolve, 200));

  // 处理下落效果
  for (let col = 0; col < 8; col++) {
    let emptyRow = 7;
    for (let row = 7; row >= 0; row--) {
      const index = row * 8 + col;
      if (newGrid[index] !== "") {
        if (emptyRow !== row) {
          newGrid[emptyRow * 8 + col] = newGrid[index];
          newGrid[index] = "";
        }
        emptyRow--;
      }
    }

    // 填充新的生肖
    for (let row = emptyRow; row >= 0; row--) {
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
      ];
      newGrid[row * 8 + col] =
        zodiacTypes[Math.floor(Math.random() * zodiacTypes.length)];
    }
  }

  // 更新网格
  gameGrid.value = newGrid;

  // 检查新的网格是否有可能的匹配
  if (!hasPossibleMatches()) {
    // 如果没有可能的匹配，显示提示并重新排列棋盘
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

    return;
  }

  // 检查新的匹配
  await new Promise((resolve) => setTimeout(resolve, 300));
  await checkMatches();
};

// 修改 initializeGrid 函数，确保初始化时有可消除的组合
const initializeGrid = () => {
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
  ];

  // 生成新的网格
  gameGrid.value = Array(64)
    .fill("")
    .map(() => zodiacTypes[Math.floor(Math.random() * zodiacTypes.length)]);
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
    1 + Math.min(currentCombo - 1, gameConfig.maxComboMultiplier) * 0.5;
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

// 修改 continueGame 函数，优化音乐播放逻辑
const continueGame = () => {
  // 确保清除任何可能存在的计时器
  if (timer) {
    clearInterval(timer);
    timer = 0;
  }

  showResult.value = false;

  // 如果是成功过关，给予奖励
  if (gameResult.value.success) {
    // 每过一关增加一次提示机会
    hintCount.value = 3 + Math.min(currentLevel.value - 1, 2); // 最多5次提示

    // 每过一关奖励额外时间
    const bonusTime = gameConfig.bonusTimePerLevel * (currentLevel.value - 1);

    ElMessage({
      message: `进入第${currentLevel.value}关！奖励${bonusTime}秒额外时间和${hintCount.value}次提示机会`,
      type: "success",
      duration: 5000, // 延长显示时间到5秒
    });

    // 恢复背景音乐音量
    audioBg.volume = 1.0;

    // 不重新开始背景音乐，只确保它在播放
    if (audioBg.paused) {
      audioBg.play().catch((e) => console.error("无法播放背景音乐:", e));
    }
  } else {
    // 如果是失败，重置游戏状态
    initializeGame();
    // 重新开始背景音乐
    audioBg.currentTime = 0;
    audioBg.volume = 1.0;
    audioBg.play().catch((e) => console.error("无法播放背景音乐:", e));
  }

  setTimeout(() => {
    startGame(false); // 传递false参数表示不重新开始音乐
  }, 100);
};

// 添加banner背景图片
const bannerBg = new URL("../assets/images/banners/youxi.jpg", import.meta.url)
  .href;

// 优化 hasPossibleMatches 函数，使其更准确地检测可能的匹配
const hasPossibleMatches = () => {
  const grid = gameGrid.value;

  // 检查水平方向的潜在匹配
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      const current = grid[row * 8 + col];

      // 检查形如 "ABA" 的模式
      if (col < 5 && current === grid[row * 8 + col + 2] && current !== "") {
        // 检查上方是否有可交换的相同类型
        if (row > 0 && grid[(row - 1) * 8 + col + 1] === current) {
          return true;
        }
        // 检查下方是否有可交换的相同类型
        if (row < 7 && grid[(row + 1) * 8 + col + 1] === current) {
          return true;
        }
      }

      // 检查形如 "AAB" 的模式，交换后变成 "BAA"
      if (col < 6 && current === grid[row * 8 + col + 1] && current !== "") {
        // 检查右侧是否有可交换的相同类型
        if (col < 5 && grid[row * 8 + col + 2] === current) {
          return true;
        }
        // 检查上方右侧是否有可交换的相同类型
        if (row > 0 && grid[(row - 1) * 8 + col + 2] === current) {
          return true;
        }
        // 检查下方右侧是否有可交换的相同类型
        if (row < 7 && grid[(row + 1) * 8 + col + 2] === current) {
          return true;
        }
      }
    }
  }

  // 检查垂直方向的潜在匹配
  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 6; row++) {
      const current = grid[row * 8 + col];

      // 检查形如 "ABA" 的模式（垂直）
      if (row < 5 && current === grid[(row + 2) * 8 + col] && current !== "") {
        // 检查左侧是否有可交换的相同类型
        if (col > 0 && grid[(row + 1) * 8 + col - 1] === current) {
          return true;
        }
        // 检查右侧是否有可交换的相同类型
        if (col < 7 && grid[(row + 1) * 8 + col + 1] === current) {
          return true;
        }
      }

      // 检查形如 "AAB" 的模式（垂直），交换后变成 "BAA"
      if (row < 6 && current === grid[(row + 1) * 8 + col] && current !== "") {
        // 检查下方是否有可交换的相同类型
        if (row < 5 && grid[(row + 2) * 8 + col] === current) {
          return true;
        }
        // 检查左侧下方是否有可交换的相同类型
        if (col > 0 && grid[(row + 2) * 8 + col - 1] === current) {
          return true;
        }
        // 检查右侧下方是否有可交换的相同类型
        if (col < 7 && grid[(row + 2) * 8 + col + 1] === current) {
          return true;
        }
      }
    }
  }

  // 检查直接的三连匹配
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      // 检查水平三连
      if (
        grid[row * 8 + col] === grid[row * 8 + col + 1] &&
        grid[row * 8 + col] === grid[row * 8 + col + 2] &&
        grid[row * 8 + col] !== ""
      ) {
        return true;
      }
    }
  }

  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 6; row++) {
      // 检查垂直三连
      if (
        grid[row * 8 + col] === grid[(row + 1) * 8 + col] &&
        grid[row * 8 + col] === grid[(row + 2) * 8 + col] &&
        grid[row * 8 + col] !== ""
      ) {
        return true;
      }
    }
  }

  return false;
};

// 添加 playSound 函数
const playSound = (type: string) => {
  if (isMuted.value) return;

  // 创建音效对象
  const sounds: Record<string, HTMLAudioElement> = {
    match: audioMatch,
    success: audioSuccess,
    failure: audioFailure,
    hint: audioMatch, // 使用匹配音效作为提示音效
  };

  if (sounds[type]) {
    // 避免音频播放错误
    try {
      sounds[type].currentTime = 0;
      sounds[type].play().catch((e) => console.error("播放音效失败:", e));
    } catch (error) {
      console.error("播放音效时出错:", error);
    }
  }
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
  background: rgba(31, 41, 55, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

:deep(.game-dialog .el-dialog__header) {
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.game-dialog .el-dialog__body) {
  color: white;
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
</style>
