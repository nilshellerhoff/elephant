<template>
  <q-item
    clickable
    @click="$router.push({ query: { post: post.data.permalink } })"
  >
    <q-item-section thumbnail>
      <q-icon
        v-if="isDefaultThumbnail(props.post.data.thumbnail)"
        name="subject"
        size="50px"
        style="width: 60px; margin: 5px"
      />
      <q-img
        v-else
        style="width: 60px; margin: 5px"
        :ratio="1"
        :src="props.post.data.thumbnail"
        @click.stop="openMedia(post)"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label :lines="maxLines">
        <b>{{ post.data.title }}</b>
      </q-item-label>
      <q-item-label
        >r/{{ post.data.subreddit }} •
        {{ displayTimeAgo(post.data.created_utc) }} •
        <FlairRenderer :post="post" />
      </q-item-label>
      <q-item-label>
        {{ post.data.ups }} <q-icon name="arrow_upward" /> ({{
          post.data.upvote_ratio * 100
        }}%) • {{ post.data.num_comments }}
        <q-icon name="chat_bubble_outline" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
import { Post } from '../types/reddit/post';
import { getGalleryUrls, isGallery, isImage, isVideo } from 'src/util/media';
import { Dialog } from 'quasar';
import ImageViewer from './Post/ImageViewer.vue';
import { displayTimeAgo } from 'src/util/time';
import FlairRenderer from './Post/FlairRenderer.vue';
import GalleryViewer from 'components/Post/GalleryViewer.vue';

interface Props {
  post: Post;
  maxLines?: number;
}

const props = defineProps<Props>();

const isDefaultThumbnail = (thumbnail: string) => {
  return thumbnail == 'self' || thumbnail == 'default' || thumbnail == 'image';
};

const openMedia = (post: Post) => {
  if (isImage(post)) {
    Dialog.create({
      component: ImageViewer,
      componentProps: { url: post.data.url },
    });
  } else if (isGallery(post)) {
    console.log('gallery');
    Dialog.create({
      component: GalleryViewer,
      componentProps: { urls: getGalleryUrls(post) },
    });
  } else console.log('unsupported media');
};
</script>
