<template>
  <FlairBaseRenderer
    v-if="post.data.link_flair_type == 'richtext'"
    :background-color="backgroundColor"
    :foreground-color="foregroundColor"
  >
    <span
      v-if="post.data.link_flair_type == 'richtext'"
      v-html="renderRichtextFlair()"
    ></span>
    <span v-else>
      {{ post.data.link_flair_text }}
    </span>
  </FlairBaseRenderer>
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import FlairBaseRenderer from 'components/Post/FlairBaseRenderer.vue';
import { computed } from 'vue';

interface Props {
  post: Post;
}

const props = defineProps<Props>();

const renderRichtextFlair = () => {
  return props.post.data.link_flair_richtext.reduce((acc, curr) => {
    if (curr.e == 'text') return acc + curr.t;
    else if (curr.e == 'emoji')
      return (
        acc +
        `<img width=14 style="vertical-align: top" src=${curr.u} alt=${curr.a} />`
      );
    else return acc + curr.e;
  }, '');
};

const backgroundColor = computed(
  () => props.post.data.link_flair_background_color
);
const foregroundColor = computed(() =>
  props.post.data.link_flair_text_color == 'light' ? '#eee' : '#111'
);
</script>
