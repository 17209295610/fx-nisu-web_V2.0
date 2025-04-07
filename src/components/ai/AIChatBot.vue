<template>
  <div class="ai-chatbot-container">
    <!-- 悬浮图标按钮 - 左侧中间位置 -->
    <div
      v-if="!isChatOpen"
      class="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 ai-floating-btn"
    >
      <button
        @click="openChat"
        class="flex flex-col items-center px-3 py-4 rounded-r-xl shadow-lg transition-all duration-300 ai-btn"
        title="锦囊问答"
        aria-label="打开锦囊问答聊天窗口"
        tabindex="0"
      >
        <!-- 上部图标 -->
        <div class="relative mb-2">
          <div
            class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"
          ></div>
          <div
            class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner"
          >
            <el-icon class="text-3xl text-primary"><ChatRound /></el-icon>
          </div>
        </div>

        <!-- 文字部分 -->
        <span class="text-sm font-bold mb-1">锦囊问答</span>
        <div class="w-full h-px bg-white/30 my-1"></div>
        <span class="text-xs">文化智慧</span>
      </button>
    </div>

    <!-- 聊天窗口 - 重构为左侧弹出 -->
    <div
      v-if="isChatOpen"
      class="fixed left-6 top-1/2 transform -translate-y-1/2 w-96 md:w-[420px] h-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col border border-gray-200 chat-window"
      :class="{ 'animate-slide-in-left': isChatOpen }"
    >
      <!-- 聊天头部 - 调整样式与位置 -->
      <div class="chat-header relative p-4 flex justify-between items-center">
        <!-- 中国风纹理背景 -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"
        ></div>

        <!-- 标题内容 -->
        <div class="flex items-center gap-3 relative z-10">
          <div
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30"
          >
            <img
              src="@/assets/images/logo.png"
              alt="AI助手"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="text-white">
            <h3 class="font-bold text-lg">锦囊问答</h3>
            <div class="text-xs flex items-center">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              <span>随时为您解疑答惑</span>
            </div>
          </div>
        </div>

        <!-- 关闭按钮 -->
        <button
          @click="closeChat"
          class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          <el-icon class="text-xl text-white"><Close /></el-icon>
        </button>

        <!-- 添加到聊天头部区域 -->
        <div class="flex items-center ml-auto mr-2">
          <button
            @click="clearConversation"
            class="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            title="清空对话"
          >
            <el-icon><Delete /></el-icon>
          </button>
        </div>
      </div>

      <!-- 聊天内容区域 - 优化背景和滚动效果 -->
      <div
        ref="chatMessagesRef"
        class="chat-messages flex-1 p-4 overflow-y-auto chat-bg-pattern"
      >
        <!-- 欢迎消息 - 更具视觉吸引力 -->
        <div
          v-if="messages.length === 0"
          class="welcome-message text-center my-8 animate-fade-in"
        >
          <div class="relative w-20 h-20 mx-auto mb-4">
            <!-- 装饰圆环 -->
            <div
              class="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin-slow"
            ></div>
            <!-- 内圆 -->
            <div
              class="absolute inset-2 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <el-icon class="text-3xl text-primary"><ChatRound /></el-icon>
            </div>
          </div>

          <h4 class="text-lg font-bold text-gray-800 mb-2">锦囊问答</h4>
          <p class="text-gray-600 text-sm max-w-xs mx-auto leading-relaxed">
            您好！我是「锦囊问答」，精通凤翔泥塑非遗知识，也能解答您的其他问题。如同古时锦囊妙计，为您提供各类知识与见解。
          </p>

          <!-- 建议问题 - 优化为卡片样式 -->
          <div
            class="suggestion-questions mt-6 grid grid-cols-1 gap-2 max-w-xs mx-auto"
          >
            <button
              v-for="question in suggestedQuestions"
              :key="question"
              @click="sendMessage(question)"
              class="text-sm py-3 px-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left"
            >
              <div class="flex items-start">
                <el-icon class="mr-2 mt-0.5 text-primary"
                  ><ChatLineRound
                /></el-icon>
                <span>{{ question }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- 消息列表 - 优化气泡样式 -->
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="message-item mb-4 animate-fade-in"
          :style="{ 'animation-delay': `${index * 0.1}s` }"
        >
          <div class="flex" :class="{ 'justify-end': msg.role === 'user' }">
            <!-- 用户头像 - 用户消息 -->
            <div v-if="msg.role === 'user'" class="flex flex-row-reverse">
              <div
                class="user-avatar w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2"
              >
                <el-icon class="text-gray-500"><User /></el-icon>
              </div>

              <div
                class="message-bubble max-w-[80%] rounded-2xl p-3 shadow-sm relative bg-primary text-white"
              >
                <!-- 添加气泡尾巴 -->
                <div
                  class="absolute top-2 right-0 w-3 h-3 bg-primary transform translate-x-[9px] rotate-45"
                ></div>

                <!-- 消息内容 -->
                <div
                  class="relative z-10"
                  v-html="formatMessage(msg.content)"
                ></div>
              </div>
            </div>

            <!-- AI头像 - AI消息 -->
            <div v-else class="flex group">
              <div
                class="ai-avatar w-8 h-8 rounded-full overflow-hidden border border-primary/20 mr-2"
              >
                <img
                  src="@/assets/images/logo.png"
                  alt="AI"
                  class="w-full h-full object-cover"
                />
              </div>

              <div
                class="message-bubble max-w-[80%] rounded-2xl p-3 shadow-sm relative bg-white border border-gray-100 group-hover:border-gray-200"
              >
                <!-- 添加气泡尾巴 -->
                <div
                  class="absolute top-2 left-0 w-3 h-3 bg-white border-l border-t border-gray-100 transform -translate-x-[9px] rotate-45"
                ></div>

                <!-- 消息内容或加载动画 -->
                <div v-if="msg.content" class="relative z-10 prose prose-sm">
                  <div v-html="formatMessage(msg.content)"></div>

                  <!-- 修改复制按钮，移至右下角 -->
                  <div
                    class="copy-button absolute -bottom-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      @click="copyToClipboard(msg.content)"
                      class="w-7 h-7 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center transition-all"
                      title="复制回答"
                    >
                      <el-icon class="text-primary" :size="14"
                        ><CopyDocument
                      /></el-icon>
                    </button>
                  </div>
                </div>
                <div v-else class="thinking-animation">
                  <div class="thinking-container">
                    <div class="thinking-dot"></div>
                    <div class="thinking-dot"></div>
                    <div class="thinking-dot"></div>
                    <span class="thinking-text">锦囊思考中</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 - 优化设计 -->
      <div class="p-3 border-t border-gray-100 bg-white">
        <div class="flex items-center gap-2">
          <el-input
            v-model="userInput"
            placeholder="请输入您的问题..."
            :disabled="isLoading"
            @keyup.enter="sendUserMessage"
            class="flex-1"
          >
            <template #prefix>
              <el-icon class="text-gray-400"><ChatLineRound /></el-icon>
            </template>
          </el-input>

          <el-button
            type="primary"
            :loading="isLoading"
            :disabled="!userInput.trim()"
            @click="sendUserMessage"
            circle
          >
            <el-icon><Position /></el-icon>
          </el-button>
        </div>

        <div class="mt-2 text-center">
          <span class="text-xs text-gray-400"
            >使用 DeepSeek 开放API 提供模型驱动 | 锦囊问答</span
          >
        </div>
      </div>
    </div>

    <!-- 添加测试按钮 -->
    <button
      @click="testNetlifyFunction"
      class="mr-2 text-xs text-white/70 hover:text-white"
    >
      测试函数
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  ChatDotRound,
  Close,
  ChatRound,
  ChatLineRound,
  Position,
  User,
  Delete,
  CopyDocument,
} from "@element-plus/icons-vue";
import { marked } from "marked";
import DOMPurify from "dompurify";
import {
  getChatCompletion,
  saveChatHistory,
  loadChatHistory,
  clearChatHistory,
} from "@/services/aiService";
import axios from "axios";

// 聊天状态
const isChatOpen = ref(false);
const messages = ref<{ role: "user" | "assistant"; content: string }[]>([]);
const userInput = ref("");
const isLoading = ref(false);
const chatMessagesRef = ref<HTMLElement | null>(null);

// 修改建议问题数组，全部聚焦于凤翔泥塑
const suggestedQuestions = ref([
  "凤翔泥塑的历史源远流长吗？",
  "凤翔泥塑有哪些代表性作品？",
  "如何辨别优质的凤翔泥塑作品？",
  "凤翔泥塑的制作工艺有哪些步骤？",
  "凤翔泥塑与其他泥塑艺术有什么区别？",
]);

// 网络状态
const isOnline = ref(true);

// 打开聊天窗口
const openChat = () => {
  isChatOpen.value = true;
};

// 关闭聊天窗口
const closeChat = () => {
  isChatOpen.value = false;
};

// 发送用户消息
const sendUserMessage = async () => {
  if (isLoading.value || !userInput.value.trim()) return;

  // 保存当前输入内容
  const question = userInput.value;

  // 清空输入框
  userInput.value = "";

  // 发送消息
  sendMessage(question);
};

// 发送消息并获取回复
const sendMessage = async (question: string) => {
  // 添加用户消息
  messages.value.push({
    role: "user",
    content: question,
  });

  // 添加一个空的助手消息，用于显示思考动画
  messages.value.push({
    role: "assistant",
    content: "", // 空内容会触发思考动画
  });

  // 滚动到底部以显示思考动画
  await nextTick();
  scrollToBottom();

  // 调用API获取响应
  isLoading.value = true;
  try {
    // 延迟显示思考动画至少1.5秒，增强交互感
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1500));
    const responsePromise = fetchAIResponse(question);

    // 等待两个Promise都完成
    const [response] = await Promise.all([responsePromise, delayPromise]);

    // 更新助手回复（替换空消息）
    messages.value[messages.value.length - 1].content = response;

    // 保存聊天历史
    saveChatHistory(messages.value);
  } catch (error) {
    console.error("发送消息出错:", error);
    // 更新助手回复为错误信息
    messages.value[messages.value.length - 1].content =
      "抱歉，我遇到了一些问题，无法回答您的问题。请稍后再试。";
  } finally {
    isLoading.value = false;
    // 滚动到底部以显示完整回复
    await nextTick();
    scrollToBottom();
  }
};

// 调用API - 不使用本地预设
const fetchAIResponse = async (question: string): Promise<string> => {
  try {
    if (!isOnline.value) {
      return "网络连接已断开，无法连接AI服务。请检查您的网络连接后重试。";
    }

    // 创建消息历史数组
    const messageHistory = messages.value.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    console.log("正在连接 DeepSeek API...");

    // 添加超时处理
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error("API请求超时")), 40000); // 40秒超时（比服务端长）
    });

    const apiPromise = getChatCompletion(messageHistory);

    // 使用Promise.race处理可能的超时
    const response = await Promise.race([apiPromise, timeoutPromise]);
    console.log("API 调用成功");
    return response;
  } catch (error: any) {
    console.error("调用API错误:", error);

    // 提供更友好的错误消息
    if (error.message && error.message.includes("超时")) {
      return "非常抱歉，AI服务响应超时。我们的服务器可能正在维护或遇到高流量。请稍后再试，或者您可以直接浏览网站了解更多凤翔泥塑信息。";
    } else if (error.message && error.message.includes("402")) {
      return "抱歉，AI服务暂时不可用。您可以通过浏览网站其他页面了解更多关于凤翔泥塑的精彩内容。";
    } else {
      return "抱歉，AI服务暂时无法连接。您可以浏览网站的历史文化、制作工艺等栏目获取凤翔泥塑信息。";
    }
  }
};

// 格式化消息内容（支持Markdown）
const formatMessage = (content: string) => {
  const rawHtml = marked.parse(content);
  return DOMPurify.sanitize(rawHtml);
};

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
  }
};

// 监听消息变化，自动滚动
watch(
  messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

// 组件挂载时
onMounted(() => {
  // 如果需要，可以在这里加载聊天历史

  // 初始化网络状态
  isOnline.value = navigator.onLine;

  // 监听网络状态
  window.addEventListener("online", () => {
    isOnline.value = true;
    ElMessage.success("网络已恢复");
  });

  window.addEventListener("offline", () => {
    isOnline.value = false;
    ElMessage.warning("网络已断开，AI助手功能可能受限");
  });
});

// 添加会话管理函数
const clearConversation = () => {
  ElMessageBox.confirm("确定要清空当前对话记录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      messages.value = [];
      clearChatHistory();
      ElMessage({
        type: "success",
        message: "对话已清空",
      });
    })
    .catch(() => {});
};

// 复制到剪贴板
const copyToClipboard = (text) => {
  // 移除Markdown标记以获得纯文本
  const plainText = text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1 ($2)");

  navigator.clipboard
    .writeText(plainText)
    .then(() => {
      ElMessage({
        message: "已复制到剪贴板",
        type: "success",
        duration: 1500,
      });
    })
    .catch((err) => {
      console.error("复制失败:", err);
      ElMessage.error("复制失败，请手动选择文本复制");
    });
};

// 添加测试函数
const testNetlifyFunction = async () => {
  try {
    const response = await axios.get("/.netlify/functions/direct-test");
    console.log("测试函数响应:", response.data);
    ElMessage.success("测试函数正常运行");
  } catch (error) {
    console.error("测试函数错误:", error);
    ElMessage.error("测试函数调用失败");
  }
};
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-spin-slow {
  animation: spinSlow 10s linear infinite;
}

@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 美化聊天窗口 */
.chat-window {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05);
}

/* 添加美化的聊天背景样式 */
.chat-bg-pattern {
  background-color: #f8f9fc;
  background-image: radial-gradient(#e6e8f0 1.5px, transparent 1.5px),
    radial-gradient(#e6e8f0 1.5px, transparent 1.5px);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  position: relative;
}

/* 添加淡雅云纹效果 */
.chat-bg-pattern::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.5) 100%
    ),
    linear-gradient(
      90deg,
      rgba(var(--el-color-primary-rgb), 0.03),
      rgba(var(--el-color-primary-rgb), 0.01) 50%,
      rgba(var(--el-color-primary-rgb), 0.03)
    );
  background-size: 100% 100%, 60px 60px;
  opacity: 0.7;
  z-index: 0;
}

/* 确保滚动条样式协调 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(var(--el-color-primary-rgb), 0.15);
  border-radius: 6px;
  border: 2px solid transparent;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--el-color-primary-rgb), 0.3);
}

/* 美化打字动画 */
.typing-animation {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0.25rem 0;
}

.typing-animation span {
  width: 6px;
  height: 6px;
  background-color: var(--el-color-primary);
  border-radius: 50%;
  display: inline-block;
  opacity: 0.6;
}

.typing-animation span:nth-child(1) {
  animation: bounce 1s infinite;
}

.typing-animation span:nth-child(2) {
  animation: bounce 1s infinite 0.2s;
}

.typing-animation span:nth-child(3) {
  animation: bounce 1s infinite 0.4s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

/* 美化输入框 */
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px rgba(229, 231, 235, 1) inset !important;
  border-radius: 18px !important;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
}

/* 美化发送按钮 */
:deep(.el-button.is-circle) {
  background: var(--el-color-primary);
  border-color: var(--el-color-primary);
  box-shadow: 0 4px 6px -1px rgba(var(--el-color-primary-rgb), 0.3);
  transition: all 0.3s ease;
}

:deep(.el-button.is-circle:hover:not(:disabled)) {
  background: var(--el-color-primary-dark-2);
  border-color: var(--el-color-primary-dark-2);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px -2px rgba(var(--el-color-primary-rgb), 0.4);
}

:deep(.el-button.is-loading) {
  background: var(--el-color-primary-light-3);
  border-color: var(--el-color-primary-light-3);
}

/* 添加对Markdown渲染的样式支持 */
:deep(.prose) {
  font-size: 0.95rem;
  line-height: 1.5;
}

:deep(.prose p) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}

:deep(.prose strong) {
  color: var(--el-color-primary);
  font-weight: 600;
}

:deep(.prose a) {
  color: var(--el-color-primary);
  text-decoration: none;
  border-bottom: 1px dotted var(--el-color-primary);
}

:deep(.prose ul) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding-left: 1.5em;
}

:deep(.prose li) {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}

:deep(.prose code) {
  background-color: rgba(var(--el-color-primary-rgb), 0.1);
  border-radius: 0.25rem;
  padding: 0.1em 0.25em;
  font-family: monospace;
  font-size: 0.9em;
}

/* AI助手按钮样式 */
.ai-floating-btn {
  transform: translateX(-20px);
}

.ai-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  color: white;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(59, 130, 246, 0.2);
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-left: none;
}

.ai-floating-btn:hover {
  transform: translateX(0);
}

.ai-btn:hover {
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.25), 0 0 25px rgba(59, 130, 246, 0.3);
  padding-left: 15px;
}

.ai-btn::before {
  content: "";
  position: absolute;
  inset: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  border-radius: 0 15px 15px 0;
  z-index: -1;
}

.ai-btn:hover::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  border-radius: 0 15px 15px 0;
  animation: shine 1.5s infinite;
  pointer-events: none;
}

@keyframes shine {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* 添加新的左侧滑入动画 */
.animate-slide-in-left {
  animation: slideInLeft 0.3s ease-out forwards;
}

@keyframes slideInLeft {
  from {
    transform: translate(-20px, -50%);
    opacity: 0;
  }
  to {
    transform: translate(0, -50%);
    opacity: 1;
  }
}

/* 添加移动端适配样式 */
@media (max-width: 768px) {
  /* 聊天窗口在移动端全屏显示 */
  .chat-window {
    left: 0 !important;
    right: 0 !important;
    top: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
    transform: none !important;
    border-radius: 0 !important;
    animation: slideUp 0.3s ease-out forwards !important;
  }

  /* 修改移动端动画 */
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  /* AI助手按钮在移动端的样式 */
  .ai-floating-btn {
    bottom: 70px; /* 避免与底部导航栏重叠 */
    top: auto;
    transform: translateY(0) translateX(-10px) !important;
  }

  /* 移动端按钮自动略微隐藏 */
  .ai-btn {
    transform: scale(0.85);
  }

  /* 移动端悬停时完全显示 */
  .ai-btn:hover {
    transform: scale(1);
  }
}

/* 移除语音识别相关样式 */
.is-listening {
  display: none; /* 或完全删除 */
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 108, 108, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 108, 108, 0);
  }
}

/* 简化思考动画样式 */
.thinking-animation {
  padding: 0.5rem 0;
}

.thinking-container {
  display: flex;
  align-items: center;
  background-color: rgba(var(--el-color-primary-rgb), 0.05);
  padding: 5px 12px;
  border-radius: 12px;
  max-width: fit-content;
}

.thinking-text {
  font-size: 0.85rem;
  color: var(--el-color-primary-dark-2);
  font-weight: 600;
}

.thinking-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--el-color-primary);
  margin-right: 4px;
  opacity: 0.7;
}

.thinking-dot:nth-child(1) {
  animation: blink 1.4s infinite 0.2s;
}

.thinking-dot:nth-child(2) {
  animation: blink 1.4s infinite 0.4s;
}

.thinking-dot:nth-child(3) {
  animation: blink 1.4s infinite 0.6s;
  margin-right: 8px;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

/* 添加复制按钮样式 */
.copy-button {
  z-index: 20;
  transform: scale(0.85);
  transition: all 0.2s ease;
}

.copy-button:hover {
  transform: scale(1);
}

.copy-button button::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  z-index: -1;
  background: white;
}

/* 确保在移动设备上也可以点击 */
@media (max-width: 768px) {
  .copy-button {
    opacity: 0.9 !important;
    top: -5px !important;
    right: -5px !important;
  }
}

/* 用户消息气泡渐变 */
.message-bubble.bg-primary {
  background: linear-gradient(
    135deg,
    var(--el-color-primary),
    var(--el-color-primary-dark-2)
  );
}

/* AI消息悬停效果增强 */
.message-bubble.bg-white {
  transition: all 0.3s ease;
}

.message-bubble.bg-white:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  border-color: var(--el-color-primary-light-5);
}

/* 添加内容项目符号和引用样式优化 */
:deep(.prose blockquote) {
  border-left: 3px solid var(--el-color-primary-light-3);
  padding-left: 1em;
  color: #555;
  font-style: italic;
  margin: 0.5em 0 0.5em 1em;
}
</style>
