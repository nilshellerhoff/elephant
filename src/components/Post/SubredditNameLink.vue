<template>
  <router-link @click.stop :to="`/r/${subredditName}`">
    r/{{ subredditName }}
  </router-link>
</template>

<script setup lang="ts">
interface Props {
  subredditName: string;
}

defineProps<Props>();
</script>

<style>
a {
  font-size: 14px;
  color: var(--q-secondary);
  text-decoration: none;
}
</style>
