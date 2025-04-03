<template>
  <q-item
    clickable
    @click="$router.push({ query: { post: post.data.permalink } })"
    style="flex-wrap: wrap"
  >
    <div style="width: 100%; margin: 0 0 8px 0">
      <q-item-label>
        <b>r/{{ post.data.subreddit }}</b> •
        {{ displayTimeAgo(post.data.created_utc) }} •
        <FlairRendererPost :post="post" />
      </q-item-label>
    </div>
    <div style="width: 100%; margin: 0 0 8px 0">
      <q-item-label :lines="3">
        <TitleRenderer :post="post" font-size="16px" />
      </q-item-label>
      <q-item-label :lines="3">
        {{ post.data.selftext }}
      </q-item-label>
    </div>
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
import { displayTimeAgo } from 'src/util/time';
import TitleRenderer from 'components/Post/TitleRenderer.vue';
import FlairRendererPost from 'components/Flair/FlairRendererPost.vue';

interface Props {
  post: Post;
}

defineProps<Props>();
</script>
