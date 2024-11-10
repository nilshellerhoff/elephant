<template>
  <q-img :src="subredditIcon" alt="" />
</template>

<script setup lang="ts">
import { SubredditAboutResponse } from 'src/types/reddit/subreddit';
import { computed } from 'vue';

interface Props {
  subreddit: SubredditAboutResponse;
}
const props = defineProps<Props>();

const subredditIcon = computed(() =>
  props.subreddit.data.community_icon
    ? props.subreddit.data.community_icon
    : props.subreddit.data.icon_img
);
</script>
