<!-- 加载状态组件 -->
<template>
  <div class="loading-container">
    <el-skeleton :rows="3" animated />
  </div>
</template>

<style scoped>
.loading-container {
  @apply p-4;
}
</style>
