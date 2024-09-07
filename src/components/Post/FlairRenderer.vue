<template>
  <span :style="style">
    <span
      v-if="post.data.link_flair_type == 'richtext'"
      v-html="renderRichtextFlair()"
    ></span>
    <span v-else>{{ post.data.link_flair_text }}</span>
  </span>
</template>

<script setup lang="ts">
import { Post } from '../../types/reddit/post';

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

const style = {
  padding: '2px 4px',
  borderRadius: '4px',
  fontWeight: 'bold',
  color: props.post.data.link_flair_text_color == 'light' ? '#eee' : '#111',
  backgroundColor: props.post.data.link_flair_background_color,
};
</script>
