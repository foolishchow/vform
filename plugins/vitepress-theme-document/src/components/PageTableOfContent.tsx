import { computed, defineComponent, ref } from 'vue'
import { useRoute, useData } from 'vitepress'
import { getSideBarConfig } from '../support/sideBar'
import { resolveHeaders, SideBarLink } from './SideBarLink'
import './PageTableOfContent.css'
import { useActiveSidebarLinks } from '../composables/active-toc'
import { isClient } from '@vueuse/core'
export default defineComponent({
  name: 'vite-page-toc',
  setup() {
    const route = useRoute()
    const { page, theme, frontmatter } = useData()
    const showSidebar = computed(() => {
      if (!isClient) {
        return false
      }
      if (frontmatter.value.home || frontmatter.value.sidebar === false) {
        return false
      }
      const sideBar = getSideBarConfig(theme.value.sidebar, route.data.relativePath)
      return sideBar != 'auto'
    })

    const tableOfContent = computed(() => {
      return resolveHeaders(page.value.headers ?? [])
    })
    const marker = ref()
    const container = ref()
    useActiveSidebarLinks(container, marker)
    return () => {
      if (!showSidebar.value) {
        return null
      }
      return <div class="vitepress-toc-wrapper" ref={container}>
        <div class="holder">
          <ul class="sidebar-links ">
            {tableOfContent.value.map(head => {
              return <SideBarLink item={head as any} />
            })}
          </ul>
          <div ref={marker} class="toc-marker" />
        </div>
      </div>
    }
  }
})