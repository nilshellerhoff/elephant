<template>
  <SubredditRenderer subreddit="all" />
</template>
<script setup lang="ts">
import SubredditRenderer from 'components/SubredditRenderer.vue';
import { usePageTitle } from 'src/composables/pageTitle';

const title = usePageTitle();
title.setTitle('r/all');
</script>
