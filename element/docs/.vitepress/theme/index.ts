import type { Theme } from 'vitepress'
import ViteDefaultTheme from 'vitepress/theme';
import './custom.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlusProvidedLayout from './element-fix/ProvidedLayot';
import { VitepressLiveDemo } from 'vitepress-live-demo/lib/theme'
import "vitepress-live-demo/lib/style.css"

export default {
  ...ViteDefaultTheme,
  Layout: ElementPlusProvidedLayout,
  enhanceApp({ app, router, siteData }) {
    VitepressLiveDemo.enhanceApp({ app, router, siteData })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
} as Theme;
