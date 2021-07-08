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

# 2、初始化vite项目

`yarn create @vitejs/app`

或

`npm init @vitejs/app `

安装中选择Vue，TypeScript

# 3、安装eslint、prettier插件

`yarn add --dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin vue-eslint-parser`

或

`npm install eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin vue-eslint-parser --save-dev`

# 4、配置eslint

新建.eslintrc.js

```
module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
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

`yarn add --dev sass `

# 8、引入stylelint规则

`yarn add --dev stylelint stylelint-config-standard stylelint-config-recess-order stylelint-scss`

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
  build: {
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1200,
  },
```

# 11、配置打包分析插件

`yarn add --dev rollup-plugin-visualizer`

vite.config.ts中配置

`import { visualizer } from "rollup-plugin-visualizer";`

```
  build: {
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
```

# 12、（可选）配置UI框架的组件CSS按需导入

`yarn add --dev vite-plugin-style-import`

vite.config.ts中配置

`import styleImport from "vite-plugin-style-import";`

```
  plugins: [
    styleImport({
      libs: [
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
          },
        },
        {
          libraryName: "antd",
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => {
            return `vant/es/${name}/style`;
          },
        },
        {
          libraryName: "element-plus",
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
```

# 13、（可选）添加传统浏览器兼容支持

`yarn add --dev @vitejs/plugin-legacy`

vite.config.ts中配置

`import legacy from '@vitejs/plugin-legacy';`

```
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
```