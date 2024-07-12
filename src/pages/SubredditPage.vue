<template>
  <SubredditRenderer :subreddit="subreddit" />
</template>

<script setup lang="ts">

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SubredditRenderer from 'components/SubredditRenderer.vue';

const route = useRoute();

const subreddit = computed(() => {
  if (route.params.subreddit) {
    if (typeof route.params.subreddit !== 'string') {
      return 'all';
    }
    return route.params.subreddit;
  } else {
    return 'all';
  }
});
</script>
