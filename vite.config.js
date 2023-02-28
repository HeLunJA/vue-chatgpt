import { defineConfig, loadEnv } from 'vite'
import PostcssPxToViewport from 'postcss-px-to-viewport'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/styles/common.less";'
        }
      },
      postcss: {
        plugins: [
          new PostcssPxToViewport({
            unitToConvert: 'px',
            viewportWidth: 375,
            exclude: []
          })
        ]
      }
    },
    define: {
      'process.env': {
        VITE_BASE_API: loadEnv(mode, process.cwd()).VITE_BASE_API
      }
    },
    server: {
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  })
}
