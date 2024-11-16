<template>
  <SubredditRenderer :subreddit="subredditsStr" />
</template>
<script setup lang="ts">
import SubredditRenderer from 'components/SubredditRenderer.vue';
import { usePageTitle } from 'src/composables/pageTitle';
import { useListsStore } from 'stores/lists-store';

const lists = useListsStore();
const title = usePageTitle();

const subreddits = lists.subscriptions.map((s) => s.code);
const subredditsStr = subreddits.length ? subreddits.join('+') : 'all';

title.setTitle('Home');
</script>
