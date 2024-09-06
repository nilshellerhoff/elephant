<template>
  <span :style="style">
    {{ post.data.link_flair_text }}
  </span>
</template>

<script setup lang="ts">
import { Post } from '../../types/reddit/post';

interface Props {
  post: Post;
}

const props = defineProps<Props>();

const style = {
  padding: '2px 4px',
  borderRadius: '4px',
  fontWeight: 'bold',
  color: props.post.data.link_flair_text_color == 'light' ? '#eee' : '#111',
  backgroundColor: props.post.data.link_flair_background_color,
};

// 'link_flair_background_color
// :
// "#d3d6da"
// link_flair_css_class
// :
// ""
// link_flair_richtext
// :
// [{e: "text", t: "Bilder"}]
// link_flair_template_id
// :
// "eca8a618-5c59-11e5-a5b5-0e4ee382cd79"
// link_flair_text
// :
// "Bilder"
// link_flair_text_color
// :
// "dark"
// link_flair_type
// :
// "richtext"'
</script>
