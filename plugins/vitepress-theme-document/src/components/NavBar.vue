<script setup lang="ts">
// @ts-ignore
import NavBarTitle from 'vitepress/dist/client/theme-default/components/NavBarTitle.vue'
// @ts-ignore
import NavLinks from 'vitepress/dist/client/theme-default/components/NavLinks.vue'
// @ts-ignore
import ToggleSideBarButton from 'vitepress/dist/client/theme-default/components/ToggleSideBarButton.vue'

defineEmits(['toggle'])
</script>

<template>
  <header class="nav-bar">
    <div class="nav-bar-wrapper">
      <ToggleSideBarButton @toggle="$emit('toggle')" />

      <NavBarTitle />

      <div class="flex-grow" />

      <div class="nav">
        <NavLinks />
      </div>

      <slot name="search" />
    </div>
  </header>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--z-index-navbar);
  border-bottom: 1px solid var(--c-divider);
}
.nav-bar-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1.5rem 0.7rem 4rem;
  height: var(--header-height);
  background-color: var(--c-bg);
  max-width:var(--c-screen-max-width);
  margin: 0 auto;
}
@media (min-width: 720px) {
  .nav-bar-wrapper {
    padding: 0.7rem 1.5rem;
  }
}

.flex-grow {
  flex-grow: 1;
}

.nav {
  display: none;
}

@media (min-width: 720px) {
  .nav {
    display: block;
  }
}
</style>
