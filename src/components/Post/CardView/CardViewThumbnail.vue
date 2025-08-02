<template>
  <q-item
    clickable
    @click="$router.push({ query: { post: post.data.permalink } })"
    style="flex-wrap: wrap"
  >
    <div style="width: 100%; margin: 0 0 8px 0">
      <q-item-label>
        <SubredditNameLink :subreddit-name="post.data.subreddit" /> •
        {{ displayTimeAgo(post.data.created_utc) }}
        <template v-if="postHasFlair(post)">
          • <FlairRendererPost :post="post" />
        </template>
      </q-item-label>
    </div>
    <q-item-section thumbnail>
      <ThumbnailRenderer
        :post="post"
        @open-media="(thisPost) => openMedia(thisPost)"
      />
    </q-item-section>
    <q-item-section top>
      <q-item-label :lines="3">
        <TitleRenderer
          :post="post"
          :ignore-visited="ignoreVisited"
          font-size="16px"
        />
      </q-item-label>
      <q-item-label :lines="3">
        {{ post.data.selftext }}
      </q-item-label>
    </q-item-section>
    <div style="width: 100%; margin: 8px 0 0 0">
      <q-item-label>
        {{ post.data.ups }} <q-icon name="arrow_upward" /> ({{
          (post.data.upvote_ratio * 100).toFixed(0)
        }}%) • {{ post.data.num_comments }}
        <q-icon name="chat_bubble_outline" />
      </q-item-label>
    </div>
  </q-item>
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import { Dialog } from 'quasar';
import { displayTimeAgo } from 'src/util/time';
import ThumbnailRenderer from 'components/Post/ThumbnailRenderer.vue';
import { useVisitedStore } from 'stores/visited-store';
import { useSettingsStore } from 'stores/settings-store';
import TitleRenderer from 'components/Post/TitleRenderer.vue';
import FlairRendererPost from 'components/Flair/FlairRendererPost.vue';
import SubredditNameLink from 'components/Post/SubredditNameLink.vue';
import { postHasFlair } from 'src/util/flair';
import MediaPopupPost from 'components/Media/MediaPopupPost.vue';

interface Props {
  post: Post;
  ignoreVisited?: boolean;
}

defineProps<Props>();
const visitedStore = useVisitedStore();
const settingsStore = useSettingsStore();

const openMedia = (post: Post) => {
  Dialog.create({
    component: MediaPopupPost,
    componentProps: { post },
  });

  if (settingsStore.markPostsAsVisitedOnMediaClick)
    visitedStore.markVisited(post.data.name);
};
</script>
