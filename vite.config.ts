import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginImp from "vite-plugin-imp";
import { visualizer } from "rollup-plugin-visualizer";
import legacy from "@vitejs/plugin-legacy";
import Unocss from "unocss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables";',
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    minify: "esbuild",
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
    vitePluginImp(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    visualizer(),
    Unocss(),
  ],
});
