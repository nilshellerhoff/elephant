<template>
  <NsfwFlair v-if="post.data.over_18" style="margin-right: 4px" />
  <q-icon
    v-if="post.data.stickied"
    name="push_pin"
    style="margin-right: 4px; color: #007a25"
  />
  <b :style="{ color: headerColor, fontSize }">{{ post.data.title }}</b>
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import { computed } from 'vue';
import { useSettingsStore } from 'stores/settings-store';
import { useVisitedStore } from 'stores/visited-store';
import NsfwFlair from 'components/Flair/NsfwFlair.vue';

interface Props {
  post: Post;
  fontSize?: string;
  ignoreVisited?: boolean;
}

const { post, fontSize, ignoreVisited } = withDefaults(defineProps<Props>(), {
  ignoreVisited: false,
});

const settingsStore = useSettingsStore();
const visitedStore = useVisitedStore();

const headerColor = computed(() => {
  if (post.data.stickied) return '#007a25';
  else if (
    !ignoreVisited &&
    settingsStore.markPostsAsVisited &&
    visitedStore.visitedPosts.includes(post.data.name)
  )
    return '#888';
  else return undefined;
});
</script>
