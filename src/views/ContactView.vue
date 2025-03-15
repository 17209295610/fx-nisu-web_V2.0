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
        <h2 class="text-3xl font-bold text-center mb-12 relative">
          团队介绍
          <span
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full mt-2"
          ></span>
        </h2>

        <div
          class="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
        >
          <!-- 装饰元素 -->
          <div
            class="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 rounded-full -ml-20 -mb-20"
          ></div>

          <div class="max-w-4xl mx-auto space-y-6 relative">
            <!-- 团队标志和名称 -->
            <div class="flex flex-col items-center justify-center mb-10">
              <div
                class="w-24 h-24 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center mb-4 shadow-lg"
              >
                <el-icon class="text-6xl text-primary"><Avatar /></el-icon>
              </div>
              <h3 class="text-2xl font-bold text-primary">非泥莫属团队</h3>
              <div
                class="h-1 w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2"
              ></div>
            </div>

            <!-- 团队介绍内容 - 使用卡片式布局 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div
                class="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="flex items-center mb-4">
                  <div
                    class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3"
                  >
                    <el-icon class="text-xl text-primary"><Monitor /></el-icon>
                  </div>
                  <h4 class="text-lg font-semibold">团队背景</h4>
                </div>
                <p class="text-gray-600 leading-relaxed">
                  "非泥莫属"团队来自咸阳职业技术学院信息工程学院，是一支充满创新精神和文化使命感的青年团队。我们致力于将传统文化与现代科技深度融合，通过数字化手段赋能非遗传承。
                </p>
              </div>

              <div
                class="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="flex items-center mb-4">
                  <div
                    class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3"
                  >
                    <el-icon class="text-xl text-primary"><User /></el-icon>
                  </div>
                  <h4 class="text-lg font-semibold">团队构成</h4>
                </div>
                <p class="text-gray-600 leading-relaxed">
                  团队成员涵盖信息安全技术、数字媒体艺术设计、软件工程技术等多个专业领域，形成了技术与艺术相结合的跨学科合作模式。我们运用Web开发、交互设计，结合互联网传播平台，为凤翔泥塑这一国家级非物质文化遗产搭建了数字化展示与传播平台。
                </p>
              </div>

              <div
                class="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="flex items-center mb-4">
                  <div
                    class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3"
                  >
                    <el-icon class="text-xl text-primary"
                      ><Collection
                    /></el-icon>
                  </div>
                  <h4 class="text-lg font-semibold">团队理念</h4>
                </div>
                <p class="text-gray-600 leading-relaxed">
                  在传承与创新的道路上，我们秉持"科技赋能传统，创意激活非遗"的理念，通过沉浸式体验、互动游戏和文创产品设计，让古老的泥塑艺术焕发新的生机与活力，使更多年轻人了解、喜爱并参与到非遗文化的保护与传承中来。
                </p>
              </div>
            </div>

            <!-- 团队口号 -->
            <div
              class="text-center py-6 px-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl"
            >
              <p class="text-lg text-gray-700 italic">
                "让传统文化在数字时代焕发新生，让年轻一代与非遗艺术共同成长"
              </p>
            </div>

            <!-- 团队成员展示优化 -->
            <div class="mt-16">
              <h3
                class="text-2xl font-bold text-primary mb-8 text-center relative"
              >
                团队成员
                <span
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary/50 rounded-full mt-2"
                ></span>
              </h3>

              <!-- 添加团队成员分类标签 -->
              <div class="flex flex-wrap justify-center gap-3 mb-8">
                <button
                  v-for="role in [
                    '全部',
                    '技术开发',
                    '设计创意',
                    '内容运营',
                    '项目管理',
                  ]"
                  :key="role"
                  class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  :class="[
                    memberFilter === role
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  ]"
                  @click="memberFilter = role"
                >
                  {{ role }}
                </button>
              </div>

              <!-- 成员卡片网格 -->
              <div class="relative">
                <!-- 装饰元素 -->
                <div
                  class="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full opacity-70 -z-10"
                ></div>
                <div
                  class="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full opacity-70 -z-10"
                ></div>

                <TransitionGroup
                  name="member-list"
                  tag="div"
                  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  <div
                    v-for="(member, index) in filteredMembers"
                    :key="member.name"
                    class="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-primary/5 animate-fadeIn"
                    :style="{ 'animation-delay': `${index * 0.05}s` }"
                  >
                    <div class="flex flex-col items-center text-center">
                      <!-- 成员头像/图标 -->
                      <div class="relative mb-4">
                        <div
                          class="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md"
                        >
                          <span class="text-4xl">{{
                            getMemberIcon(member.role)
                          }}</span>
                        </div>
                        <!-- 角色标识 -->
                        <div
                          class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white"
                        >
                          <span class="text-xs">{{
                            getRoleEmoji(member.role)
                          }}</span>
                        </div>
                      </div>

                      <!-- 成员信息 -->
                      <h4
                        class="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors"
                      >
                        {{ member.name }}
                      </h4>
                      <p class="text-xs text-gray-500 mb-2">
                        {{ member.class }}
                      </p>
                      <div
                        class="bg-primary/10 px-3 py-1 rounded-full group-hover:bg-primary/20 transition-colors"
                      >
                        <p class="text-xs text-primary font-medium">
                          {{ member.role }}
                        </p>
                      </div>
                    </div>
                  </div>
                </TransitionGroup>
              </div>

              <!-- 添加团队统计信息 -->
              <div class="flex justify-center gap-8 mt-12 text-center">
                <div
                  class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md w-32"
                >
                  <p class="text-3xl font-bold text-primary">
                    {{ teamMembers.length }}
                  </p>
                  <p class="text-sm text-gray-600">团队成员</p>
                </div>
                <div
                  class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md w-32"
                >
                  <p class="text-3xl font-bold text-primary">
                    {{ getRoleCount() }}
                  </p>
                  <p class="text-sm text-gray-600">专业角色</p>
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
  User,
} from "@element-plus/icons-vue";
import { ref, computed } from "@vue/runtime-dom";

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

// 添加成员筛选功能
const memberFilter = ref("全部");

// 根据筛选条件过滤成员
const filteredMembers = computed(() => {
  if (memberFilter.value === "全部") {
    return teamMembers;
  } else if (memberFilter.value === "技术开发") {
    return teamMembers.filter(
      (m) =>
        m.role === "网站开发" ||
        m.role === "游戏开发" ||
        m.role.includes("开发")
    );
  } else if (memberFilter.value === "设计创意") {
    return teamMembers.filter(
      (m) => m.role === "UI设计" || m.role.includes("设计")
    );
  } else if (memberFilter.value === "内容运营") {
    return teamMembers.filter(
      (m) =>
        m.role === "APP运营" ||
        m.role === "资料支持" ||
        m.role === "调研报告撰写" ||
        m.role === "PPT制作"
    );
  } else if (memberFilter.value === "项目管理") {
    return teamMembers.filter(
      (m) => m.role === "项目负责人" || m.role === "文化顾问"
    );
  }
  return teamMembers;
});

// 获取角色数量
const getRoleCount = () => {
  const roles = new Set(teamMembers.map((m) => m.role));
  return roles.size;
};

// 获取角色对应的表情
const getRoleEmoji = (role: string) => {
  if (role.includes("开发")) return "💻";
  if (role.includes("设计")) return "🎨";
  if (role === "PPT制作") return "📊";
  if (role === "项目负责人") return "👑";
  if (role.includes("报告")) return "📝";
  if (role.includes("运营")) return "📱";
  if (role.includes("资料")) return "📚";
  if (role.includes("顾问")) return "🏺";
  return "🏆";
};
</script>

<style scoped>
/* 添加团队成员卡片动画 */
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

/* 添加联系方式卡片悬停效果 */
.contact-card {
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.contact-card:hover .contact-icon {
  transform: scale(1.2);
  color: var(--el-color-primary);
}

.contact-icon {
  transition: all 0.3s ease;
}

/* 添加成员列表过渡动画 */
.member-list-move,
.member-list-enter-active,
.member-list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.member-list-enter-from,
.member-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.member-list-leave-active {
  position: absolute;
}
</style>
