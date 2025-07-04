import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { VITE_DROP_CONSOLE } = loadEnv(mode, process.cwd())
  return {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import "./src/styles/variables.less";`,
          },
        },
      },
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE === 'true' ? ['debugger'] : [],

      pure:
        VITE_DROP_CONSOLE === 'true'
          ? ['console.log', 'console.warn', 'console.debug', 'console.trace']
          : [],
    },
    build: {
      minify: 'esbuild',
      // vite默认代码混淆使用esbuild，调用上面esbuild的配置项，但是发现@vitejs/plugin-legacy并没有生效，查看源码也并未发现问题，
      // 但是经过测试下来疑似@vitejs/plugin-legacy仍然使用terser混淆，故仍然保留terserOptions选项，未来如确定不再使用terser可移除该项
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    plugins: [
      vue(),
      vitePluginImp({
        libList: [
          {
            libName: 'vant',
            replaceOldImport: false,
            style: (name) => {
              const specialMapList = [
                ['showToast', 'toast'],
                ['show-toast', 'toast'],
                ['showLoadingToast', 'toast'],
                ['show-loading-toast', 'toast'],
                ['showSuccessToast', 'toast'],
                ['show-success-toast', 'toast'],
                ['showFailToast', 'toast'],
                ['show-fail-toast', 'toast'],
                ['closeToast', 'toast'],
                ['close-toast', 'toast'],
                ['showDialog', 'dialog'],
                ['show-dialog', 'dialog'],
                ['showConfirmDialog', 'dialog'],
                ['show-confirm-dialog', 'dialog'],
                ['closeDialog', 'dialog'],
                ['close-dialog', 'dialog'],
                ['show-notify', 'notify'],
                ['close-notify', 'notify'],
              ]
              const specialMap = specialMapList.find((element) => element[0] === name)
              if (specialMap) {
                return `vant/es/${specialMap[1]}/style/index`
              } else {
                return `vant/es/${name}/style/index`
              }
            },
          },
        ],
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      visualizer(),
      Unocss(),
    ],
  }
})
