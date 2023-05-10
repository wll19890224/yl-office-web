import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#1DA57A',
          'primary-color': '#66bb6a',
          'link-color': '#4caf50',
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
  server: {
    proxy: {
      '/jeecg-boot': {
        // target: 'https://yapi.chrpay.cn/jeecg-boot',
        target: "http://192.168.2.238:8081/jeecg-boot/",
        changeOrigin: true,
      },
      '/baseUrl': {
        target: 'https://finsen-client-data.s3.eu-central-1.amazonaws.com',
        changeOrigin: true,
      }
    }
  }
});
