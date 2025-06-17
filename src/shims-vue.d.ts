declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_BASE_PATH: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
