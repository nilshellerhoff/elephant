<template>
  <div style="margin: 10px">
    <h5 class="text-center">r/{{ subreddit }}</h5>
    <router-link :to="{ name: 'subreddit', params: { subreddit: subreddit } }">
      <q-btn style="width: 100%" rounded color="primary">
        Go to subreddit
      </q-btn>
    </router-link>
  </div>
</template>

<script setup lang="ts">
interface Props {
  subreddit: string;
}
defineProps<Props>();
</script>
