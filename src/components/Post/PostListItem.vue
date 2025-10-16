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
        <TitleRenderer :post="post" :ignore-visited="ignoreVisited" />
      </q-item-label>
      <q-item-label>
        <SubredditLink :subreddit="post.data.subreddit" /> •
        {{ displayTimeAgo(post.data.created_utc) }}
        <template v-if="postHasFlair(post)">
          • <FlairRendererPost :post="post" />
        </template>
      </q-item-label>
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
import ThumbnailRenderer from 'components/Post/ThumbnailRenderer.vue';
import { useVisitedStore } from 'stores/visited-store';
import { useSettingsStore } from 'stores/settings-store';
import TitleRenderer from 'components/Post/TitleRenderer.vue';
import FlairRendererPost from 'components/Flair/FlairRendererPost.vue';
import SubredditLink from 'components/Subreddit/SubredditLink.vue';
import { postHasFlair } from 'src/util/flair';
import MediaPopupPost from 'components/Media/MediaPopupPost.vue';
import { isMedia } from 'src/util/media/general';

interface Props {
  post: Post;
  maxLines?: number;
  ignoreVisited?: boolean;
}

withDefaults(defineProps<Props>(), {
  maxLines: undefined,
});

const visitedStore = useVisitedStore();
const settingsStore = useSettingsStore();

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
