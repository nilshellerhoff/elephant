<template>
  <FlairRenderer
    v-if="postHasFlair(post)"
    :flair-richtext="post.data.link_flair_richtext"
    :flair-type="post.data.link_flair_type"
    :flair-text="post.data.link_flair_text"
    :flair-background-color="post.data.link_flair_background_color"
    :flair-text-color="post.data.link_flair_text_color"
  />
</template>

<script lang="ts" setup>
import { Post } from 'src/types/reddit/post';
import FlairRenderer from 'components/Post/FlairRenderer.vue';
import { postHasFlair } from 'src/util/flair';

interface Props {
  post: Post;
}
defineProps<Props>();
</script>
