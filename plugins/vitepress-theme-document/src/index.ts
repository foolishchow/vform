import type {Theme} from 'vitepress'
import VitepressDefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue'
import './custom.css'

export default {
  ...VitepressDefaultTheme,
  Layout,
} as Theme;
