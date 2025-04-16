<template>
  <div class="comment-content" v-html="processedHtml"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  html: string;
}

const { html } = defineProps<Props>();

const processedHtml = computed(() => {
  const el = document.createElement('span');
  el.innerHTML = html;

  linksNewTab(el);
  imagesMaxWidth(el);

  return el.innerHTML;
});

const linksNewTab = (el: HTMLElement): void => {
  const anchors = el.querySelectorAll('a');
  anchors.forEach((anchor) => {
    anchor.target = '_blank';
    anchor.onclick = (ev) => ev.stopPropagation();
  });
};

const imagesMaxWidth = (el: HTMLElement): void => {
  const images = el.querySelectorAll('img');
  images.forEach((image) => {
    image.removeAttribute('height');
    image.style.maxWidth = '100%';
  });
};
</script>

<style lang="scss">
.comment-content {
  .md {
    display: initial !important;
    font-family: Roboto, Arial, sans-serif;
    font-size: 14px;
  }

  p {
    margin: 8px 0;
    line-height: initial;
  }

  blockquote {
    margin: 0 8px;
    padding-left: 4px;
    border-left: 3px solid #aaa;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
    line-height: initial;
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
    line-height: initial;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    line-height: initial;
  }

  a {
    color: #5252ff;
  }

  table {
    width: 100%;
    overflow-x: auto;
    display: inline-block;
  }

  code {
    display: inline-block;
    width: 100%;
    overflow-x: auto;
  }
}
</style>
