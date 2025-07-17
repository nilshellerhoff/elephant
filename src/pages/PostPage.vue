<template>
  <PostRenderer v-if="postPermalink" :post-permalink="postPermalink" />
  <template v-else>
    <div style="padding: 20px; text-align: center" class="text-grey-8">
      <h5>No post selected</h5>
      <p>Click on a post to view comments</p>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PostRenderer from 'components/Post/PostRenderer.vue';

const route = useRoute();

const postPermalink = computed(() => route.query.post as string);
</script>
