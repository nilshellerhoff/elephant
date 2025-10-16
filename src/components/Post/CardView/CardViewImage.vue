<template>
  <q-item
    clickable
    @click="$router.push({ query: { post: post.data.permalink } })"
  >
    <q-item-section>
      <q-item-label>
        <SubredditLink :subreddit="post.data.subreddit" /> •
        {{ displayTimeAgo(post.data.created_utc) }}
        <template v-if="postHasFlair(post)">
          • <FlairRendererPost :post="post" />
        </template>
      </q-item-label>
      <q-item-label :lines="maxLines">
        <TitleRenderer
          :post="post"
          :ignore-visited="ignoreVisited"
          font-size="16px"
        />
      </q-item-label>
      <template v-if="isImage(post)">
        <q-img
          :src="post.data.url"
          style="margin: 10px 0; max-height: 60vh"
          fit="contain"
          :img-style="{
            filter: blurThumbnail ? 'blur(32px)' : 'none',
          }"
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
import { Dialog } from 'quasar';
import { displayTimeAgo } from 'src/util/time';
import { useVisitedStore } from 'stores/visited-store';
import { useSettingsStore } from 'stores/settings-store';
import TitleRenderer from 'components/Post/TitleRenderer.vue';
import FlairRendererPost from 'components/Flair/FlairRendererPost.vue';
import SubredditLink from 'components/Subreddit/SubredditLink.vue';
import { postHasFlair } from 'src/util/flair';
import MediaPopupPost from 'components/Media/MediaPopupPost.vue';
import { computed } from 'vue';
import { isImage } from 'src/util/media/image';
import { isMedia } from 'src/util/media/general';

interface Props {
  post: Post;
  ignoreVisited?: boolean;
  maxLines?: number;
}

const { post } = defineProps<Props>();

const visitedStore = useVisitedStore();
const settingsStore = useSettingsStore();

const blurThumbnail = computed(
  () => settingsStore.blurNsfwThumbnails && post.data.over_18
);

const openMedia = (post: Post) => {
  if (isMedia(post))
    Dialog.create({
      component: MediaPopupPost,
      componentProps: { post },
    });

  if (settingsStore.markPostsAsVisitedOnMediaClick)
    visitedStore.markVisited(post.data.name);
};
</script>
