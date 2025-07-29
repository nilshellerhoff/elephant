<template>
  <q-img :src="subredditIcon" alt="" />
</template>

<script setup lang="ts">
import { SubredditAboutResponse } from 'src/types/reddit/subreddit';
import { computed } from 'vue';
import { getSubredditIcon } from 'src/util/subreddit';

interface Props {
  subreddit: SubredditAboutResponse;
}
const props = defineProps<Props>();

const subredditIcon = computed(() => getSubredditIcon(props.subreddit));
</script>
