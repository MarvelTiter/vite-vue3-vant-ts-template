import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import { svgBuilder } from "./src/plugins/svgBuilder";
import { resolve } from "path";
// import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(
  {
    plugins: [
      vue(),
      styleImport({
        resolves: [
          VantResolve(),
        ],
      },
      ),
      AutoImport({
        resolvers: [
          VantResolver(),
        ],
      },
      ),
      Components({
        dts: true,
        resolvers: [
          VantResolver(),
        ],
      },
      ),
      svgBuilder('./src/icons/svg/')
    ],
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '@': resolve(__dirname, "src")
      },
    },
    server: {
      proxy: {
        '/agent:5103': {
          target: 'https://www.hg-banner.cn:5103',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/agent:5103/, '')
        },
        '/agent:5091': {
          target: 'https://www.hg-banner.cn:5091',
          changeOrigin: true,
          secure: false,
          rewrite: path => {
            console.log(path);
            return path.replace(/^\/agent:5091/, '')
          }
        }
      }
    }
  },
);
