<template>
  <template v-if="!isImage(post)">
    <PostListItem
      :post="post"
      :max-lines="maxLines"
      :mark-visited="markVisited"
    />
  </template>
  <template v-else>
    <q-item
      clickable
      @click="$router.push({ query: { post: post.data.permalink } })"
    >
      <q-item-section>
        <q-item-label
          >r/{{ post.data.subreddit }} •
          {{ displayTimeAgo(post.data.created_utc) }} •
          <FlairRenderer :post="post" />
        </q-item-label>
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
          <b :style="{ color: headerColor, fontSize: '18px' }">{{
            post.data.title
          }}</b>
        </q-item-label>
        <template v-if="isImage(post)">
          <q-img
            :src="post.data.url"
            style="margin: 10px 0; max-height: 60vh"
            fit="contain"
            @click.stop="openMedia(post)"
          />
        </template>
        <q-item-label>
          {{ post.data.ups }} <q-icon name="arrow_upward" /> ({{
            (post.data.upvote_ratio * 100).toFixed(0)
          }}%) • {{ post.data.num_comments }}
          <q-icon name="chat_bubble_outline" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </template>
</template>
<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import {
  getVideoExtractor,
  getGalleryUrls,
  isGallery,
  isImage,
  isVideo,
} from 'src/util/media';
import { Dialog } from 'quasar';
import ImageViewer from './ImageViewer.vue';
import { displayTimeAgo } from 'src/util/time';
import FlairRenderer from './FlairRenderer.vue';
import GalleryViewer from './GalleryViewer.vue';
import VideoPlayer from 'components/Media/VideoPlayer/VideoPlayer.vue';
import { useVisitedStore } from 'stores/visited-store';
import { computed } from 'vue';
import { useSettingsStore } from 'stores/settings-store';
import FlairBaseRenderer from './FlairBaseRenderer.vue';
import PostListItem from 'components/Post/PostListItem.vue';

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
  else return undefined;
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
