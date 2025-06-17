import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended'
import parserVue from 'vue-eslint-parser'

export default [
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: ['**/build/**', '**/dist/**'],
  },
  // eslint 默认推荐规则
  pluginJs.configs.recommended,
  // ts 默认推荐规则
  ...tseslint.configs.recommended,
  // vue3 基础推荐规则
  ...pluginVue.configs['flat/recommended'],
  // prettier 默认推荐规则
  pluginPrettierRecommendedConfigs,
  {
    languageOptions: {
      parser: parserVue,
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      'no-undef': 'off',
      'vue/v-on-event-hyphenation': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
]
