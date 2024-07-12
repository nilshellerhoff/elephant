<template>
  <span class="comment-content" v-html="unescapeHTML(html)"></span>
</template>

<script setup lang="ts">
interface Props {
  html: string;
}

defineProps<Props>();

const unescapeHTML = (input: string) => {
  const elt = document.createElement('span');
  elt.innerHTML = input;
  return elt.innerText;
};
</script>

<style lang="scss">
.comment-content {
  .md {
    display: block !important;
  }

  p {
    margin: 8px 0;
  }

  blockquote {
    margin: 0 8px;
    padding-left: 4px;
    border-left: 3px solid #aaa;
  }
}
</style>
