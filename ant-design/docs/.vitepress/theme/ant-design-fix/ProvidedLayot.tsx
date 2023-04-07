import { SetupContext } from 'vue'
// @ts-ignore
import Layout from 'vitepress-theme-document/src/Layout.vue'
import 'vitepress-theme-document/src/custom.css'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'ant-design-vue/dist/antd.css'
import './hack.scss'
import './style-fix.css'
export default function ElementPlusProvidedLayout(props: any, context: SetupContext) {
  return <ConfigProvider locale={zhCN}>
    <Layout {...context.attrs} v-slots={context.slots}></Layout>
  </ConfigProvider>
}