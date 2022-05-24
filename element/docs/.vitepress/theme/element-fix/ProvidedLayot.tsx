import { SetupContext } from 'vue'
// @ts-ignore
import Layout from 'vitepress-theme-document/src/Layout.vue'
import 'vitepress-theme-document/src/custom.css'
import { ElConfigProvider } from 'element-plus'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import './style-fix.css'
export default function ElementPlusProvidedLayout(props: any, context: SetupContext) {
  return <ElConfigProvider locale={zhCN}>
    <Layout {...context.attrs} v-slots={context.slots}></Layout>
  </ElConfigProvider>
}