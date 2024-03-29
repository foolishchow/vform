import { onMounted, onUnmounted, onUpdated } from 'vue'
import { isClient } from '@vueuse/core'
import { throttleAndDebounce } from '../utils'

import type { Ref } from 'vue'

export function useActiveSidebarLinks(
  container: Ref<HTMLElement>,
  marker: Ref<HTMLElement>
) {
  if (!isClient) return

  const onScroll = throttleAndDebounce(setActiveLink, 150)
  function setActiveLink() {
    const sidebarLinks = getSidebarLinks()
    // console.info(sidebarLinks)
    const anchors = getAnchors(sidebarLinks)
    // console.info(anchors)
    if (
      anchors.length &&
      window.scrollY + window.innerHeight === document.body.offsetHeight
    ) {
      activateLink(anchors[anchors.length - 1].hash)
      return
    }
    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i]
      const nextAnchor = anchors[i + 1]
      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor)
      if (isActive) {
        history.replaceState(
          null,
          document.title,
          hash ? (hash as string) : ' '
        )
        activateLink(hash as string)
        return
      }
    }
  }

  let prevActiveLink: HTMLAnchorElement | null = null

  function activateLink(hash: string) {
    if(!container.value) return
    // console.info(`activateLink ${hash}`)
    deactiveLink(prevActiveLink)

    const activeLink = (prevActiveLink =
      hash == null
        ? null
        : (container.value.querySelector(
            `.sidebar-link a[href="${decodeURIComponent(hash)}"]`
          ) as HTMLAnchorElement))
    if (activeLink) {
      activeLink.classList.add('active')
      marker.value.style.opacity = '1'
      marker.value.style.top = `${activeLink.offsetTop}px`
    } else {
      marker.value.style.opacity = '0'
      marker.value.style.top = '33px'
    }
  }

  function deactiveLink(link: HTMLElement | null) {
    link && link.classList.remove('active')
  }

  onMounted(() => {
    window.requestAnimationFrame(setActiveLink)
    window.addEventListener('scroll', onScroll)
  })

  onUpdated(() => {
    activateLink(location.hash)
  })

  onUnmounted(() => {
    // console.info(`onUnmounted `)
    window.removeEventListener('scroll', onScroll)
  })
}
function getSidebarLinks() {
  return Array.from(
    document.querySelectorAll('.holder .sidebar-link-item')
  ) as HTMLAnchorElement[]
}
function getAnchors(sidebarLinks: HTMLAnchorElement[]) {
  return (
    Array.from(
      document.querySelectorAll('.page .container .content .header-anchor')
    ) as HTMLAnchorElement[]
  ).filter((anchor) =>
    sidebarLinks.some((sidebarLink) => sidebarLink.hash === anchor.hash)
  )
}
function getPageOffset() {
  return (document.querySelector('.nav-bar') as HTMLElement).offsetHeight
}
function getAnchorTop(anchor: HTMLAnchorElement) {
  const pageOffset = getPageOffset()
  try {
    return anchor.parentElement!.offsetTop - pageOffset - 15
  } catch {
    return 0
  }
}
function isAnchorActive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement
) {
  const scrollTop = window.scrollY
  if (index === 0 && scrollTop === 0) {
    return [true, null]
  }
  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null]
  }
  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, decodeURIComponent(anchor.hash)]
  }
  return [false, null]
}
