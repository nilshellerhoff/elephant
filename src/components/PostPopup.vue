<template>
  <q-dialog
    :model-value="true"
    persistent
    maximized
    style="margin-bottom: 200px; overflow-wrap: break-word; overflow: hidden"
  >
    <q-layout view="hHh lpR fFf">
      <HeaderBar type="popup" @toggle="$emit('back')" />
      <FooterBar />

      <q-page-container class="post-popup-container" style="min-height: 100%">
        <PostRenderer :post-permalink="postPermalink" />
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import HeaderBar from 'components/HeaderBar.vue';
import FooterBar from 'components/FooterBar.vue';
import PostRenderer from 'components/Post/PostRenderer.vue';

interface Props {
  open: boolean;
  postPermalink: string | undefined;
}
defineProps<Props>();
defineEmits(['back']);
</script>

<style lang="scss">
.body--light .post-popup-container {
  background-color: #fff;
}

.body--dark .post-popup-container {
  background-color: #121212;
}
</style>
