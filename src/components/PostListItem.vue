<template>
  <q-item clickable @click="openPost">
    <q-item-section thumbnail>
      <q-img style="width: 60px; margin: 5px" :ratio="1" :src="thumbnail" />
    </q-item-section>
    <q-item-section>
      <q-item-label lines="3">
        <b>{{ post.data.title }}</b>
      </q-item-label>
      <q-item-label>r/{{ post.data.subreddit }}</q-item-label>
      <q-item-label>
        {{ post.data.ups }} ({{ post.data.upvote_ratio * 100 }}%) •
        {{ post.data.num_comments }} comments
      </q-item-label>
    </q-item-section>
  </q-item>
  <PostPopup
    :open="isPopupOpen"
    :post-permalink="post.data.permalink"
    @close="isPopupOpen = false"
  />
</template>
<script setup lang="ts">
import { Post } from 'src/types/reddit/base';
import { computed, ref } from 'vue';
import PostPopup from 'components/PostPopup.vue';

interface Props {
  post: Post;
}

const props = defineProps<Props>();

const isPopupOpen = ref(false);

const openPost = () => (isPopupOpen.value = true);
const isDefaultThumbnail = (thumbnail: string) => {
  return thumbnail == 'self' || thumbnail == 'default' || thumbnail == 'image';
};

const thumbnail = computed(() =>
  isDefaultThumbnail(props.post.data.thumbnail)
    ? 'https://cdn.quasar.dev/img/mountains.jpg'
    : props.post.data.thumbnail
);
</script>
