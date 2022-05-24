import { MarkdownItLiveDemo,VitePluginLiveDemo} from 'vitepress-live-demo';
import { UserConfig } from 'vitepress';
import type { DefaultTheme } from 'vitepress/types/default-theme'
import markdownItCheckbox from 'markdown-it-checkbox';
import ApiNavBar from '../api/api.nav'
import GuideNavBar from '../guide/guide.nav'
import * as path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx';

export const config: UserConfig<DefaultTheme.Config> = {
  base: '/vform/element/',
  lang: 'zh-CN',
  title: process.env.npm_package_name,
  description: process.env.npm_package_description,

  // https://vitepress.vuejs.org/guide/markdown.html#advanced-configuration
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(markdownItCheckbox);
      md.use(MarkdownItLiveDemo)
    },
  },

  themeConfig: {
    // sidebar: false,
    sidebar: {
      api: ApiNavBar,
      guide:GuideNavBar
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/get-start.html', activeMatch: '^/guide/' },
      { text: '配置', link: '/api/form.html', activeMatch: '^/api/' },
      {
        text: 'Github',
        link: 'https://github.com/foolishchow/vform',
      },
      {
        text: 'AntDesignVue版本',
        link: 'https://foolishchow.gitee.io/vform/ant-design/',
      },
    ],
  },

  vite: {
    // @ts-ignore
    ssr:{
      noExternal:['ant-design-vue','lodash-es']
    },
    server: {
      port: 7001,
      fs: {
        strict: false,
        // 可以为项目根目录的上一级提供服务
        allow: ['..'],
      },
    },
    resolve: {
      alias: {
        // '@vform/element':path.resolve(__dirname,'../../lib/index.es.js'),
        'vform-element': path.resolve(__dirname, '../../src'),
        '@examples': path.resolve(__dirname, '../../examples'),
      }
    },
    plugins: [
      vueJsx(),
      VitePluginLiveDemo({lineNumber:true,demos:[]})
    ]
  }
};

export default config