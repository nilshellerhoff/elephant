<template>
  <h3>u/{{ username }}</h3>
  <h6>Posts</h6>
  <SubredditRenderer :subreddit="username" type="user" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import SubredditRenderer from 'components/Subreddit/SubredditRenderer.vue';

const route = useRoute();
const username = route.params.username as string;
</script>
