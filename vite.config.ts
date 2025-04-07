import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.mp4'],
  optimizeDeps: {
    include: [
      'vue',
      '@vue/reactivity',
      '@vue/runtime-core',
      'element-plus',
      '@element-plus/icons-vue'
    ]
  },
  base: './',
  envDir: './',
  envPrefix: 'VITE_',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    assetsInlineLimit: 4096,
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', '@vue/runtime-dom', '@vue/runtime-core'],
          'element-plus-vendor': ['element-plus', '@element-plus/icons-vue'],
          'vendor': ['pinia', 'vue-router']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api/deepseek': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/deepseek/, ''),
        secure: false,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json'
        }
      }
    },
    historyApiFallback: true // 添加 history 模式支持
  }
})