<template>
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
  <b :style="{ color: headerColor, fontSize }">{{ post.data.title }}</b>
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import FlairBaseRenderer from 'components/Post/FlairBaseRenderer.vue';
import { computed } from 'vue';
import { useSettingsStore } from 'stores/settings-store';
import { useVisitedStore } from 'stores/visited-store';

interface Props {
  post: Post;
  fontSize?: string;
}

const { post, fontSize } = defineProps<Props>();
const settingsStore = useSettingsStore();
const visitedStore = useVisitedStore();

const headerColor = computed(() => {
  if (post.data.stickied) return '#007a25';
  else if (
    settingsStore.markPostsAsVisited &&
    visitedStore.visitedPosts.includes(post.data.name)
  )
    return '#888';
  else return undefined;
});
</script>
