<template>
  <div style="margin: 10px">
    <h5 class="text-center">u/{{ username }}</h5>
    <router-link :to="{ name: 'user', params: { username: username } }">
      <q-btn style="width: 100%" rounded color="primary"> Go to profile </q-btn>
    </router-link>
  </div>
</template>

<script setup lang="ts">
interface Props {
  username: string;
}
defineProps<Props>();
</script>
