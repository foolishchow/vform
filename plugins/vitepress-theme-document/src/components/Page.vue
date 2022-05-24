<script setup lang="ts">
import PageTableOfContent from './PageTableOfContent'
// @ts-ignore
import PageFooter from 'vitepress/dist/client/theme-default/components/PageFooter.vue'
// @ts-ignore
import NextAndPrevLinks from 'vitepress/dist/client/theme-default/components/NextAndPrevLinks.vue'
</script>

<template>
  <main class="page">
    <div class="page-left"></div>
    <div class="container">
      <slot name="top" />

      <Content class="content" />
      <PageFooter />
      <NextAndPrevLinks />

      <slot name="bottom" />
    </div>
    <PageTableOfContent/>
  </main>
</template>

<style scoped>
.page {
  padding-top: var(--header-height);
  display:flex;
}

.page-left{
  flex: 0 0 0;
}
@media (min-width: 710px) {
  .page {
    /* margin-left: 16.4rem; */
    padding-left: var(--c-sidebar-width);
  }
}

@media (min-width: 960px) {
  .page  {
    /* margin-left: 20rem; */
    padding-left: var(--c-sidebar-width);
  }
}


@media screen and (min-width: 960px) and (min-width: 1280px) {
    .page  {
      padding-left: calc(var(--c-sidebar-width) - 6px)
    }
}

@media screen and (min-width: 960px) and (min-width: 1440px) {
    .page{
      padding-left:calc((100% - var(--c-screen-max-width)) / 2 + var(--c-sidebar-width) );
      padding-right:calc((100% - var(--c-screen-max-width)) / 2  );
    }
}
/* @media screen and (min-width: 1280px) and (min-width: 1440px) {
    .page {
      padding-right:calc((100% - var(--c-screen-max-width)) / 2 + var(--c-sidebar-width) )
    }
} */

/* @media screen and (min-width: 960px) and (min-width: 1280px) {
    .page > .container {
        padding-left:calc(var(--c-sidebar-width-small) - 6px)
    }
}

@media screen and (min-width: 960px) and (min-width: 1440px) {
    .page > .container {
        padding-left:calc((100% - var(--c-screen-max-width)) / 2 + var(--c-sidebar-width-small))
    }
} */



.container {
  /* margin: 0 auto; */
  padding: 0 2rem 4rem;
  /* max-width: 48rem; */
  flex:1 ;
  overflow-x:auto;
}

.content {
  padding-bottom: 1.5rem;
}

@media (max-width: 420px) {
  .content {
    /* fix carbon ads display */
    clear: both;
  }
}
</style>
