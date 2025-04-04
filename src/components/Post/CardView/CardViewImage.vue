<template>
  <q-item
    clickable
    @click="$router.push({ query: { post: post.data.permalink } })"
  >
    <q-item-section>
      <q-item-label>
        <SubredditNameLink :subreddit-name="post.data.subreddit" /> •
        {{ displayTimeAgo(post.data.created_utc) }} •
        <FlairRendererPost :post="post" />
      </q-item-label>
      <q-item-label :lines="maxLines">
        <TitleRenderer :post="post" font-size="16px" />
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

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import {
  getGalleryUrls,
  getVideoExtractor,
  isGallery,
  isImage,
  isVideo,
} from 'src/util/media';
import { Dialog } from 'quasar';
import ImageViewer from '../ImageViewer.vue';
import { displayTimeAgo } from 'src/util/time';
import GalleryViewer from '../GalleryViewer.vue';
import VideoPlayer from 'components/Media/VideoPlayer/VideoPlayer.vue';
import { useVisitedStore } from 'stores/visited-store';
import { useSettingsStore } from 'stores/settings-store';
import TitleRenderer from 'components/Post/TitleRenderer.vue';
import FlairRendererPost from 'components/Flair/FlairRendererPost.vue';
import SubredditNameLink from 'components/Post/SubredditNameLink.vue';

interface Props {
  post: Post;
  maxLines?: number;
}

withDefaults(defineProps<Props>(), {
  maxLines: undefined,
});

const visitedStore = useVisitedStore();
const settingsStore = useSettingsStore();

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
