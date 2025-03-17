<template>
  <div>
    <TheHeader />
    <main>
      <slot></slot>
    </main>
    <TheFooter />

    <!-- 悬浮淘宝店铺链接 -->
    <div
      class="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 taobao-floating-btn"
    >
      <a
        href="https://shop342789194.m.taobao.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center bg-gradient-to-r from-[#ff4400] to-[#ff6600] text-white px-3 py-4 rounded-l-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <el-icon class="text-2xl mb-1"><i-ep-shopping-cart /></el-icon>
        <span class="text-sm font-bold">淘宝店铺</span>
        <div class="w-full h-0.5 bg-white/30 my-1"></div>
        <span class="text-xs">立即购买</span>
      </a>
    </div>
  </div>
</template>
