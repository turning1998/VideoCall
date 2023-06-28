import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';
import legacyPlugin from '@vitejs/plugin-legacy';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    // base: '/qjScreen/',
    base: './',
    // base: loadEnv(mode, process.cwd()).VITE_BASE,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        dayjs: 'dayjs/esm',
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      legacyPlugin({
        targets: ['chrome 52'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        // modernPolyfills: true,
        // renderLegacyChunks: false
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'pinia',
          {
            lodash: ['snakeCase', 'cloneDeep'],
            'vue-cookie': [['default', 'Cookie']],
            '@turf/turf': ['degreesToRadians'],
            '@/utils/tools': ['joinViewsLazy', 'listToTree', 'treeToListByBro'],
          },
        ],
        dirs: ['src/stores'],
        dts: false,
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less',
          }),
        ],
        dirs: ['src/components', 'src/components/**', 'src/layouts'],
        dts: false,
      }),
      visualizer({ open: true, filename: 'report.html' }),
      viteMockServe({
        mockPath: './server/mock',
        localEnabled: loadEnv(mode, process.cwd()).VITE_ENV === 'mock', // 开发打包开关
        prodEnabled: loadEnv(mode, process.cwd()).VITE_ENV === 'mock', // 生产打包开关
        // 这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupProdMockServer } from '../server/mockProdServer';
          setupProdMockServer();
        `,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @import "@/assets/scss/_vars.scss";
        @import "@/assets/scss/_mixins.scss";
        @import "@/assets/scss/base.scss";
        `,
        },
        less: {
          modifyVars: {
            'primary-color': '#3967FF',
            'layout-header-background': '#FFFFFF',
            'layout-header-height': '50px',
            'layout-header-padding': '0 28px',
            'slider-rail-background-color': '#4C4C4C',
            'slider-track-background-color': '#91FBFF',
          },
          javascriptEnabled: true,
        },
      },
    },
    server: {
      host: true,
      proxy: {
        '/test': {
          target: 'https://zyhcool.top:8080', // 后端接口地址 http://192.168.49.142:8087 https://yfgis.yndk.cn:1000
          ws: true,
          changeOrigin: true, // 是否允许跨越
          rewrite: path => path.replace(/^\/test/, '/'),
        },
        '/self': {
          target: 'http://localhost:9010',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/self/, '/'),
        },
        '/mock': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/mock/, '/mock'),
        },
        '/yfgis': {
          target: 'https://yfgis.yndk.cn:1000', // 后端接口地址
          ws: true,
          changeOrigin: true, // 是否允许跨越
          rewrite: path => path.replace(/^\/yfgis/, '/'),
        },
        '/weather': {
          target: 'http://13.11.100.91', // 后端接口地址
          ws: true,
          changeOrigin: true, // 是否允许跨越
          rewrite: path => path.replace(/^\/weather/, '/weather'),
        },
      },
    },
    optimizeDeps: {
      include: ['ant-design-vue', '@ant-design/icons-vue'],
    },
    define: {
      'process.env': {},
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      minify: 'terser',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // eslint-disable-next-line consistent-return
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
  });
