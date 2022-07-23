import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
// @ts-ignore
// @ts-ignore
export default defineConfig({
  plugins: [
      vue(),
      AutoImport({
        resolvers: [
          TDesignResolver({library: 'vue-next'}),
        ],
      }),
      Components({
        resolvers: [
          TDesignResolver({library: 'vue-next'}),
        ],
      }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    port: 12221,
    host: '0.0.0.0',
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
})
