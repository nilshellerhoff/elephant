<template>
  <PostPopup
    :post-permalink="$route.path"
    :open="true"
    @back="$router.go(-1)"
  />
</template>

<script setup lang="ts">
import PostPopup from 'components/PostPopup.vue';
</script>
