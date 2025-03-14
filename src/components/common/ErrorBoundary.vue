<!-- 错误边界组件 -->
<template>
  <div v-if="error" class="error-container">
    <el-result
      icon="error"
      :title="error.message"
      sub-title="请稍后重试或联系管理员"
    >
      <template #extra>
        <el-button type="primary" @click="handleRetry">重试</el-button>
      </template>
    </el-result>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";

const error = ref<Error | null>(null);

onErrorCaptured((err) => {
  error.value = err;
  return false;
});

const handleRetry = () => {
  error.value = null;
  window.location.reload();
};
</script>
