<template>
  <CardViewImage v-if="isImage(post)" :post="post" />
  <CardViewDefault v-else :post="post" />
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import { isImage } from 'src/util/media';
import CardViewDefault from 'components/Post/CardView/CardViewDefault.vue';
import CardViewImage from 'components/Post/CardView/CardViewImage.vue';

interface Props {
  post: Post;
  maxLines: number;
  markVisited: boolean;
}

defineProps<Props>();
</script>
