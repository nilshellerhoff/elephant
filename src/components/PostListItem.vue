<template>
  <q-item
    clickable
    @click="$router.push({ query: { post: post.data.permalink } })"
  >
    <q-item-section thumbnail>
      <q-img
        style="width: 60px; margin: 5px"
        :ratio="1"
        :src="thumbnail"
        @click.stop="openMedia(post.data.url)"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label lines="3">
        <b>{{ post.data.title }}</b>
      </q-item-label>
      <q-item-label>r/{{ post.data.subreddit }}</q-item-label>
      <q-item-label>
        {{ post.data.ups }} ({{ post.data.upvote_ratio * 100 }}%) •
        {{ post.data.num_comments }} comments
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Post } from '../types/reddit/post';
import { isImage } from 'src/util/post_images';
import { Dialog } from 'quasar';
import ImageViewer from './Post/ImageViewer.vue';

interface Props {
  post: Post;
}

const props = defineProps<Props>();

const isDefaultThumbnail = (thumbnail: string) => {
  return thumbnail == 'self' || thumbnail == 'default' || thumbnail == 'image';
};

const thumbnail = computed(() =>
  isDefaultThumbnail(props.post.data.thumbnail)
    ? 'https://cdn.quasar.dev/img/mountains.jpg'
    : props.post.data.thumbnail
);

const openMedia = (url: string) => {
  if (isImage(url)) {
    Dialog.create({
      component: ImageViewer,
      componentProps: {
        url,
      },
    });
  } else console.log('unsupported media');
};
</script>
