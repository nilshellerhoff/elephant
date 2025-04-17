<template>
  <div class="comment-content" v-html="html" v-reddit-content></div>
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
