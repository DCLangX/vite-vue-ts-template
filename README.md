# 1、安装vscode插件

搜索ESLint、stylelint、Prettier、Volar并安装，如果有安装Vetur，请禁用

按下`ctrl+shift+p`，输入setting.json，选择`首选项：打开设置（json）`，插入如下设置

```
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "stylelint.enable": true,
  // 默认使用prettier格式化支持的文件
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 自动设定eslint工作区
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "eslint.alwaysShowStatus": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
```

# 2、初始化vite项目（建议使用pnpm）

`yarn create vite`

或

`npm create vite@latest`

或

`pnpm create vite`

安装中选择Vue，TypeScript

# 3、安装eslint、prettier插件

`yarn add --dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin vue-eslint-parser`

或

`npm install eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin vue-eslint-parser --save-dev`

或

`yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin vue-eslint-parser`

# 4、配置eslint

新建.eslintrc.js

```
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  rules: {},
};
```

# 5、配置prettier

新建.prettierrc

```
{
  "endOfLine": "auto"
}
```

# 6、添加目录别名

vite.config.ts添加

```
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
    ],
  },
```

tsconfig.json添加

```
    "paths": {
      "@/*": ["./src/*"]
    },
```

# 7、安装scss

`yarn add --dev sass`

或

`pnpm add -D sass`

# 8、引入stylelint规则

`yarn add --dev stylelint stylelint-config-standard stylelint-config-recess-order stylelint-scss`

或

`pnpm add -D stylelint stylelint-config-standard stylelint-config-recess-order stylelint-scss`

新建stylelint.config.js

```
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  plugins: ["stylelint-scss"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
  },
};
```

# 9、（可选）注入全局scss变量

vite.config.ts中加入

```
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables";`,
      },
    },
  },
```

# 10、优化打包参数，去除console、debugger

vite.config.ts中配置

```
  build: {
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1200,
  },
```

# 11、配置打包分析插件

`yarn add --dev rollup-plugin-visualizer`

或

`pnpm add -D rollup-plugin-visualizer`

vite.config.ts中配置

`import { visualizer } from "rollup-plugin-visualizer";`

```
  build: {
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
```

# 12、配置UnoCSS
`pnpm add @unocss/reset`
`pnpm add -D unocss`

vite.config.ts中配置

`import Unocss from "unocss/vite";`

```
  plugins: [
    Unocss(),
  ],
```

main.ts中配置

```
import "@unocss/reset/normalize.css";
import "uno.css";
```

# 13、（可选）配置UI框架的组件CSS按需导入

`pnpm add -D vite-plugin-imp`

vite.config.ts中配置

`import vitePluginImp from "vite-plugin-imp";`

```
  plugins: [
    vitePluginImp()
  ],
```

# 14、（可选）添加传统浏览器兼容支持

`pnpm add -D @vitejs/plugin-legacy terser`

vite.config.ts中配置

`import legacy from '@vitejs/plugin-legacy';`

```
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
```