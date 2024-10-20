<template>
  <q-item
    clickable
    @click="$router.push({ query: { post: post.data.permalink } })"
  >
    <q-item-section side>
      <ThumbnailRenderer
        :post="post"
        @open-media="(thisPost) => openMedia(thisPost)"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label :lines="maxLines">
        <FlairBaseRenderer
          v-if="post.data.over_18"
          background-color="#cc0000"
          style="margin-right: 4px"
          >NSFW</FlairBaseRenderer
        >
        <q-icon
          v-if="post.data.stickied"
          name="push_pin"
          style="margin-right: 4px; color: #007a25"
        />
        <b :style="{ color: headerColor }">{{ post.data.title }}</b>
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
import {
  getVideoExtractor,
  getGalleryUrls,
  isGallery,
  isImage,
  isVideo,
} from 'src/util/media';
import { Dialog } from 'quasar';
import ImageViewer from './Post/ImageViewer.vue';
import { displayTimeAgo } from 'src/util/time';
import FlairRenderer from './Post/FlairRenderer.vue';
import GalleryViewer from 'components/Post/GalleryViewer.vue';
import VideoPlayer from 'components/Media/VideoPlayer/VideoPlayer.vue';
import ThumbnailRenderer from 'components/Post/ThumbnailRenderer.vue';
import { useVisitedStore } from 'stores/visited-store';
import { computed } from 'vue';
import { useSettingsStore } from 'stores/settings-store';
import FlairBaseRenderer from 'components/Post/FlairBaseRenderer.vue';

interface Props {
  post: Post;
  maxLines: number;
  markVisited: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxLines: undefined,
  markVisited: false,
});

const visitedStore = useVisitedStore();
const settingsStore = useSettingsStore();

const headerColor = computed(() => {
  if (props.post.data.stickied) return '#007a25';
  else if (
    props.markVisited &&
    visitedStore.visitedPosts.includes(props.post.data.name)
  )
    return '#888';
  else return '#000';
});

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
  } else if (isVideo(post)) {
    console.log('video');
    const extractor = getVideoExtractor(post);
    if (extractor) {
      const { type, url } = extractor.extractor(post);
      Dialog.create({
        component: VideoPlayer,
        componentProps: { url, type },
      });
    }
  } else {
    console.log('unsupported media');
    return;
  }

  if (settingsStore.markPostsAsVisitedOnMediaClick)
    visitedStore.markVisited(post.data.name);
};
</script>
