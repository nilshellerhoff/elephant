<template>
  <SubredditRenderer :subreddit="subreddit" />
  <template v-if="$route.query.post">
    <PostPopup
      :post-permalink="$route.query.post"
      :open="true"
      @back="$router.go(-1)"
    />
  </template>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import SubredditRenderer from 'components/SubredditRenderer.vue';
import PostPopup from 'components/PostPopup.vue';
import { usePageTitle } from 'src/composables/pageTitle';

const route = useRoute();
const title = usePageTitle();

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

watch(
  () => route.params.subreddit,
  () => {
    let subreddit;
    if (typeof route.params.subreddit !== 'string') {
      subreddit = 'all';
    } else subreddit = route.params.subreddit;
    title.setTitle(`r/${subreddit}`);
  },
  { immediate: true }
);
</script>
