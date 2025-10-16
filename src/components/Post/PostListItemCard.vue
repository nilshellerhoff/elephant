<template>
  <CardViewImage
    v-if="isImage(post)"
    :post="post"
    :ignore-visited="ignoreVisited"
  />
  <CardViewThumbnail
    v-else-if="getThumbnailUrl(post) !== undefined"
    :post="post"
    :ignore-visited="ignoreVisited"
  />
  <CardViewDefault v-else :post="post" :ignore-visited="ignoreVisited" />
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import CardViewDefault from 'components/Post/CardView/CardViewDefault.vue';
import CardViewImage from 'components/Post/CardView/CardViewImage.vue';
import CardViewThumbnail from 'components/Post/CardView/CardViewThumbnail.vue';
import { getThumbnailUrl } from 'src/util/post';
import { isImage } from 'src/util/media/image';

interface Props {
  post: Post;
  ignoreVisited?: boolean;
  maxLines: number;
}

defineProps<Props>();
</script>
