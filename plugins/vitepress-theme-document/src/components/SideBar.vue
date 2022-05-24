<script setup lang="ts">
// @ts-ignore
import NavLinks from 'vitepress/dist/client/theme-default/components/NavLinks.vue'
// @ts-ignore
import SideBarLinks from './SideBarLinks.vue'

defineProps<{ open: boolean }>()
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <NavLinks class="nav" />

    <slot name="sidebar-top" />

    <SideBarLinks />

    <slot name="sidebar-bottom" />
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  z-index: var(--z-index-sidebar);
  border-right: 1px solid var(--c-divider);
  width: var(--c-sidebar-width);
  background-color: var(--c-bg);
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
}

@media (min-width: 720px) {
  .sidebar {
    transform: translateX(0);
  }
}

@media (min-width: 960px) {
  .sidebar {
    /* width: 20rem; */
  }
}

@media screen and (min-width: 1440px) {
    .sidebar {
        padding-left: calc((100% - var(--c-screen-max-width)) / 2);
        width: calc((100% - var(--c-screen-max-width)) / 2 + var(--c-sidebar-width))
    }
}

@media screen and (min-width: 1680px) {
    .sidebar {
        padding-left: calc((100% - var(--c-screen-max-width)) / 2);
        width: calc((100% - var(--c-screen-max-width)) / 2 + var(--c-sidebar-width))
    }
}

.sidebar.open {
  transform: translateX(0);
}

.nav {
  display: block;
}

@media (min-width: 720px) {
  .nav {
    display: none;
  }
}
</style>
