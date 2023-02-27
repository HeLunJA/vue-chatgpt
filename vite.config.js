import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/styles/common.less";',
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
