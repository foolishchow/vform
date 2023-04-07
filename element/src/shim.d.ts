/// <reference types="vite/client" />
/// <reference types="vitepress/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const __VP_HASH_MAP__: Record<string, string>
declare const __CARBON__: boolean
declare const __BSA__: boolean
declare const __ALGOLIA__: boolean

declare module "*.svg"{
  const svg:string
  export default svg
}