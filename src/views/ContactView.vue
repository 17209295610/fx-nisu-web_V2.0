<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- 顶部横条 -->
    <div class="relative h-[400px] bg-primary overflow-hidden">
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
        <div class="max-w-3xl">
          <h1 class="text-5xl font-bold text-white mb-4">关于我们</h1>
          <p class="text-xl text-white/90">传承文化 • 创新发展 • 科技赋能</p>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- 团队介绍 -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">团队介绍</h2>
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="max-w-3xl mx-auto space-y-6">
            <div class="flex items-center justify-center mb-8 text-primary">
              <el-icon class="text-6xl"><Avatar /></el-icon>
            </div>
            <p class="text-gray-600 leading-relaxed">
              "非泥莫属"团队来自咸阳职业技术学院信息工程学院，致力于将传统文化与现代技术相结合。
              我们运用新媒体技术和互联网平台，让凤翔泥塑这一非物质文化遗产焕发新的生机。
            </p>
            <!-- 团队成员展示优化 -->
            <div class="mt-12">
              <h3 class="text-2xl font-bold text-primary mb-8 text-center">
                团队成员
              </h3>
              <div
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                <div
                  v-for="member in teamMembers"
                  :key="member.name"
                  class="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div class="flex flex-col items-center text-center">
                    <div
                      class="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-md"
                    >
                      <span class="text-3xl">
                        {{ getMemberIcon(member.role) }}
                      </span>
                    </div>
                    <h4 class="font-semibold text-gray-800 mb-1">
                      {{ member.name }}
                    </h4>
                    <p class="text-sm text-gray-600 mb-1">{{ member.class }}</p>
                    <div class="bg-primary/10 px-2 py-1 rounded-full">
                      <p class="text-xs text-primary font-medium">
                        {{ member.role }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 项目说明 -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">项目说明</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div
              class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
            >
              <el-icon class="text-2xl text-primary">
                <component :is="feature.icon" />
              </el-icon>
            </div>
            <h3 class="text-xl font-bold mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div>
        <h2 class="text-3xl font-bold text-center mb-12">联系我们</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div
            v-for="contact in contacts"
            :key="contact.title"
            class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
          >
            <el-icon class="text-3xl text-primary mb-4">
              <component :is="contact.icon" />
            </el-icon>
            <h3 class="font-bold mb-2">{{ contact.title }}</h3>
            <p class="text-gray-600">{{ contact.content }}</p>
          </div>
        </div>
      </div>

      <!-- 社交媒体账号 -->
      <div class="mt-16">
        <h2 class="text-3xl font-bold text-center mb-12">关注我们</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <!-- 微信公众号 -->
          <div
            class="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-shadow"
          >
            <div class="flex items-center justify-center mb-4">
              <span class="text-4xl text-[#07C160]">📱</span>
            </div>
            <h3 class="text-xl font-bold mb-2">微信公众号</h3>
            <p class="text-gray-600">关注"非泥莫属"公众号</p>
            <p class="text-primary font-medium mt-2">二维码待更新</p>
          </div>

          <!-- 小红书账号 -->
          <div
            class="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-shadow"
          >
            <div class="flex items-center justify-center mb-4">
              <span class="text-4xl text-[#FE2C55]">📕</span>
            </div>
            <h3 class="text-xl font-bold mb-2">小红书号</h3>
            <p class="text-gray-600">关注"非泥莫属"小红书</p>
            <p class="text-primary font-medium mt-2">二维码待更新</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Location,
  Phone,
  Message,
  Monitor,
  Collection,
  Connection,
  Avatar,
} from "@element-plus/icons-vue";

// 项目特点
const features = [
  {
    icon: Monitor,
    title: "数字化展示",
    description: "运用现代技术手段，全方位展示凤翔泥塑的艺术魅力和文化内涵。",
  },
  {
    icon: Collection,
    title: "文化传承",
    description: "深入挖掘非遗文化价值，让传统工艺在新时代焕发生机。",
  },
  {
    icon: Connection,
    title: "创新互动",
    description: "通过趣味游戏和科普动画，让文化传承更加生动有趣。",
  },
];

// 联系方式
const contacts = [
  {
    icon: Location,
    title: "地址",
    content: "陕西省咸阳市咸阳职业技术学院信息工程学院",
  },
  {
    icon: Phone,
    title: "电话",
    content: "17209295610",
  },
  {
    icon: Message,
    title: "邮箱",
    content: "投稿：2798156978@qq.com",
  },
];

// 团队成员数据
const teamMembers = [
  { name: "程文卓", class: "信息安全技术应用2301班", role: "网站开发" },
  { name: "岳玉彤", class: "数字媒体艺术设计2407班", role: "UI设计" },
  { name: "杜悦萌", class: "信息安全技术应用2301班", role: "PPT制作" },
  { name: "高嘉琪", class: "信息安全技术应用2302班", role: "项目负责人" },
  { name: "段婧雯", class: "信息安全技术应用2302班", role: "调研报告撰写" },
  { name: "呼思彤", class: "信息安全技术应用2301班", role: "游戏开发" },
  { name: "芦梦", class: "数字媒体艺术设计2407班", role: "UI设计" },
  { name: "冯佳乐", class: "信息安全技术应用2302班", role: "APP运营" },
  { name: "童毓馨", class: "电子信息工程技术2301班", role: "调研报告撰写" },
  { name: "刘旭东", class: "软件工程技术2301班", role: "资料支持" },
  { name: "樊嘉瑞", class: "软件工程技术2302班", role: "调研报告撰写" },
  { name: "王玉", class: "数字媒体艺术设计2102班", role: "UI设计" },
  { name: "朱航", class: "凤翔泥塑传承人", role: "文化顾问" },
];

// 添加banner背景图片
const bannerBg = new URL("../assets/images/banners/guanyu.jpg", import.meta.url)
  .href;

// 添加获取成员图标的函数
const getMemberIcon = (role: string) => {
  if (role === "开发") return "💻";
  if (role === "UI设计") return "🎨";
  if (role === "PPT制作") return "📊";
  if (role === "项目负责人") return "👑";
  if (role === "调研报告撰写") return "📝";
  if (role === "APP运营") return "📱";
  if (role === "资料支持") return "📚";
  if (role === "文化顾问") return "🏺";
  return "🏆";
};
</script>
