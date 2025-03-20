<template>
  <CardViewImage v-if="isImage(post)" :post="post" />
  <CardViewThumbnail
    v-else-if="getThumbnailUrl(post) !== undefined"
    :post="post"
  />
  <CardViewDefault v-else :post="post" />
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import { isImage } from 'src/util/media';
import CardViewDefault from 'components/Post/CardView/CardViewDefault.vue';
import CardViewImage from 'components/Post/CardView/CardViewImage.vue';
import CardViewThumbnail from 'components/Post/CardView/CardViewThumbnail.vue';
import { getThumbnailUrl } from 'src/util/post';

interface Props {
  post: Post;
  maxLines: number;
}

defineProps<Props>();
</script>
